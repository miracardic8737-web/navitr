const fs = require('fs');
const out = 'public/app.js';

const code = `
// ROTA SECIM
function setDestination(lat, lon, name) {
  destLat = lat; destLon = lon;
  if (destMarker) destMarker.remove();
  const el = document.createElement('div');
  el.style.cssText = 'font-size:28px;filter:drop-shadow(0 0 6px #ff4444)';
  el.textContent = String.fromCodePoint(0x1F4CD);
  destMarker = new maplibregl.Marker({ element: el, anchor: 'bottom' }).setLngLat([lon, lat]).addTo(map);
  openRouteModal(lat, lon, name);
}
function openRouteModal(lat, lon, name) {
  pendingLat = lat; pendingLon = lon; pendingName = name;
  document.getElementById('rm-dest-name').textContent = String.fromCodePoint(0x1F4CD) + ' ' + name;
  document.getElementById('route-modal').classList.remove('hidden');
  fetchAltRoutes();
}
function closeRouteModal() { document.getElementById('route-modal').classList.add('hidden'); }
function selectTransport(btn) { document.querySelectorAll('.tm-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); selectedTransport = btn.dataset.mode; fetchAltRoutes(); }
function selectPref(el) { document.querySelectorAll('.rm-pref').forEach(b => b.classList.remove('active')); el.classList.add('active'); selectedPref = el.dataset.pref; fetchAltRoutes(); }

async function fetchAltRoutes() {
  if (!pendingLat) return;
  altRoutes = []; selectedAltIdx = 0;
  [0,1,2].forEach(i => {
    const el = document.getElementById('alt-' + i);
    el.style.display = i === 0 ? 'flex' : 'none';
    el.classList.remove('selected');
    if (i === 0) { el.classList.add('loading'); el.querySelector('.alt-name').textContent = 'Hesaplaniyor...'; el.querySelector('.alt-meta').textContent = '--'; }
    const tagsEl = document.getElementById('alt-tags-' + i);
    if (tagsEl) tagsEl.innerHTML = '';
  });
  const prof = TRANSPORT_PROFILES[selectedTransport] || TRANSPORT_PROFILES.driving;
  try {
    const url = 'https://router.project-osrm.org/route/v1/' + prof.osrm + '/' + userLon + ',' + userLat + ';' + pendingLon + ',' + pendingLat + '?overview=full&geometries=geojson&steps=true&alternatives=true';
    const res = await fetch(url);
    const data = await res.json();
    if (!data.routes || !data.routes.length) { document.getElementById('alt-0').querySelector('.alt-name').textContent = 'Rota bulunamadi'; document.getElementById('alt-0').classList.remove('loading'); return; }
    let routes = data.routes.map(r => ({
      coords: r.geometry.coordinates, steps: parseSteps(r.legs[0].steps),
      dist: r.distance, duration: r.duration / prof.factor,
      hasToll: checkBboxMarkers(r.geometry.coordinates, tollMarkers),
      hasRoadwork: checkBboxMarkers(r.geometry.coordinates, roadworkMarkers),
      hasHighway: r.legs[0].steps.some(s => (s.ref || '').match(/^(O-|TEM|E[0-9]|D[0-9]{3})/i)),
    }));
    if (selectedPref === 'shortest') routes.sort((a,b) => a.dist - b.dist);
    else if (selectedPref === 'scenic') routes.sort((a,b) => b.dist - a.dist);
    else if (selectedPref === 'no-toll') routes.sort((a,b) => (a.hasToll?1:0) - (b.hasToll?1:0));
    else if (selectedPref === 'no-highway') routes.sort((a,b) => (a.hasHighway?1:0) - (b.hasHighway?1:0));
    altRoutes = routes;
    const names = { fastest:'En Hizli Rota', shortest:'En Kisa Rota', scenic:'Manzarali Rota', 'no-highway':'Otoyolsuz Rota', 'no-toll':'Ucretsiz Rota', 'avoid-ferry':'Ferisiz Rota' };
    routes.slice(0,3).forEach((r, i) => {
      const el = document.getElementById('alt-' + i);
      el.style.display = 'flex'; el.classList.remove('loading');
      if (i === 0) el.classList.add('selected');
      el.querySelector('.alt-name').textContent = i === 0 ? (names[selectedPref] || 'En Hizli Rota') : ('Alternatif Rota ' + i);
      el.querySelector('.alt-meta').textContent = (r.dist/1000).toFixed(1) + ' km - ' + Math.round(r.duration/60) + ' dk - ' + getArrivalTime(r.duration);
      const tagsEl = document.getElementById('alt-tags-' + i);
      if (tagsEl) {
        const tags = [];
        if (r.hasToll) tags.push('<span class="tag-toll">Ucretli</span>'); else tags.push('<span class="tag-free">Ucretsiz</span>');
        if (r.hasHighway) tags.push('<span class="tag-highway">Otoyol</span>');
        if (r.hasRoadwork) tags.push('<span class="tag-roadwork">Calisma</span>');
        tagsEl.innerHTML = tags.join('');
      }
    });
    previewRoute(0);
  } catch(e) { document.getElementById('alt-0').querySelector('.alt-name').textContent = 'Baglanti hatasi'; document.getElementById('alt-0').classList.remove('loading'); }
}

function checkBboxMarkers(coords, markers) {
  if (!markers.length) return false;
  const lats = coords.map(c=>c[1]), lons = coords.map(c=>c[0]);
  const minLat=Math.min(...lats)-0.01, maxLat=Math.max(...lats)+0.01, minLon=Math.min(...lons)-0.01, maxLon=Math.max(...lons)+0.01;
  return markers.some(m => m._lat>=minLat && m._lat<=maxLat && m._lon>=minLon && m._lon<=maxLon);
}

function previewRoute(idx) {
  if (!altRoutes[idx] || !mapReady) return;
  selectedAltIdx = idx;
  ['route-border','route-line'].forEach(id => { try{map.removeLayer(id);}catch(e){} });
  try{map.removeSource('route');}catch(e){}
  const coords = altRoutes[idx].coords;
  map.addSource('route',{type:'geojson',data:{type:'Feature',geometry:{type:'LineString',coordinates:coords}}});
  map.addLayer({id:'route-border',type:'line',source:'route',layout:{'line-join':'round','line-cap':'round'},paint:{'line-color':'#000','line-width':10,'line-opacity':0.2}});
  map.addLayer({id:'route-line',type:'line',source:'route',layout:{'line-join':'round','line-cap':'round'},paint:{'line-color':'#4285F4','line-width':7,'line-opacity':0.9}});
  const lngs=coords.map(c=>c[0]), lats=coords.map(c=>c[1]);
  map.fitBounds([[Math.min(...lngs),Math.min(...lats)],[Math.max(...lngs),Math.max(...lats)]],{padding:60,duration:600});
}
function selectAltRoute(idx) { document.querySelectorAll('.rm-alt-item').forEach(el=>el.classList.remove('selected')); document.getElementById('alt-'+idx).classList.add('selected'); previewRoute(idx); }

function startSelectedRoute() {
  if (!altRoutes[selectedAltIdx]) return;
  const r = altRoutes[selectedAltIdx];
  routeCoords = r.coords; steps = r.steps; stepIdx = 0;
  isNavigating = true; offRouteCount = 0; lastSpokenDist = {};
  destLat = pendingLat; destLon = pendingLon;
  document.getElementById('rb-time').textContent = Math.round(r.duration/60);
  document.getElementById('rb-dist').textContent = (r.dist/1000).toFixed(1) + ' km';
  document.getElementById('rb-arr').textContent = getArrivalTime(r.duration);
  document.getElementById('route-bar').classList.remove('hidden');
  document.getElementById('nav-bar').classList.remove('hidden');
  document.getElementById('search-wrap').style.top = '56px';
  closeRouteModal(); drawRouteOnMap(routeCoords); updateNavStep(); playAudio('rota_hazir');
  map.flyTo({center:[userLon,userLat],zoom:16,pitch:45,bearing:userBearing,duration:900});
}

async function calcRoute(fromLat, fromLon, toLat, toLon) {
  playAudio('rota_hesaplaniyor');
  try {
    const prof = TRANSPORT_PROFILES[selectedTransport] || TRANSPORT_PROFILES.driving;
    const url = 'https://router.project-osrm.org/route/v1/' + prof.osrm + '/' + fromLon + ',' + fromLat + ';' + toLon + ',' + toLat + '?overview=full&geometries=geojson&steps=true';
    const res = await fetch(url); const data = await res.json();
    if (!data.routes || !data.routes.length) return;
    const route = data.routes[0];
    routeCoords = route.geometry.coordinates; steps = parseSteps(route.legs[0].steps); stepIdx = 0; lastSpokenDist = {};
    document.getElementById('rb-time').textContent = Math.round(route.duration / prof.factor / 60);
    document.getElementById('rb-dist').textContent = (route.distance/1000).toFixed(1) + ' km';
    document.getElementById('rb-arr').textContent = getArrivalTime(route.duration / prof.factor);
    drawRouteOnMap(routeCoords); updateNavStep(); playAudio('rota_hazir');
  } catch(e) {}
}

function parseSteps(osrmSteps) {
  return osrmSteps.map(s => ({ name: s.name||'', type: s.maneuver.type, modifier: s.maneuver.modifier||'', distance: s.distance, location: s.maneuver.location, ref: s.ref||'' }));
}
function drawRouteOnMap(coords) {
  if (!mapReady) return;
  ['route-border','route-line'].forEach(id=>{try{map.removeLayer(id);}catch(e){}});
  try{map.removeSource('route');}catch(e){}
  map.addSource('route',{type:'geojson',data:{type:'Feature',geometry:{type:'LineString',coordinates:coords}}});
  map.addLayer({id:'route-border',type:'line',source:'route',layout:{'line-join':'round','line-cap':'round'},paint:{'line-color':'#000','line-width':10,'line-opacity':0.25}});
  map.addLayer({id:'route-line',type:'line',source:'route',layout:{'line-join':'round','line-cap':'round'},paint:{'line-color':'#4285F4','line-width':7,'line-opacity':0.95}});
}
function cancelRoute() {
  isNavigating=false;steps=[];stepIdx=0;routeCoords=[];destLat=null;destLon=null;lastSpokenDist={};
  if(destMarker){destMarker.remove();destMarker=null;}
  ['route-border','route-line'].forEach(id=>{try{map.removeLayer(id);}catch(e){}});try{map.removeSource('route');}catch(e){}
  document.getElementById('route-bar').classList.add('hidden');
  document.getElementById('nav-bar').classList.add('hidden');
  document.getElementById('search-wrap').style.top='10px';
  playAudio('rota_iptal');
}
`;

fs.appendFileSync(out, code, 'utf8');
console.log('Part 2 OK');
