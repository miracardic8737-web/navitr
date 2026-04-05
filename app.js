// RestoreBana - Türkçe Sesli Navigasyon
// =======================================

// --- GLOBAL STATE ---
let map, userMarker, homeMarker, carMarker, routeControl;
let userLat = 39.9334, userLon = 32.8597; // Ankara default
let heading = 0, currentSpeed = 0;
let watchId = null;
let selectedAvatar = '🚗';
let radarMarkers = [], policeMarkers = [], poiMarkers = [], trafficLayers = [];
let nearbyData = [], nearbyFilter = 'all';
let shareInterval = null;
let shareId = Math.random().toString(36).substr(2, 8);
let arActive = false, arStream = null;
let lastRadarAlert = 0, lastPoliceAlert = 0;
let routeCoords = [];
let isNavigating = false;
let currentStepIndex = 0;
let steps = [];

const settings = {
  voice: true,
  radarWarn: true,
  policeWarn: true,
  traffic: false,
  ar: false,
  shareLocation: false,
  speedCam: true
};

// Türkiye'deki örnek radar ve polis noktaları (gerçek veriler OSM'den çekilir)
const SAMPLE_RADARS = [
  { lat: 39.9334, lon: 32.8597, type: 'fixed', limit: 50, name: 'Sabit Radar' },
  { lat: 39.9200, lon: 32.8500, type: 'fixed', limit: 90, name: 'Sabit Radar' },
  { lat: 39.9450, lon: 32.8700, type: 'mobile', limit: 50, name: 'Seyyar Radar' },
  { lat: 39.9100, lon: 32.8300, type: 'fixed', limit: 120, name: 'Otoyol Radar' },
  { lat: 39.9600, lon: 32.8900, type: 'redlight', limit: 0, name: 'Kırmızı Işık' },
];

const SAMPLE_POLICE = [
  { lat: 39.9280, lon: 32.8550, type: 'checkpoint', name: 'Polis Noktası' },
  { lat: 39.9500, lon: 32.8750, type: 'mobile', name: 'Seyyar Polis' },
  { lat: 39.9150, lon: 32.8400, type: 'checkpoint', name: 'Kontrol Noktası' },
];

// Basemap tile layers
const BASEMAPS = {
  osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors', maxZoom: 19
  }),
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri', maxZoom: 19
  }),
  topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap', maxZoom: 17
  }),
  dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© CartoDB', maxZoom: 19
  })
};

let currentBasemap = 'osm';

// --- INIT ---
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splash').style.opacity = '0';
    setTimeout(() => document.getElementById('splash').style.display = 'none', 800);
  }, 2000);

  initMap();
  startGPS();
  drawSpeedometer(0);
});

function initMap() {
  map = L.map('map', {
    center: [userLat, userLon],
    zoom: 15,
    zoomControl: false,
    attributionControl: true
  });

  BASEMAPS.osm.addTo(map);

  // Kullanıcı marker
  userMarker = L.marker([userLat, userLon], {
    icon: L.divIcon({ className: '', html: `<div class="user-marker">${selectedAvatar}</div>`, iconSize: [40, 40], iconAnchor: [20, 20] })
  }).addTo(map);

  // Haritaya tıklayınca rota kur
  map.on('click', (e) => {
    if (!isNavigating) {
      setDestination(e.latlng.lat, e.latlng.lng, 'Seçilen Konum');
    }
  });

  // Radar ve polis noktalarını yükle
  loadRadars();
  loadPolice();

  // OSM'den yakın yerleri çek
  setTimeout(() => fetchNearbyFromOSM(), 3000);
}

// --- GPS ---
function startGPS() {
  if (!navigator.geolocation) return;

  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      userLat = pos.coords.latitude;
      userLon = pos.coords.longitude;
      currentSpeed = pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : 0;
      heading = pos.coords.heading || heading;

      updateUserMarker();
      updateSpeedDisplay();
      drawSpeedometer(currentSpeed);
      checkRadarProximity();
      checkPoliceProximity();

      if (isNavigating) updateNavigation();
      if (settings.shareLocation) sendLocationShare();
    },
    (err) => console.warn('GPS hatası:', err),
    { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
  );
}

