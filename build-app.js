// Bu script app.js'i oluşturur
const fs = require('fs');
const path = require('path');
const out = path.join(__dirname, 'public', 'app.js');

const code = `// Navitr - Türkçe Sesli Navigasyon
'use strict';

// STATE
let map, userMarker, destMarker;
let userLat = 39.9334, userLon = 32.8597, userBearing = 0, currentSpeed = 0;
let isNavigating = false, steps = [], stepIdx = 0, routeCoords = [];
let destLat = null, destLon = null;
let radarMarkers = [], policeMarkers = [], tollMarkers = [], roadworkMarkers = [];
let nearbyData = [], nearbyFilter = 'all';
let shareId = Math.random().toString(36).substr(2, 8);
let arActive = false, arStream = null;
let tiltActive = true, trafficActive = false, trafficLayerIds = [];
let rerouteTimer = null, offRouteCount = 0;
let nightModeAuto = false, currentAvatar = 'car', mapReady = false;
let lastSpokenDist = {};
let tollActive = false, roadworkActive = false;
let pendingLat = null, pendingLon = null, pendingName = '';
let selectedTransport = 'driving', selectedPref = 'fastest';
let altRoutes = [], selectedAltIdx = 0;
const SAVED_PINS = {};

const settings = { voice: true, radarWarn: true, policeWarn: true, autoReroute: true, compass: true, shareLocation: false };

const SAMPLE_RADARS = [
  { lat: 39.9334, lon: 32.8597, type: 'fixed',    limit: 50,  name: 'Sabit Radar' },
  { lat: 39.9200, lon: 32.8500, type: 'fixed',    limit: 90,  name: 'Sabit Radar' },
  { lat: 39.9450, lon: 32.8700, type: 'mobile',   limit: 50,  name: 'Seyyar Radar' },
  { lat: 39.9100, lon: 32.8300, type: 'fixed',    limit: 120, name: 'Otoyol Radar' },
  { lat: 39.9600, lon: 32.8900, type: 'redlight', limit: 0,   name: 'Kirmizi Isik' },
];
const SAMPLE_POLICE = [
  { lat: 39.9280, lon: 32.8550, type: 'checkpoint', name: 'Polis Noktasi' },
  { lat: 39.9500, lon: 32.8750, type: 'mobile',     name: 'Seyyar Polis' },
  { lat: 39.9150, lon: 32.8400, type: 'checkpoint', name: 'Kontrol Noktasi' },
];

const STYLES = {
  '3d':   'https://tiles.openfreemap.org/styles/liberty',
  'osm':  'https://tiles.openfreemap.org/styles/bright',
  'dark': 'https://tiles.openfreemap.org/styles/dark',
  'satellite': { version: 8, sources: { 'esri-sat': { type: 'raster', tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'], tileSize: 256, attribution: 'Esri' } }, layers: [{ id: 'sat-layer', type: 'raster', source: 'esri-sat' }] },
  'topo': { version: 8, sources: { 'topo-src': { type: 'raster', tiles: ['https://tile.opentopomap.org/{z}/{x}/{y}.png'], tileSize: 256, attribution: 'OpenTopoMap' } }, layers: [{ id: 'topo-layer', type: 'raster', source: 'topo-src' }] }
};

const TRANSPORT_PROFILES = {
  driving:       { osrm: 'car',  factor: 1.0 },
  'driving-hgv': { osrm: 'car',  factor: 0.75 },
  motorcycle:    { osrm: 'car',  factor: 1.1 },
  cycling:       { osrm: 'bike', factor: 1.0 },
  foot:          { osrm: 'foot', factor: 1.0 },
};

// INIT
window.addEventListener('load', () => {
  setTimeout(() => { const s = document.getElementById('splash'); s.style.opacity = '0'; setTimeout(() => s.style.display = 'none', 700); }, 2000);
  initMap(); startGPS(); drawSpeedometer(0);
});

// MAP
function initMap() {
  map = new maplibregl.Map({ container: 'map', style: STYLES['3d'], center: [userLon, userLat], zoom: 15, pitch: 45, bearing: 0, antialias: true, attributionControl: false, maxTileCacheSize: 50 });
  map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left');
  map.on('load', () => { mapReady = true; add3DBuildings(); addUserMarker(); loadRadars(); loadPolice(); loadTollAndRoadwork(); loadSavedPins(); setTimeout(fetchNearbyFromOSM, 4000); });
  map.on('rotate', () => { document.getElementById('compass').style.transform = \`rotate(\${-map.getBearing()}deg)\`; });
  let rft = null;
  map.on('moveend', () => { clearTimeout(rft); rft = setTimeout(() => { fetchOSMRadars(); fetchOSMPolice(); }, 1000); });
  map.on('click', e => { if (!isNavigating) setDestination(e.lngLat.lat, e.lngLat.lng, 'Secilen Konum'); });
  let lpt = null;
  map.on('mousedown', e => { lpt = setTimeout(() => { const n = prompt('Bu konuma isim ver:') || 'Kayitli Yer'; saveCustomPin(e.lngLat.lat, e.lngLat.lng, n); }, 700); });
  map.on('mouseup', () => clearTimeout(lpt));
  map.on('touchstart', e => { if (e.originalEvent.touches.length !== 1) return; const t = e.originalEvent.touches[0]; lpt = setTimeout(() => { const ll = map.unproject([t.clientX, t.clientY]); const n = prompt('Bu konuma isim ver:') || 'Kayitli Yer'; saveCustomPin(ll.lat, ll.lng, n); }, 700); });
  map.on('touchend', () => clearTimeout(lpt));
}

function add3DBuildings() {
  if (!mapReady || map.getLayer('3d-buildings')) return;
  try { const sources = map.getStyle().sources; const vs = Object.keys(sources).find(k => sources[k].type === 'vector'); if (!vs) return; map.addLayer({ id: '3d-buildings', source: vs, 'source-layer': 'building', type: 'fill-extrusion', minzoom: 14, paint: { 'fill-extrusion-color': '#2d2b6b', 'fill-extrusion-height': ['coalesce', ['get', 'render_height'], ['get', 'height'], 10], 'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], ['get', 'min_height'], 0], 'fill-extrusion-opacity': 0.8 } }); } catch (e) {}
}
function toggle3DBuildings(show) { if (!map.getLayer('3d-buildings')) return; map.setLayoutProperty('3d-buildings', 'visibility', show ? 'visible' : 'none'); }
function changeBasemap(val) {
  const style = STYLES[val]; if (!style) return; mapReady = false; map.setStyle(style);
  map.once('styledata', () => { mapReady = true; add3DBuildings(); if (routeCoords.length) drawRouteOnMap(routeCoords); radarMarkers.forEach(m => m.addTo(map)); policeMarkers.forEach(m => m.addTo(map)); tollMarkers.forEach(m => m.addTo(map)); roadworkMarkers.forEach(m => m.addTo(map)); Object.values(SAVED_PINS).forEach(p => p.marker && p.marker.addTo(map)); if (userMarker) userMarker.addTo(map); if (destMarker) destMarker.addTo(map); });
}

// USER MARKER
let userEl;
function addUserMarker() {
  userEl = document.createElement('div');
  userEl.style.cssText = 'width:44px;height:44px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 0 8px #6c63ff);transition:transform .3s';
  setAvatarSVG(userEl, currentAvatar);
  userMarker = new maplibregl.Marker({ element: userEl, anchor: 'center' }).setLngLat([userLon, userLat]).addTo(map);
}
function setAvatarSVG(el, type) {
  const svgs = {
    car:   '<svg viewBox="0 0 40 24" width="40" height="24"><path d="M8 18h24v-4l-3-8H11L8 14v4z" fill="#4285F4"/><circle cx="12" cy="18" r="3" fill="#222"/><circle cx="28" cy="18" r="3" fill="#222"/><rect x="13" y="8" width="14" height="6" rx="1" fill="#90CAF9"/></svg>',
    suv:   '<svg viewBox="0 0 44 26" width="44" height="26"><path d="M6 20h32v-5l-4-9H10L6 15v5z" fill="#34A853"/><circle cx="12" cy="20" r="3.5" fill="#222"/><circle cx="32" cy="20" r="3.5" fill="#222"/><rect x="11" y="8" width="22" height="7" rx="1" fill="#A5D6A7"/></svg>',
    sport: '<svg viewBox="0 0 46 22" width="46" height="22"><path d="M5 17h36v-3l-5-8H14L5 14v3z" fill="#EA4335"/><circle cx="13" cy="17" r="3" fill="#222"/><circle cx="33" cy="17" r="3" fill="#222"/><rect x="15" y="7" width="16" height="5" rx="2" fill="#FFCDD2"/></svg>',
    taxi:  '<svg viewBox="0 0 40 24" width="40" height="24"><path d="M8 18h24v-4l-3-8H11L8 14v4z" fill="#FBBC04"/><circle cx="12" cy="18" r="3" fill="#222"/><circle cx="28" cy="18" r="3" fill="#222"/><rect x="13" y="8" width="14" height="6" rx="1" fill="#FFF9C4"/><rect x="17" y="4" width="6" height="3" rx="1" fill="#FBBC04"/></svg>',
    bus:   '<svg viewBox="0 0 48 28" width="48" height="28"><rect x="4" y="6" width="40" height="16" rx="3" fill="#1565C0"/><circle cx="12" cy="22" r="3.5" fill="#222"/><circle cx="36" cy="22" r="3.5" fill="#222"/><rect x="8" y="9" width="8" height="7" rx="1" fill="#90CAF9"/><rect x="20" y="9" width="8" height="7" rx="1" fill="#90CAF9"/><rect x="32" y="9" width="8" height="7" rx="1" fill="#90CAF9"/></svg>',
    truck: '<svg viewBox="0 0 52 28" width="52" height="28"><rect x="4" y="10" width="28" height="14" rx="2" fill="#FF6F00"/><path d="M32 14h12l4 6v4H32V14z" fill="#FF8F00"/><circle cx="12" cy="24" r="3.5" fill="#222"/><circle cx="40" cy="24" r="3.5" fill="#222"/><rect x="32" y="14" width="10" height="6" rx="1" fill="#FFE0B2"/></svg>',
    moto:  '<svg viewBox="0 0 36 24" width="36" height="24"><circle cx="8" cy="18" r="5" fill="none" stroke="#333" stroke-width="2.5"/><circle cx="28" cy="18" r="5" fill="none" stroke="#333" stroke-width="2.5"/><path d="M8 18 L18 8 L28 18" fill="none" stroke="#9C27B0" stroke-width="3"/><circle cx="18" cy="10" r="3" fill="#9C27B0"/></svg>',
    bike:  '<svg viewBox="0 0 36 24" width="36" height="24"><circle cx="8" cy="17" r="5" fill="none" stroke="#333" stroke-width="2"/><circle cx="28" cy="17" r="5" fill="none" stroke="#333" stroke-width="2"/><path d="M8 17 L18 7 L28 17" fill="none" stroke="#00897B" stroke-width="2.5"/><circle cx="18" cy="9" r="2.5" fill="#00897B"/></svg>',
  };
  el.innerHTML = svgs[type] || svgs.car;
}
function updateUserMarker() { if (!userMarker) return; userMarker.setLngLat([userLon, userLat]); if (userEl) userEl.style.transform = \`rotate(\${userBearing}deg)\`; }
function selectAvatar(el) { document.querySelectorAll('.av').forEach(e => e.classList.remove('selected')); el.classList.add('selected'); currentAvatar = el.dataset.v; if (userEl) setAvatarSVG(userEl, currentAvatar); }

// GPS
function startGPS() {
  if (!navigator.geolocation) return;
  navigator.geolocation.watchPosition(pos => {
    const pLat = userLat, pLon = userLon;
    userLat = pos.coords.latitude; userLon = pos.coords.longitude;
    currentSpeed = pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : 0;
    if (pos.coords.heading != null && !isNaN(pos.coords.heading)) userBearing = pos.coords.heading;
    else if (pLat !== userLat || pLon !== userLon) userBearing = calcBearing(pLat, pLon, userLat, userLon);
    updateUserMarker(); drawSpeedometer(currentSpeed);
    document.getElementById('spd-num').textContent = currentSpeed;
    if (isNavigating && settings.compass) map.easeTo({ center: [userLon, userLat], bearing: userBearing, pitch: 45, duration: 700 });
    checkRadarProximity(); checkPoliceProximity();
    if (isNavigating) { updateNavigation(); checkOffRoute(); }
    if (settings.shareLocation) sendLocationShare();
  }, () => {}, { enableHighAccuracy: true, maximumAge: 1500, timeout: 10000 });
}
function centerOnUser() { map.flyTo({ center: [userLon, userLat], zoom: 16, pitch: 45, bearing: userBearing, duration: 700 }); }
function resetBearing() { map.easeTo({ bearing: 0, pitch: 45, duration: 400 }); }
function toggleTilt() { tiltActive = !tiltActive; map.easeTo({ pitch: tiltActive ? 45 : 0, duration: 400 }); document.getElementById('fab-tilt').classList.toggle('active', tiltActive); }
`;

fs.writeFileSync(out, code, 'utf8');
console.log('Part 1 OK - lines:', code.split('\n').length);
