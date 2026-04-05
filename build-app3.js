const fs = require('fs');
const out = 'public/app.js';

const code = `
// NAVIGASYON
function updateNavigation() {
  if (!steps.length || stepIdx >= steps.length) return;
  const step = steps[stepIdx];
  const [sLon, sLat] = step.location;
  const dist = getDistance(userLat, userLon, sLat, sLon);
  const distTxt = dist < 1000 ? Math.round(dist) + ' m' : (dist/1000).toFixed(1) + ' km';
  document.getElementById('nav-dist').textContent = distTxt;
  document.getElementById('ar-dist-hud').textContent = distTxt;
  speakDistanceWarning(stepIdx, step, dist);
  if (dist < 20) {
    if (stepIdx < steps.length - 1) { stepIdx++; updateNavStep(); }
    else { playAudio('hedefe_ulastiniz'); setTimeout(cancelRoute, 3500); }
  }
}

function speakDistanceWarning(idx, step, dist) {
  const prev = lastSpokenDist[idx] || 9999;
  let band = null;
  if      (dist<=2100&&dist>1100&&prev>2100) band='2km';
  else if (dist<=1100&&dist>550 &&prev>1100) band='1km';
  else if (dist<=550 &&dist>220 &&prev>550)  band='500m';
  else if (dist<=220 &&dist>110 &&prev>220)  band='200m';
  else if (dist<=110 &&dist>45  &&prev>110)  band='100m';
  else if (dist<=45  &&dist>15  &&prev>45)   band='50m';
  else if (dist<=15  &&prev>15)              band='now';
  if (!band) return;
  lastSpokenDist[idx] = dist;
  const type=step.type, m=step.modifier||'';
  const isRight=m.includes('right'), isLeft=m.includes('left');
  const isSharpR=m.includes('sharp')&&isRight, isSharpL=m.includes('sharp')&&isLeft;
  const isSlightR=m.includes('slight')&&isRight, isSlightL=m.includes('slight')&&isLeft;
  const isRound=type==='roundabout'||type==='rotary';
  const isUturn=type==='u-turn', isArrive=type==='arrive';
  const isMerge=type==='merge'||type==='fork';
  if (isArrive) { if(band==='200m'||band==='100m') playAudio('hedefe_yaklasiyorsunuz'); if(band==='now') playAudio('hedefe_ulastiniz'); return; }
  if (isUturn)  { if(band==='1km') playAudio('1km_geri'); else if(band==='200m') playAudio('200m_geri'); else if(band==='50m') playAudio('50m_geri'); else if(band==='now') playAudio('geri_don'); return; }
  if (isRound)  { if(band==='1km') playAudio('1km_kavsaktan_cik'); else if(band==='500m') playAudio('500m_kavsaktan_cik'); else if(band==='200m') playAudio('200m_kavsaktan_cik'); else if(band==='now') playAudio('donelden_cik'); return; }
  if (isMerge)  { if(isRight){if(band==='1km')playAudio('saga_kal');else if(band==='now')playAudio('saga_cik');}else{if(band==='1km')playAudio('sola_kal');else if(band==='now')playAudio('sola_cik');} return; }
  const key = getDistKey(band, isSharpR, isSharpL, isSlightR, isSlightL, isRight, isLeft);
  if (key) playAudio(key);
}

function getDistKey(band, sharpR, sharpL, slightR, slightL, right, left) {
  if (band==='now') { if(sharpR)return 'saga_sert'; if(sharpL)return 'sola_sert'; if(slightR)return 'saga_hafif'; if(slightL)return 'sola_hafif'; if(right)return 'saga_don'; if(left)return 'sola_don'; return 'duz_devam'; }
  const pfx = {'2km':'2km','1km':'1km','500m':'500m','200m':'200m','100m':'100m','50m':'50m'}[band];
  if (!pfx) return null;
  if (sharpR)  return AUDIO_MAP[pfx+'_saga_sert']  ? pfx+'_saga_sert'  : (right?pfx+'_saga':null);
  if (sharpL)  return AUDIO_MAP[pfx+'_sola_sert']  ? pfx+'_sola_sert'  : (left ?pfx+'_sola':null);
  if (slightR) return AUDIO_MAP[pfx+'_saga_hafif'] ? pfx+'_saga_hafif' : (right?pfx+'_saga':null);
  if (slightL) return AUDIO_MAP[pfx+'_sola_hafif'] ? pfx+'_sola_hafif' : (left ?pfx+'_sola':null);
  if (right)   return AUDIO_MAP[pfx+'_saga'] ? pfx+'_saga' : null;
  if (left)    return AUDIO_MAP[pfx+'_sola'] ? pfx+'_sola' : null;
  return AUDIO_MAP[pfx+'_duz'] ? pfx+'_duz' : null;
}

function updateNavStep() {
  if (!steps[stepIdx]) return;
  const step = steps[stepIdx];
  const arrow = getArrow(step.type, step.modifier);
  const text  = translateStep(step.type, step.modifier, step.name);
  document.getElementById('nav-icon').textContent = arrow;
  document.getElementById('nav-instr').textContent = text;
  document.getElementById('nav-street').textContent = step.name || '';
  document.getElementById('ar-arrow').textContent = arrow;
  document.getElementById('ar-text').textContent = text;
}

function getArrow(type, mod) {
  if (type==='arrive') return String.fromCodePoint(0x1F3C1);
  if (type==='depart') return String.fromCodePoint(0x2191);
  if (type==='roundabout'||type==='rotary') return String.fromCodePoint(0x1F504);
  if (type==='u-turn') return String.fromCodePoint(0x21A9)+String.fromCodePoint(0x21A9);
  const m=mod||'';
  if (m.includes('sharp')&&m.includes('right')) return String.fromCodePoint(0x21AA);
  if (m.includes('sharp')&&m.includes('left'))  return String.fromCodePoint(0x21A9);
  if (m.includes('slight')&&m.includes('right')) return String.fromCodePoint(0x2197);
  if (m.includes('slight')&&m.includes('left'))  return String.fromCodePoint(0x2196);
  if (m.includes('right')) return String.fromCodePoint(0x2192);
  if (m.includes('left'))  return String.fromCodePoint(0x2190);
  return String.fromCodePoint(0x2191);
}

function translateStep(type, mod, street) {
  const s = street ? ' - ' + street : '';
  if (type==='arrive')  return 'Hedefinize ulastiniz' + s;
  if (type==='depart')  return 'Baslayin' + s;
  if (type==='roundabout'||type==='rotary') return 'Donel kavsjaktan cikin' + s;
  if (type==='u-turn')  return 'Geri donun' + s;
  const m=mod||'';
  if (m.includes('sharp')&&m.includes('right')) return 'Sert saga donun' + s;
  if (m.includes('sharp')&&m.includes('left'))  return 'Sert sola donun' + s;
  if (m.includes('slight')&&m.includes('right')) return 'Hafifce saga donun' + s;
  if (m.includes('slight')&&m.includes('left'))  return 'Hafifce sola donun' + s;
  if (m.includes('right')) return 'Saga donun' + s;
  if (m.includes('left'))  return 'Sola donun' + s;
  return 'Duz devam edin' + s;
}

// REROUTE
function checkOffRoute() {
  if (!settings.autoReroute || !routeCoords.length) return;
  const slice = routeCoords.slice(0, 50);
  const minDist = slice.reduce((min,c) => { const d=getDistance(userLat,userLon,c[1],c[0]); return d<min?d:min; }, Infinity);
  if (minDist > 80) { offRouteCount++; if (offRouteCount>=3) { offRouteCount=0; triggerReroute(); } } else offRouteCount=0;
}
function triggerReroute() {
  if (!destLat) return;
  const toast = document.getElementById('reroute-toast');
  toast.classList.remove('hidden'); playAudio('rota_yeniden');
  clearTimeout(rerouteTimer);
  rerouteTimer = setTimeout(async () => { await calcRoute(userLat,userLon,destLat,destLon); toast.classList.add('hidden'); }, 1500);
}

// ARAMA
async function searchPlace() {
  const q = document.getElementById('search-input').value.trim(); if (!q) return;
  try {
    const res = await fetch('https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(q) + '&format=json&limit=5&accept-language=tr');
    const data = await res.json();
    const box = document.getElementById('search-results'); box.innerHTML = '';
    if (!data.length) { box.innerHTML = '<div class="sr-item">Sonuc bulunamadi</div>'; return; }
    data.forEach(item => {
      const d = document.createElement('div'); d.className = 'sr-item'; d.textContent = item.display_name;
      d.onclick = () => { box.innerHTML=''; document.getElementById('search-input').value=item.display_name.split(',')[0]; map.flyTo({center:[+item.lon,+item.lat],zoom:15,duration:700}); setDestination(+item.lat,+item.lon,item.display_name.split(',')[0]); };
      box.appendChild(d);
    });
  } catch(e) {}
}
document.getElementById('search-input').addEventListener('keydown', e => { if(e.key==='Enter') searchPlace(); });

// RADAR
function loadRadars() { SAMPLE_RADARS.forEach(r => addRadarMarker(r)); fetchOSMRadars(); }
function addRadarMarker(r) {
  const el = document.createElement('div');
  el.style.cssText = 'font-size:22px;cursor:pointer;filter:drop-shadow(0 1px 3px rgba(0,0,0,.5))';
  el.textContent = r.type==='mobile' ? String.fromCodePoint(0x1F4F8) : r.type==='redlight' ? String.fromCodePoint(0x1F6A6) : String.fromCodePoint(0x1F4F7);
  const popup = new maplibregl.Popup({offset:18,closeButton:false}).setHTML('<b>' + r.name + '</b><br>Limit: ' + (r.limit>0?r.limit+' km/s':'Kirmizi Isik') + '<br>' + (r.type==='mobile'?'Seyyar':r.type==='redlight'?'Kirmizi Isik':'Sabit'));
  const m = new maplibregl.Marker({element:el,anchor:'center'}).setLngLat([r.lon,r.lat]).setPopup(popup).addTo(map);
  m._data = r; m._lastAlert = 0; radarMarkers.push(m);
}
async function fetchOSMRadars() {
  try {
    const zoom = map.getZoom(); if (zoom < 8) return;
    const b = map.getBounds();
    const bbox = b.getSouth()+','+b.getWest()+','+b.getNorth()+','+b.getEast();
    const q = '[out:json][timeout:20];(node["highway"="speed_camera"]('+bbox+');node["enforcement"="maxspeed"]('+bbox+');node["device"="speed_camera"]('+bbox+'););out body;';
    const res = await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:q});
    const data = await res.json();
    const existing = new Set(radarMarkers.map(m=>m._data.lat+','+m._data.lon));
    data.elements.forEach(el => {
      if (!el.lat) return;
      const key = el.lat+','+el.lon; if (existing.has(key)) return;
      addRadarMarker({lat:el.lat,lon:el.lon,type:el.tags&&el.tags.mobile==='yes'?'mobile':'fixed',limit:parseInt(el.tags&&el.tags.maxspeed)||50,name:'Radar'});
    });
  } catch(e) {}
}
function toggleRadarLayer(show) { radarMarkers.forEach(m => { m.getElement().style.display = show?'':'none'; }); }
function checkRadarProximity() {
  if (!settings.radarWarn) return;
  const now = Date.now();
  radarMarkers.forEach(m => {
    const r=m._data, dist=getDistance(userLat,userLon,r.lat,r.lon);
    if (dist<=1100&&dist>450&&now-m._lastAlert>12000) { m._lastAlert=now; showAlert('radar',Math.round(dist)); playAudio(r.type==='mobile'?'seyyar_1km':r.type==='redlight'?'kirmizi_isik':'radar_1km'); m.getElement().style.transform='scale(1.4)'; m.getElement().style.filter='drop-shadow(0 0 6px #ff0000)'; }
    else if (dist<=450&&dist>150&&now-m._lastAlert>8000) { m._lastAlert=now; showAlert('radar',Math.round(dist)); playAudio(r.type==='mobile'?'seyyar_500m':'radar_500m'); }
    else if (dist<=150&&now-m._lastAlert>5000) { m._lastAlert=now; showAlert('radar',Math.round(dist)); playAudio(r.type==='mobile'?'seyyar_200m':'radar_200m'); }
    else if (dist>1100) { m.getElement().style.transform='scale(1)'; m.getElement().style.filter='drop-shadow(0 1px 3px rgba(0,0,0,.5))'; }
  });
}

// POLIS
function loadPolice() { SAMPLE_POLICE.forEach(p => addPoliceMarker(p)); fetchOSMPolice(); }
function addPoliceMarker(p) {
  const el = document.createElement('div');
  el.style.cssText = 'font-size:22px;cursor:pointer;filter:drop-shadow(0 1px 3px rgba(0,0,0,.5))';
  el.textContent = p.type==='mobile' ? String.fromCodePoint(0x1F694) : String.fromCodePoint(0x1F46E);
  const m = new maplibregl.Marker({element:el,anchor:'center'}).setLngLat([p.lon,p.lat]).setPopup(new maplibregl.Popup({offset:18,closeButton:false}).setHTML('<b>'+p.name+'</b><br>'+(p.type==='mobile'?'Seyyar':'Sabit'))).addTo(map);
  m._data=p; m._lastAlert=0; policeMarkers.push(m);
}
async function fetchOSMPolice() {
  try {
    const zoom=map.getZoom(); if(zoom<8)return;
    const b=map.getBounds();
    const bbox=b.getSouth()+','+b.getWest()+','+b.getNorth()+','+b.getEast();
    const q='[out:json][timeout:10];(node["amenity"="police"]('+bbox+'););out body;';
    const res=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:q});
    const data=await res.json();
    const existing=new Set(policeMarkers.map(m=>m._data.lat+','+m._data.lon));
    data.elements.forEach(el=>{if(!el.lat)return;const key=el.lat+','+el.lon;if(existing.has(key))return;addPoliceMarker({lat:el.lat,lon:el.lon,type:'checkpoint',name:(el.tags&&el.tags.name)||'Polis'});});
  } catch(e) {}
}
function togglePoliceLayer(show) { policeMarkers.forEach(m=>{m.getElement().style.display=show?'':'none';}); }
function checkPoliceProximity() {
  if (!settings.policeWarn) return;
  const now=Date.now();
  policeMarkers.forEach(m=>{
    const p=m._data, dist=getDistance(userLat,userLon,p.lat,p.lon);
    if(dist<=1100&&dist>450&&now-m._lastAlert>12000){m._lastAlert=now;showAlert('police',Math.round(dist));playAudio(p.type==='mobile'?'seyyar_polis_1km':'polis_1km');}
    else if(dist<=450&&dist>150&&now-m._lastAlert>8000){m._lastAlert=now;showAlert('police',Math.round(dist));playAudio('polis_500m');}
    else if(dist<=150&&now-m._lastAlert>5000){m._lastAlert=now;showAlert('police',Math.round(dist));playAudio(p.type==='mobile'?'seyyar_polis_200m':'polis_200m');}
  });
}
function showAlert(type,dist){const el=document.getElementById(type==='radar'?'radar-alert':'police-alert');document.getElementById(type==='radar'?'radar-dist-text':'police-dist-text').textContent=dist+' m';el.classList.remove('hidden');setTimeout(()=>el.classList.add('hidden'),4000);}
`;

fs.appendFileSync(out, code, 'utf8');
console.log('Part 3 OK');