function updateUserMarker() {
  if (!userMarker) return;
  userMarker.setLatLng([userLat, userLon]);
  userMarker.setIcon(L.divIcon({
    className: '',
    html: `<div class="user-marker" style="transform:rotate(${heading}deg)">${selectedAvatar}</div>`,
    iconSize: [40, 40], iconAnchor: [20, 20]
  }));
}

function centerOnUser() {
  map.setView([userLat, userLon], 16);
}

// --- HIZ ---
function updateSpeedDisplay() {
  document.getElementById('current-speed').textContent = currentSpeed;
}

function drawSpeedometer(speed) {
  const canvas = document.getElementById('speed-canvas');
  const ctx = canvas.getContext('2d');
  const cx = 60, cy = 60, r = 50;
  ctx.clearRect(0, 0, 120, 120);

  // Arka plan
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 2.25);
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 10;
  ctx.stroke();

  // Hız yayı
  const maxSpeed = 200;
  const angle = (speed / maxSpeed) * Math.PI * 1.5;
  const color = speed > 120 ? '#d50000' : speed > 80 ? '#ffd600' : '#48cfad';
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 0.75 + angle);
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.stroke();

  document.getElementById('speed-value').textContent = speed;
}

// --- ROTA ---
function setDestination(lat, lon, name) {
  if (routeControl) { map.removeControl(routeControl); routeControl = null; }

  routeControl = L.Routing.control({
    waypoints: [L.latLng(userLat, userLon), L.latLng(lat, lon)],
    routeWhileDragging: false,
    showAlternatives: false,
    lineOptions: {
      styles: [{ color: '#6c63ff', weight: 6, opacity: 0.9 }]
    },
    createMarker: (i, wp) => {
      if (i === 1) {
        return L.marker(wp.latLng, {
          icon: L.divIcon({ className: '', html: '📍', iconSize: [30, 30] })
        });
      }
      return null;
    }
  }).addTo(map);

  routeControl.on('routesfound', (e) => {
    const route = e.routes[0];
    const dist = (route.summary.totalDistance / 1000).toFixed(1);
    const time = Math.round(route.summary.totalTime / 60);
    steps = route.instructions;
    routeCoords = route.coordinates;
    isNavigating = true;
    currentStepIndex = 0;

    document.getElementById('route-dist').textContent = `${dist} km`;
    document.getElementById('route-time').textContent = `${time} dk`;
    document.getElementById('route-info').classList.remove('hidden');
    document.getElementById('nav-box').classList.remove('hidden');
    document.getElementById('eta-time').textContent = time;

    updateNavStep(); // ilk adımı seslendir
  });
}

function updateNavigation() {
  if (!steps.length || currentStepIndex >= steps.length) return;
  const step = steps[currentStepIndex];
  if (!step) return;

  // Mevcut adıma olan mesafeyi hesapla
  const stepLat = routeCoords[step.index] ? routeCoords[step.index].lat : userLat;
  const stepLon = routeCoords[step.index] ? routeCoords[step.index].lng : userLon;
  const dist = getDistance(userLat, userLon, stepLat, stepLon);

  document.getElementById('nav-dist').textContent = dist < 1000 ? `${Math.round(dist)} m` : `${(dist/1000).toFixed(1)} km`;

  if (dist < 30 && currentStepIndex < steps.length - 1) {
    currentStepIndex++;
    updateNavStep();
  }
}

function updateNavStep() {
  if (!steps[currentStepIndex]) return;
  const step = steps[currentStepIndex];
  const arrow = getArrow(step.type);
  const trText = translateInstruction(step.text);
  document.getElementById('nav-arrow').textContent = arrow;
  document.getElementById('nav-instruction').textContent = trText;

  // Bir sonraki adıma olan mesafeye göre doğru ses dosyasını çal
  const nextStep = steps[currentStepIndex + 1];
  const dist = nextStep ? getStepDist(nextStep) : 0;
  const audioKey = getNavAudioKey(step.type, dist);
  if (audioKey) playAudio(audioKey);
}

function getStepDist(step) {
  if (!routeCoords[step.index]) return 999;
  return getDistance(userLat, userLon, routeCoords[step.index].lat, routeCoords[step.index].lng);
}

function getNavAudioKey(type, dist) {
  const isRight = ['Right', 'SharpRight', 'SlightRight'].includes(type);
  const isLeft  = ['Left',  'SharpLeft',  'SlightLeft' ].includes(type);
  const isStraight = type === 'Straight' || type === 'Continue';

  if (type === 'DestinationReached') return 'hedefe_ulastiniz';
  if (type === 'TurnAround')         return 'geri_don';

  if (dist > 800) {
    if (isRight)    return '1km_saga';
    if (isLeft)     return '1km_sola';
  } else if (dist > 300) {
    if (isRight)    return '500m_saga';
    if (isLeft)     return '500m_sola';
  } else {
    if (isRight)    return type === 'SharpRight' ? 'saga_sert' : type === 'SlightRight' ? 'saga_hafif' : 'saga_don';
    if (isLeft)     return type === 'SharpLeft'  ? 'sola_sert' : type === 'SlightLeft'  ? 'sola_hafif' : 'sola_don';
    if (isStraight) return 'duz_devam';
  }
  return null;
}

function getArrow(type) {
  const arrows = {
    'Straight': '↑', 'SlightRight': '↗', 'Right': '→', 'SharpRight': '↪',
    'SlightLeft': '↖', 'Left': '←', 'SharpLeft': '↩', 'TurnAround': '↩↩',
    'Roundabout': '🔄', 'DestinationReached': '🏁', 'WaypointReached': '📍'
  };
  return arrows[type] || '↑';
}

function translateInstruction(text) {
  if (!text) return '';
  return text
    .replace(/Head (north|south|east|west)/i, 'Düz git')
    .replace(/Turn right/i, 'Sağa dön')
    .replace(/Turn left/i, 'Sola dön')
    .replace(/Keep right/i, 'Sağda kal')
    .replace(/Keep left/i, 'Solda kal')
    .replace(/Continue/i, 'Devam et')
    .replace(/Roundabout/i, 'Dönel kavşak')
    .replace(/Destination/i, 'Hedefe ulaştınız')
    .replace(/onto/i, 'yoluna')
    .replace(/for (\d+) m/i, (_, m) => `${m} metre`)
    .replace(/for (\d+\.?\d*) km/i, (_, k) => `${k} kilometre`);
}

function cancelRoute() {
  if (routeControl) { map.removeControl(routeControl); routeControl = null; }
  isNavigating = false;
  steps = [];
  document.getElementById('route-info').classList.add('hidden');
  document.getElementById('nav-box').classList.add('hidden');
  speak('rota_iptal');
}

// --- ARAMA ---
async function searchPlace() {
  const q = document.getElementById('search-input').value.trim();
  if (!q) return;
  const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&accept-language=tr&countrycodes=tr`);
  const data = await res.json();
  const box = document.getElementById('search-results');
  box.innerHTML = '';
  if (!data.length) { box.innerHTML = '<div class="search-item">Sonuç bulunamadı</div>'; return; }
  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'search-item';
    div.textContent = item.display_name;
    div.onclick = () => {
      box.innerHTML = '';
      document.getElementById('search-input').value = item.display_name.split(',')[0];
      map.setView([item.lat, item.lon], 15);
      setDestination(parseFloat(item.lat), parseFloat(item.lon), item.display_name.split(',')[0]);
    };
    box.appendChild(div);
  });
}

document.getElementById('search-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchPlace();
});

// --- RADAR ---
function loadRadars() {
  SAMPLE_RADARS.forEach(r => addRadarMarker(r));
  // OSM'den gerçek radar verisi çek
  fetchOSMRadars();
}

function addRadarMarker(r) {
  const icon = r.type === 'mobile' ? '📸' : r.type === 'redlight' ? '🚦' : '📷';
  const m = L.marker([r.lat, r.lon], {
    icon: L.divIcon({ className: '', html: `<div class="radar-marker">${icon}</div>`, iconSize: [28, 28], iconAnchor: [14, 14] })
  }).addTo(map);
  m.bindPopup(`<b>${r.name}</b><br>Hız Limiti: ${r.limit > 0 ? r.limit + ' km/s' : 'Kırmızı Işık'}<br>Tür: ${r.type === 'mobile' ? 'Seyyar' : r.type === 'redlight' ? 'Kırmızı Işık' : 'Sabit'}`);
  m._radarData = r;
  radarMarkers.push(m);
}

async function fetchOSMRadars() {
  try {
    const bbox = `${userLat - 0.2},${userLon - 0.2},${userLat + 0.2},${userLon + 0.2}`;
    const query = `[out:json][timeout:10];(node["highway"="speed_camera"](${bbox});node["enforcement"="maxspeed"](${bbox}););out body;`;
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST', body: query
    });
    const data = await res.json();
    data.elements.forEach(el => {
      addRadarMarker({ lat: el.lat, lon: el.lon, type: 'fixed', limit: el.tags?.maxspeed || 50, name: 'OSM Radar' });
    });
  } catch (e) { console.log('OSM radar yüklenemedi'); }
}

function checkRadarProximity() {
  if (!settings.radarWarn) return;
  const now = Date.now();
  radarMarkers.forEach(m => {
    const r = m._radarData;
    const dist = getDistance(userLat, userLon, r.lat, r.lon);
    const isMobile = r.type === 'mobile';
    const isRedlight = r.type === 'redlight';

    if (dist <= 1000 && dist > 500 && now - lastRadarAlert > 10000) {
      lastRadarAlert = now;
      showAlert('radar', Math.round(dist));
      if (isRedlight) playAudio('kirmizi_isik');
      else if (isMobile) playAudio('seyyar_1km');
      else playAudio('radar_1km');
    } else if (dist <= 500 && dist > 200 && now - lastRadarAlert > 7000) {
      lastRadarAlert = now;
      showAlert('radar', Math.round(dist));
      if (isMobile) playAudio('seyyar_500m');
      else playAudio('radar_500m');
    } else if (dist <= 200 && now - lastRadarAlert > 5000) {
      lastRadarAlert = now;
      showAlert('radar', Math.round(dist));
      if (isMobile) playAudio('seyyar_200m');
      else playAudio('radar_200m');
    }
  });
}

function showAlert(type, dist) {
  const el = document.getElementById(type === 'radar' ? 'radar-alert' : 'police-alert');
  const distEl = document.getElementById(type === 'radar' ? 'radar-dist-text' : 'police-dist-text');
  distEl.textContent = `${dist} m`;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}

// --- POLİS ---
function loadPolice() {
  SAMPLE_POLICE.forEach(p => addPoliceMarker(p));
  fetchOSMPolice();
}

function addPoliceMarker(p) {
  const icon = p.type === 'mobile' ? '🚔' : '👮';
  const m = L.marker([p.lat, p.lon], {
    icon: L.divIcon({ className: '', html: `<div class="police-marker">${icon}</div>`, iconSize: [28, 28], iconAnchor: [14, 14] })
  }).addTo(map);
  m.bindPopup(`<b>${p.name}</b><br>Tür: ${p.type === 'mobile' ? 'Seyyar' : 'Sabit Nokta'}`);
  m._policeData = p;
  policeMarkers.push(m);
}

async function fetchOSMPolice() {
  try {
    const bbox = `${userLat - 0.2},${userLon - 0.2},${userLat + 0.2},${userLon + 0.2}`;
    const query = `[out:json][timeout:10];(node["amenity"="police"](${bbox}););out body;`;
    const res = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: query });
    const data = await res.json();
    data.elements.forEach(el => {
      addPoliceMarker({ lat: el.lat, lon: el.lon, type: 'checkpoint', name: el.tags?.name || 'Polis' });
    });
  } catch (e) { console.log('OSM polis yüklenemedi'); }
}

function checkPoliceProximity() {
  if (!settings.policeWarn) return;
  const now = Date.now();
  policeMarkers.forEach(m => {
    const p = m._policeData;
    const dist = getDistance(userLat, userLon, p.lat, p.lon);
    const isMobile = p.type === 'mobile';

    if (dist <= 1000 && dist > 200 && now - lastPoliceAlert > 10000) {
      lastPoliceAlert = now;
      showAlert('police', Math.round(dist));
      if (isMobile) playAudio('seyyar_polis_1km');
      else playAudio('polis_1km');
    } else if (dist <= 500 && dist > 200 && now - lastPoliceAlert > 7000) {
      lastPoliceAlert = now;
      showAlert('police', Math.round(dist));
      playAudio('polis_500m');
    } else if (dist <= 200 && now - lastPoliceAlert > 5000) {
      lastPoliceAlert = now;
      showAlert('police', Math.round(dist));
      if (isMobile) playAudio('seyyar_polis_200m');
      else playAudio('polis_200m');
    }
  });
}

// --- TRAFİK ---
let trafficLayer = null;
function toggleTraffic() {
  settings.traffic = !settings.traffic;
  document.getElementById('set-traffic').checked = settings.traffic;
  if (settings.traffic) {
    fetchTrafficData();
    document.getElementById('traffic-legend').classList.remove('hidden');
    speak('trafik_acildi');
  } else {
    if (trafficLayer) { map.removeLayer(trafficLayer); trafficLayer = null; }
    trafficLayers.forEach(l => map.removeLayer(l));
    trafficLayers = [];
    document.getElementById('traffic-legend').classList.add('hidden');
    speak('trafik_kapandi');
  }
}

async function fetchTrafficData() {
  try {
    const bbox = `${userLat - 0.1},${userLon - 0.1},${userLat + 0.1},${userLon + 0.1}`;
    const query = `[out:json][timeout:15];way["highway"~"primary|secondary|trunk|motorway"](${bbox});out geom;`;
    const res = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: query });
    const data = await res.json();
    data.elements.forEach(way => {
      if (!way.geometry) return;
      const coords = way.geometry.map(p => [p.lat, p.lon]);
      const hw = way.tags?.highway;
      const color = hw === 'motorway' ? '#d50000' : hw === 'trunk' ? '#ff6d00' : hw === 'primary' ? '#ffd600' : '#00c853';
      const line = L.polyline(coords, { color, weight: 4, opacity: 0.7 }).addTo(map);
      trafficLayers.push(line);
    });
  } catch (e) { console.log('Trafik verisi yüklenemedi'); }
}

// --- KATMANLAR ---
function changeBasemap(val) {
  map.removeLayer(BASEMAPS[currentBasemap]);
  currentBasemap = val;
  BASEMAPS[val].addTo(map);
}

function toggleRadarLayer(show) {
  radarMarkers.forEach(m => show ? map.addLayer(m) : map.removeLayer(m));
}

function togglePoliceLayer(show) {
  policeMarkers.forEach(m => show ? map.addLayer(m) : map.removeLayer(m));
}

function toggleTrafficLayer(show) {
  if (show) toggleTraffic(); else toggleTraffic();
}

function toggle3D(show) {
  const mapEl = document.getElementById('map');
  if (show) {
    mapEl.style.transform = 'perspective(800px) rotateX(20deg) scale(1.1)';
    mapEl.style.transformOrigin = 'center bottom';
  } else {
    mapEl.style.transform = '';
  }
}

function togglePOILayer(show) {
  if (show) fetchNearbyFromOSM(); else { poiMarkers.forEach(m => map.removeLayer(m)); poiMarkers = []; }
}

// --- YAKINDAKI YERLER ---
async function fetchNearbyFromOSM() {
  try {
    const r = 2000;
    const query = `[out:json][timeout:15];(
      node["amenity"~"restaurant|cafe|fuel|hospital|pharmacy|atm|parking|hotel|mosque|bank|supermarket|school"](around:${r},${userLat},${userLon});
      node["tourism"~"hotel|hostel|attraction"](around:${r},${userLat},${userLon});
      node["shop"~"supermarket|convenience"](around:${r},${userLat},${userLon});
    );out body;`;
    const res = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: query });
    const data = await res.json();
    nearbyData = data.elements.map(el => ({
      lat: el.lat, lon: el.lon,
      name: el.tags?.name || el.tags?.amenity || el.tags?.tourism || 'Bilinmeyen',
      type: el.tags?.amenity || el.tags?.tourism || el.tags?.shop || 'other',
      dist: Math.round(getDistance(userLat, userLon, el.lat, el.lon))
    })).sort((a, b) => a.dist - b.dist);
    renderNearbyList();
  } catch (e) { console.log('Yakın yerler yüklenemedi'); }
}

function renderNearbyList() {
  const list = document.getElementById('nearby-list');
  const filtered = nearbyFilter === 'all' ? nearbyData : nearbyData.filter(i => i.type.includes(nearbyFilter));
  list.innerHTML = filtered.slice(0, 30).map(item => `
    <div class="nearby-item" onclick="goToNearby(${item.lat},${item.lon},'${item.name}')">
      <div class="ni-name">${getNearbyIcon(item.type)} ${item.name}</div>
      <div class="ni-type">${translateType(item.type)}</div>
      <div class="ni-dist">${item.dist < 1000 ? item.dist + ' m' : (item.dist/1000).toFixed(1) + ' km'}</div>
    </div>
  `).join('');
}

function getNearbyIcon(type) {
  const icons = { restaurant:'🍽️', cafe:'☕', fuel:'⛽', hospital:'🏥', pharmacy:'💊', atm:'🏧', parking:'🅿️', hotel:'🏨', mosque:'🕌', bank:'🏦', supermarket:'🛒', school:'🏫', attraction:'🎯' };
  return icons[type] || '📍';
}

function translateType(type) {
  const tr = { restaurant:'Restoran', cafe:'Kafe', fuel:'Akaryakıt', hospital:'Hastane', pharmacy:'Eczane', atm:'ATM', parking:'Otopark', hotel:'Otel', mosque:'Cami', bank:'Banka', supermarket:'Market', school:'Okul', attraction:'Turistik Alan' };
  return tr[type] || type;
}

function filterNearby(f, btn) {
  nearbyFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderNearbyList();
}

function goToNearby(lat, lon, name) {
  setDestination(lat, lon, name);
  document.getElementById('nearby-panel').classList.add('hidden');
}

// --- KAYITLI KONUMLAR ---
function saveHome() {
  localStorage.setItem('home', JSON.stringify({ lat: userLat, lon: userLon }));
  if (homeMarker) map.removeLayer(homeMarker);
  homeMarker = L.marker([userLat, userLon], {
    icon: L.divIcon({ className: '', html: '<div class="home-marker">🏠</div>', iconSize: [30, 30] })
  }).addTo(map).bindPopup('Evim');
  speak('ev_kaydedildi');
}

function saveCar() {
  localStorage.setItem('car', JSON.stringify({ lat: userLat, lon: userLon }));
  if (carMarker) map.removeLayer(carMarker);
  carMarker = L.marker([userLat, userLon], {
    icon: L.divIcon({ className: '', html: '<div class="car-marker">🚗</div>', iconSize: [30, 30] })
  }).addTo(map).bindPopup('Arabam');
  speak('araba_kaydedildi');
}

function goHome() {
  const h = JSON.parse(localStorage.getItem('home') || 'null');
  if (!h) { speak('Ev konumu kayıtlı değil'); return; }
  setDestination(h.lat, h.lon, 'Ev');
}

function gotoCar() {
  const c = JSON.parse(localStorage.getItem('car') || 'null');
  if (!c) { speak('Araç konumu kayıtlı değil'); return; }
  setDestination(c.lat, c.lon, 'Arabam');
}

// Sayfa yüklenince kayıtlı konumları göster
window.addEventListener('load', () => {
  const h = JSON.parse(localStorage.getItem('home') || 'null');
  if (h) {
    homeMarker = L.marker([h.lat, h.lon], {
      icon: L.divIcon({ className: '', html: '<div class="home-marker">🏠</div>', iconSize: [30, 30] })
    });
    setTimeout(() => homeMarker.addTo(map).bindPopup('Evim'), 2500);
  }
  const c = JSON.parse(localStorage.getItem('car') || 'null');
  if (c) {
    carMarker = L.marker([c.lat, c.lon], {
      icon: L.divIcon({ className: '', html: '<div class="car-marker">🚗</div>', iconSize: [30, 30] })
    });
    setTimeout(() => carMarker.addTo(map).bindPopup('Arabam'), 2500);
  }
});

// --- KONUM PAYLAŞIMI ---
function shareLocation() {
  const panel = document.getElementById('share-panel');
  panel.classList.toggle('hidden');
  if (!panel.classList.contains('hidden')) {
    const link = `${window.location.origin}${window.location.pathname}?share=${shareId}&lat=${userLat}&lon=${userLon}`;
    document.getElementById('share-link').value = link;
    settings.shareLocation = true;
    document.getElementById('set-share').checked = true;
    speak('konum_paylasim');
  }
}

function copyShareLink() {
  const input = document.getElementById('share-link');
  input.select();
  document.execCommand('copy');
  speak('link_kopyalandi');
}

function stopSharing() {
  settings.shareLocation = false;
  document.getElementById('share-panel').classList.add('hidden');
  speak('paylasim_durdu');
}

function sendLocationShare() {
  // Gerçek uygulamada WebSocket/Firebase ile gönderilir
  // Şimdilik localStorage simülasyonu
  localStorage.setItem(`share_${shareId}`, JSON.stringify({ lat: userLat, lon: userLon, t: Date.now() }));
}

// Paylaşılan konumu izle
function watchSharedLocation() {
  const params = new URLSearchParams(window.location.search);
  const sid = params.get('share');
  if (!sid) return;
  setInterval(() => {
    const data = JSON.parse(localStorage.getItem(`share_${sid}`) || 'null');
    if (!data) return;
    if (!window._sharedMarker) {
      window._sharedMarker = L.marker([data.lat, data.lon], {
        icon: L.divIcon({ className: '', html: '👤', iconSize: [30, 30] })
      }).addTo(map).bindPopup('Paylaşılan Konum');
    } else {
      window._sharedMarker.setLatLng([data.lat, data.lon]);
    }
  }, 3000);
}
watchSharedLocation();

// --- AR (Artırılmış Gerçeklik) ---
async function toggleAR() {
  arActive = !arActive;
  const overlay = document.getElementById('ar-overlay');
  if (arActive) {
    try {
      arStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      document.getElementById('ar-video').srcObject = arStream;
      overlay.classList.remove('hidden');
      speak('ar_acildi');
      drawAROverlay();
    } catch (e) {
      arActive = false;
    }
  } else {
    overlay.classList.add('hidden');
    if (arStream) { arStream.getTracks().forEach(t => t.stop()); arStream = null; }
    speak('ar_kapandi');
  }
}

function drawAROverlay() {
  if (!arActive) return;
  const canvas = document.getElementById('ar-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Yön oku çiz
  if (isNavigating && steps[currentStepIndex]) {
    const step = steps[currentStepIndex];
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = 'rgba(108,99,255,0.8)';
    ctx.beginPath();
    ctx.moveTo(0, -60); ctx.lineTo(20, 0); ctx.lineTo(-20, 0);
    ctx.closePath(); ctx.fill();
    ctx.restore();

    document.getElementById('ar-direction').textContent = getArrow(step.type) + ' ' + translateInstruction(step.text);
  }

  // Radar uyarısı AR'da göster
  radarMarkers.forEach(m => {
    const dist = getDistance(userLat, userLon, m._radarData.lat, m._radarData.lon);
    if (dist < 500) {
      ctx.fillStyle = 'rgba(213,0,0,0.7)';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(`📷 RADAR ${Math.round(dist)}m`, canvas.width / 2 - 60, 80);
    }
  });

  requestAnimationFrame(drawAROverlay);
}

// --- AVATAR ---
function selectAvatar(el) {
  document.querySelectorAll('.avatar-opt').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  selectedAvatar = el.dataset.v;
  updateUserMarker();
}

// --- PANEL TOGGLE ---
function toggleLayers() { togglePanel('layer-panel'); }
function toggleSettings() { togglePanel('settings-panel'); }
function toggleNearby() {
  togglePanel('nearby-panel');
  if (!document.getElementById('nearby-panel').classList.contains('hidden')) {
    fetchNearbyFromOSM();
  }
}

function togglePanel(id) {
  const panels = ['layer-panel', 'settings-panel', 'nearby-panel', 'share-panel'];
  panels.forEach(p => { if (p !== id) document.getElementById(p).classList.add('hidden'); });
  document.getElementById(id).classList.toggle('hidden');
}

function zoomIn() { map.zoomIn(); }
function zoomOut() { map.zoomOut(); }

// --- SESLİ YÖNLENDİRME (MP3 tabanlı - %100 Türkçe) ---
let audioQueue = [];
let audioPlaying = false;

// Ses anahtarı → dosya adı eşleştirmesi
const AUDIO_MAP = {
  // Yönler (tam)
  'saga_don':         'saga_don',
  'sola_don':         'sola_don',
  'duz_devam':        'duz_devam',
  'saga_hafif':       'saga_hafif',
  'sola_hafif':       'sola_hafif',
  'saga_sert':        'saga_sert',
  'sola_sert':        'sola_sert',
  'geri_don':         'geri_don',
  // Mesafeli
  '200m_saga':        '200m_saga',
  '200m_sola':        '200m_sola',
  '200m_duz':         '200m_duz',
  '500m_saga':        '500m_saga',
  '500m_sola':        '500m_sola',
  '1km_saga':         '1km_saga',
  '1km_sola':         '1km_sola',
  // Hedef
  'hedefe_ulastiniz': 'hedefe_ulastiniz',
  'rota_yeniden':     'rota_yeniden',
  // Radar
  'radar_1km':        'radar_1km',
  'radar_500m':       'radar_500m',
  'radar_200m':       'radar_200m',
  'seyyar_1km':       'seyyar_1km',
  'seyyar_500m':      'seyyar_500m',
  'seyyar_200m':      'seyyar_200m',
  'kirmizi_isik':     'kirmizi_isik',
  // Polis
  'polis_1km':        'polis_1km',
  'polis_500m':       'polis_500m',
  'polis_200m':       'polis_200m',
  'seyyar_polis_1km': 'seyyar_polis_1km',
  'seyyar_polis_200m':'seyyar_polis_200m',
  // Hız
  'hiz_asimi':        'hiz_asimi',
  // Genel
  'rota_iptal':       'rota_iptal',
  'ev_kaydedildi':    'ev_kaydedildi',
  'araba_kaydedildi': 'araba_kaydedildi',
  'konum_paylasim':   'konum_paylasim',
  'paylasim_durdu':   'paylasim_durdu',
  'link_kopyalandi':  'link_kopyalandi',
  'trafik_acildi':    'trafik_acildi',
  'trafik_kapandi':   'trafik_kapandi',
  'ar_acildi':        'ar_acildi',
  'ar_kapandi':       'ar_kapandi',
};

function playAudio(key) {
  if (!settings.voice) return;
  const file = AUDIO_MAP[key];
  if (!file) return;
  audioQueue.push(`/audio/${file}.mp3`);
  if (!audioPlaying) processAudioQueue();
}

function processAudioQueue() {
  if (!audioQueue.length) { audioPlaying = false; return; }
  audioPlaying = true;
  const src = audioQueue.shift();
  const audio = new Audio(src);
  audio.onended = processAudioQueue;
  audio.onerror = processAudioQueue;
  audio.play().catch(processAudioQueue);
}

// speak() artık sadece navigasyon seslerini çalar, gereksiz metinleri yoksayar
function speak(key) {
  playAudio(key);
}

// --- YARDIMCI ---
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// Klavye kısayolları
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cancelRoute();
    document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
  }
});

// Harita sürüklenince panelleri kapat
map && map.on('dragstart', () => {
  document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
});
