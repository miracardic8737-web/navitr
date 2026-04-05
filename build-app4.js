const fs = require('fs');
const out = 'public/app.js';

const code = `
// UCRETLI YOL & YOL CALISMASI
function loadTollAndRoadwork() { fetchTollRoads(); fetchRoadworks(); }
async function fetchTollRoads() {
  try {
    const b = userLat-.5+','+( userLon-.5)+','+( userLat+.5)+','+( userLon+.5);
    const q = '[out:json][timeout:15];(way["toll"="yes"]('+b+');node["barrier"="toll_booth"]('+b+'););out body geom;';
    const res=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:q});
    const data=await res.json();
    data.elements.forEach(el=>{
      const lat=el.lat||(el.geometry&&el.geometry[0]&&el.geometry[0].lat);
      const lon=el.lon||(el.geometry&&el.geometry[0]&&el.geometry[0].lon);
      if(!lat||!lon)return;
      const div=document.createElement('div');div.style.cssText='font-size:18px;cursor:pointer';div.textContent=String.fromCodePoint(0x1F4B0);
      const m=new maplibregl.Marker({element:div,anchor:'center'}).setLngLat([lon,lat]).setPopup(new maplibregl.Popup({offset:16,closeButton:false}).setHTML('<b>Ucretli Yol</b><br>'+(el.tags&&el.tags.name||''))).addTo(map);
      m._lat=lat;m._lon=lon;tollMarkers.push(m);
    });
  } catch(e) {}
}
async function fetchRoadworks() {
  try {
    const b = userLat-.5+','+(userLon-.5)+','+(userLat+.5)+','+(userLon+.5);
    const q = '[out:json][timeout:15];(node["highway"="construction"]('+b+');way["highway"="construction"]('+b+');node["hazard"="road_works"]('+b+'););out body geom;';
    const res=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:q});
    const data=await res.json();
    data.elements.forEach(el=>{
      const lat=el.lat||(el.geometry&&el.geometry[0]&&el.geometry[0].lat);
      const lon=el.lon||(el.geometry&&el.geometry[0]&&el.geometry[0].lon);
      if(!lat||!lon)return;
      const div=document.createElement('div');div.style.cssText='font-size:18px;cursor:pointer';div.textContent=String.fromCodePoint(0x1F6A7);
      const m=new maplibregl.Marker({element:div,anchor:'center'}).setLngLat([lon,lat]).setPopup(new maplibregl.Popup({offset:16,closeButton:false}).setHTML('<b>Yol Calismasi</b><br>'+(el.tags&&el.tags.name||''))).addTo(map);
      m._lat=lat;m._lon=lon;roadworkMarkers.push(m);
    });
  } catch(e) {}
}
function toggleTollLayer(v){tollActive=v!==undefined?v:!tollActive;document.getElementById('fab-toll')&&document.getElementById('fab-toll').classList.toggle('active',tollActive);const cb=document.getElementById('lyr-toll');if(cb)cb.checked=tollActive;tollMarkers.forEach(m=>{m.getElement().style.display=tollActive?'':'none';});if(tollActive&&tollMarkers.length===0)fetchTollRoads();}
function toggleRoadworkLayer(v){roadworkActive=v!==undefined?v:!roadworkActive;document.getElementById('fab-roadwork')&&document.getElementById('fab-roadwork').classList.toggle('active',roadworkActive);const cb=document.getElementById('lyr-roadwork');if(cb)cb.checked=roadworkActive;roadworkMarkers.forEach(m=>{m.getElement().style.display=roadworkActive?'':'none';});if(roadworkActive&&roadworkMarkers.length===0)fetchRoadworks();}

// TRAFIK
let trafficPolylines=[];
function toggleTraffic(){
  trafficActive=!trafficActive;document.getElementById('fab-traffic').classList.toggle('active',trafficActive);
  if(trafficActive){fetchTrafficData();document.getElementById('traffic-legend').classList.remove('hidden');playAudio('trafik_acildi');}
  else{trafficPolylines.forEach(id=>{try{map.removeLayer(id);map.removeSource(id);}catch(e){}});trafficPolylines=[];document.getElementById('traffic-legend').classList.add('hidden');playAudio('trafik_kapandi');}
}
function toggleTrafficLayer(show){if(show!==trafficActive)toggleTraffic();}
async function fetchTrafficData(){
  try{
    const b=userLat-.12+','+(userLon-.12)+','+(userLat+.12)+','+(userLon+.12);
    const q='[out:json][timeout:12];way["highway"~"motorway|trunk|primary|secondary"]('+b+');out geom;';
    const res=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:q});
    const data=await res.json();
    data.elements.slice(0,60).forEach((way,i)=>{
      if(!way.geometry)return;
      const coords=way.geometry.map(p=>[p.lon,p.lat]);
      const hw=way.tags&&way.tags.highway;
      const color=hw==='motorway'?'#d50000':hw==='trunk'?'#ff6d00':hw==='primary'?'#ffd600':'#00c853';
      const sid='tr-'+i;
      try{map.addSource(sid,{type:'geojson',data:{type:'Feature',geometry:{type:'LineString',coordinates:coords}}});map.addLayer({id:sid,type:'line',source:sid,paint:{'line-color':color,'line-width':4,'line-opacity':0.7}});trafficPolylines.push(sid);}catch(e){}
    });
  }catch(e){}
}

// YAKINDAKI YERLER
async function fetchNearbyFromOSM(){
  document.getElementById('nearby-list').innerHTML='<div class="ni" style="color:#aaa;text-align:center;padding:16px">Yukleniyor...</div>';
  try{
    const q='[out:json][timeout:20];(node["amenity"~"restaurant|cafe|fuel|hospital|pharmacy|atm|parking|hotel|mosque|bank|supermarket|school|fast_food|bar|cinema"](around:3000,'+userLat+','+userLon+');node["tourism"~"hotel|attraction|museum"](around:3000,'+userLat+','+userLon+');node["shop"~"supermarket|convenience|bakery"](around:3000,'+userLat+','+userLon+'););out body;';
    const res=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:q});
    const data=await res.json();
    nearbyData=data.elements.filter(el=>el.lat&&el.lon).map(el=>({lat:el.lat,lon:el.lon,name:(el.tags&&(el.tags.name||el.tags.amenity||el.tags.tourism||el.tags.shop))||'Bilinmeyen',type:(el.tags&&(el.tags.amenity||el.tags.tourism||el.tags.shop))||'other',dist:Math.round(getDistance(userLat,userLon,el.lat,el.lon))})).sort((a,b)=>a.dist-b.dist);
    renderNearbyList();
  }catch(e){document.getElementById('nearby-list').innerHTML='<div class="ni" style="color:#f88;text-align:center;padding:16px">Yuklenemedi. <span style="color:#6c63ff;cursor:pointer" onclick="fetchNearbyFromOSM()">Tekrar dene</span></div>';}
}
const NI={restaurant:'🍽️',cafe:'☕',fuel:'⛽',hospital:'🏥',pharmacy:'💊',atm:'🏧',parking:'🅿️',hotel:'🏨',mosque:'🕌',bank:'🏦',supermarket:'🛒',school:'🏫',attraction:'🎯',fast_food:'🍔',bar:'🍺',cinema:'🎬',museum:'🏛️',bakery:'🥖',convenience:'🏪'};
const NT={restaurant:'Restoran',cafe:'Kafe',fuel:'Akaryakit',hospital:'Hastane',pharmacy:'Eczane',atm:'ATM',parking:'Otopark',hotel:'Otel',mosque:'Cami',bank:'Banka',supermarket:'Market',school:'Okul',attraction:'Turistik Alan',fast_food:'Fast Food',bar:'Bar',cinema:'Sinema',museum:'Muze',bakery:'Firin',convenience:'Market'};
function renderNearbyList(){
  const filtered=nearbyFilter==='all'?nearbyData:nearbyData.filter(i=>i.type.includes(nearbyFilter));
  if(!filtered.length){document.getElementById('nearby-list').innerHTML='<div class="ni" style="color:#aaa;text-align:center;padding:16px">Bu kategoride yer bulunamadi</div>';return;}
  document.getElementById('nearby-list').innerHTML=filtered.slice(0,40).map(item=>'<div class="ni" onclick="goToNearby('+item.lat+','+item.lon+',\\''+item.name.replace(/'/g,"\\'")+'\\')"><div class="ni-name">'+(NI[item.type]||'📍')+' '+item.name+'</div><div class="ni-meta">'+(NT[item.type]||item.type)+' - '+(item.dist<1000?item.dist+' m':(item.dist/1000).toFixed(1)+' km')+'</div></div>').join('');
}
function filterNearby(f,btn){nearbyFilter=f;document.querySelectorAll('.cat').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderNearbyList();}
function goToNearby(lat,lon,name){setDestination(lat,lon,name);closePanel('nearby-panel');}

// KAYITLI KONUMLAR
function addPersistentMarker(key,lat,lon,emoji,label){
  if(SAVED_PINS[key]&&SAVED_PINS[key].marker)SAVED_PINS[key].marker.remove();
  const el=document.createElement('div');
  el.style.cssText='display:flex;flex-direction:column;align-items:center;cursor:pointer';
  el.innerHTML='<div style="font-size:26px;filter:drop-shadow(0 2px 6px rgba(0,0,0,.6))">'+emoji+'</div><div style="font-size:10px;color:#fff;background:rgba(0,0,0,.7);padding:1px 5px;border-radius:4px;margin-top:1px;white-space:nowrap">'+label+'</div>';
  const m=new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat([lon,lat]).setPopup(new maplibregl.Popup({offset:20,closeButton:false}).setHTML('<b>'+emoji+' '+label+'</b><br>'+lat.toFixed(5)+', '+lon.toFixed(5)+'<br><button onclick="setDestination('+lat+','+lon+',\\''+label+'\\')" style="margin-top:6px;padding:4px 10px;background:#6c63ff;color:#fff;border:none;border-radius:6px;cursor:pointer">Buraya Git</button>')).addTo(map);
  SAVED_PINS[key]={lat,lon,emoji,label,marker:m};
  localStorage.setItem('pin_'+key,JSON.stringify({lat,lon,emoji,label}));
}
function loadSavedPins(){Object.keys(localStorage).filter(k=>k.startsWith('pin_')).forEach(k=>{try{const d=JSON.parse(localStorage.getItem(k));addPersistentMarker(k.replace('pin_',''),d.lat,d.lon,d.emoji,d.label);}catch(e){}});}
function saveHome(){addPersistentMarker('home',userLat,userLon,'🏠','Evim');playAudio('ev_kaydedildi');}
function saveCar(){addPersistentMarker('car',userLat,userLon,'🚗','Arabam');playAudio('araba_kaydedildi');}
function goHome(){const d=SAVED_PINS['home']||JSON.parse(localStorage.getItem('pin_home')||'null');if(d)setDestination(d.lat,d.lon,'Ev');}
function gotoCar(){const d=SAVED_PINS['car']||JSON.parse(localStorage.getItem('pin_car')||'null');if(d)setDestination(d.lat,d.lon,'Arabam');}
function saveCustomPin(lat,lon,name){addPersistentMarker('custom_'+Date.now(),lat,lon,'📌',name||'Kayitli Yer');}
function renderPinsList(){
  const list=document.getElementById('pins-list');
  const keys=Object.keys(localStorage).filter(k=>k.startsWith('pin_'));
  if(!keys.length){list.innerHTML='<div style="color:#888;font-size:12px;padding:8px">Kayitli yer yok</div>';return;}
  list.innerHTML=keys.map(k=>{const d=JSON.parse(localStorage.getItem(k)||'null');if(!d)return'';const key=k.replace('pin_','');return'<div class="ni"><div class="ni-name">'+d.emoji+' '+d.label+'</div><div class="ni-meta">'+d.lat.toFixed(4)+', '+d.lon.toFixed(4)+'</div><div style="display:flex;gap:6px;margin-top:4px"><button onclick="setDestination('+d.lat+','+d.lon+',\\''+d.label+'\\')" style="flex:1;padding:4px;border-radius:6px;border:none;background:#6c63ff;color:#fff;font-size:11px;cursor:pointer">Git</button><button onclick="deletePin(\\''+key+'\\')" style="padding:4px 8px;border-radius:6px;border:none;background:#d50000;color:#fff;font-size:11px;cursor:pointer">Sil</button></div></div>';}).join('');
}
function deletePin(key){if(SAVED_PINS[key]&&SAVED_PINS[key].marker)SAVED_PINS[key].marker.remove();delete SAVED_PINS[key];localStorage.removeItem('pin_'+key);renderPinsList();}
function clearAllPins(){if(!confirm('Tum kayitli yerler silinsin mi?'))return;Object.keys(SAVED_PINS).forEach(k=>{SAVED_PINS[k]&&SAVED_PINS[k].marker&&SAVED_PINS[k].marker.remove();delete SAVED_PINS[k];});Object.keys(localStorage).filter(k=>k.startsWith('pin_')).forEach(k=>localStorage.removeItem(k));renderPinsList();}

// PAYLASIM
function shareLocation(){openPanel('share-panel');document.getElementById('share-link').value=location.origin+location.pathname+'?share='+shareId;settings.shareLocation=true;playAudio('konum_paylasim');}
function copyShareLink(){document.getElementById('share-link').select();document.execCommand('copy');playAudio('link_kopyalandi');}
function stopSharing(){settings.shareLocation=false;closePanel('share-panel');playAudio('paylasim_durdu');}
function sendLocationShare(){localStorage.setItem('share_'+shareId,JSON.stringify({lat:userLat,lon:userLon,t:Date.now()}));}

// AR
async function toggleAR(){
  arActive=!arActive;const ov=document.getElementById('ar-overlay');
  if(arActive){try{arStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});document.getElementById('ar-video').srcObject=arStream;ov.classList.remove('hidden');playAudio('ar_acildi');drawAROverlay();}catch(e){arActive=false;}}
  else{ov.classList.add('hidden');if(arStream){arStream.getTracks().forEach(t=>t.stop());arStream=null;}playAudio('ar_kapandi');}
}
function drawAROverlay(){
  if(!arActive)return;const canvas=document.getElementById('ar-canvas');const ctx=canvas.getContext('2d');canvas.width=innerWidth;canvas.height=innerHeight;ctx.clearRect(0,0,canvas.width,canvas.height);
  radarMarkers.forEach(m=>{const d=getDistance(userLat,userLon,m._data.lat,m._data.lon);if(d<500){ctx.fillStyle='rgba(213,0,0,.8)';ctx.font='bold 17px sans-serif';ctx.fillText('RADAR '+Math.round(d)+'m',canvas.width/2-50,65);}});
  requestAnimationFrame(drawAROverlay);
}

// GECE MODU
function toggleNightMode(on){nightModeAuto=on;if(on){const h=new Date().getHours();changeBasemap(h>=20||h<7?'dark':'3d');}else changeBasemap('3d');}

// HIZ GOSTERGESI
function drawSpeedometer(speed){
  const canvas=document.getElementById('spd-canvas');const ctx=canvas.getContext('2d');const cx=50,cy=50,r=42;
  ctx.clearRect(0,0,100,100);ctx.beginPath();ctx.arc(cx,cy,r,Math.PI*.75,Math.PI*2.25);ctx.strokeStyle='#1e1e3a';ctx.lineWidth=9;ctx.stroke();
  const pct=Math.min(speed/200,1);const color=speed>120?'#d50000':speed>80?'#ffd600':'#48cfad';
  if(pct>0){ctx.beginPath();ctx.arc(cx,cy,r,Math.PI*.75,Math.PI*.75+pct*Math.PI*1.5);ctx.strokeStyle=color;ctx.lineWidth=9;ctx.lineCap='round';ctx.stroke();}
}

// PANEL
function openPanel(id){
  document.getElementById(id).classList.toggle('hidden');
  if(id==='nearby-panel'&&!document.getElementById(id).classList.contains('hidden'))fetchNearbyFromOSM();
  if(id==='pins-panel'&&!document.getElementById(id).classList.contains('hidden'))renderPinsList();
}
function closePanel(id){document.getElementById(id).classList.add('hidden');}

// SES
let audioQueue=[],audioPlaying=false;
const AUDIO_MAP={
  saga_don:'saga_don',sola_don:'sola_don',duz_devam:'duz_devam',saga_hafif:'saga_hafif',sola_hafif:'sola_hafif',saga_sert:'saga_sert',sola_sert:'sola_sert',geri_don:'geri_don',
  kavsaktan_cik:'kavsaktan_cik',donelden_cik:'donelden_cik',
  '50m_saga':'50m_saga','50m_sola':'50m_sola','50m_saga_sert':'50m_saga_sert','50m_sola_sert':'50m_sola_sert','50m_saga_hafif':'50m_saga_hafif','50m_sola_hafif':'50m_sola_hafif','50m_geri':'50m_geri',
  '100m_saga':'100m_saga','100m_sola':'100m_sola','100m_duz':'100m_duz',
  '200m_saga':'200m_saga','200m_sola':'200m_sola','200m_duz':'200m_duz','200m_saga_sert':'200m_saga_sert','200m_sola_sert':'200m_sola_sert','200m_saga_hafif':'200m_saga_hafif','200m_sola_hafif':'200m_sola_hafif','200m_geri':'200m_geri','200m_kavsaktan_cik':'200m_kavsaktan_cik',
  '500m_saga':'500m_saga','500m_sola':'500m_sola','500m_duz':'500m_duz','500m_saga_sert':'500m_saga_sert','500m_sola_sert':'500m_sola_sert','500m_saga_hafif':'500m_saga_hafif','500m_sola_hafif':'500m_sola_hafif','500m_kavsaktan_cik':'500m_kavsaktan_cik',
  '1km_saga':'1km_saga','1km_sola':'1km_sola','1km_duz':'1km_duz','1km_saga_sert':'1km_saga_sert','1km_sola_sert':'1km_sola_sert','1km_saga_hafif':'1km_saga_hafif','1km_sola_hafif':'1km_sola_hafif','1km_kavsaktan_cik':'1km_kavsaktan_cik','1km_geri':'1km_geri',
  '2km_saga':'2km_saga','2km_sola':'2km_sola',
  hedefe_ulastiniz:'hedefe_ulastiniz',hedefe_yaklasiyorsunuz:'hedefe_yaklasiyorsunuz',rota_yeniden:'rota_yeniden',rota_hazir:'rota_hazir',rota_iptal:'rota_iptal',yola_devam:'yola_devam',
  saga_don_sonra_sola:'saga_don_sonra_sola',sola_don_sonra_saga:'sola_don_sonra_saga',kopruyu_gec:'kopruyu_gec',tunelden_gec:'tunelden_gec',otoyola_gir:'otoyola_gir',otoyoldan_cik:'otoyoldan_cik',saga_cik:'saga_cik',sola_cik:'sola_cik',yolu_takip_et:'yolu_takip_et',saga_kal:'saga_kal',sola_kal:'sola_kal',merkeze_dogru:'merkeze_dogru',
  radar_1km:'radar_1km',radar_500m:'radar_500m',radar_200m:'radar_200m',radar_simdi:'radar_simdi',seyyar_1km:'seyyar_1km',seyyar_500m:'seyyar_500m',seyyar_200m:'seyyar_200m',kirmizi_isik:'kirmizi_isik',hiz_asimi:'hiz_asimi',hiz_normal:'hiz_normal',
  polis_1km:'polis_1km',polis_500m:'polis_500m',polis_200m:'polis_200m',seyyar_polis_1km:'seyyar_polis_1km',seyyar_polis_200m:'seyyar_polis_200m',
  trafik_yogun:'trafik_yogun',trafik_acik:'trafik_acik',trafik_acildi:'trafik_acildi',trafik_kapandi:'trafik_kapandi',alternatif_rota:'alternatif_rota',
  konum_paylasim:'konum_paylasim',paylasim_durdu:'paylasim_durdu',ev_kaydedildi:'ev_kaydedildi',araba_kaydedildi:'araba_kaydedildi',ar_acildi:'ar_acildi',ar_kapandi:'ar_kapandi',link_kopyalandi:'link_kopyalandi',gps_zayif:'gps_zayif',internet_yok:'internet_yok',rota_hesaplaniyor:'rota_hesaplaniyor',
};
function playAudio(key){if(!settings.voice||!key||!AUDIO_MAP[key])return;audioQueue.push('/audio/'+AUDIO_MAP[key]+'.mp3');if(!audioPlaying)processQueue();}
function processQueue(){if(!audioQueue.length){audioPlaying=false;return;}audioPlaying=true;const a=new Audio(audioQueue.shift());a.onended=processQueue;a.onerror=processQueue;a.play().catch(processQueue);}

// YARDIMCI
function getDistance(lat1,lon1,lat2,lon2){const R=6371000,dLat=(lat2-lat1)*Math.PI/180,dLon=(lon2-lon1)*Math.PI/180;const a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));}
function calcBearing(lat1,lon1,lat2,lon2){const dLon=(lon2-lon1)*Math.PI/180;const y=Math.sin(dLon)*Math.cos(lat2*Math.PI/180);const x=Math.cos(lat1*Math.PI/180)*Math.sin(lat2*Math.PI/180)-Math.sin(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.cos(dLon);return(Math.atan2(y,x)*180/Math.PI+360)%360;}
function getArrivalTime(secs){const d=new Date(Date.now()+secs*1000);return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0');}

document.addEventListener('keydown',e=>{if(e.key==='Escape'){cancelRoute();closeRouteModal();}});
`;

fs.appendFileSync(out, code, 'utf8');
console.log('Part 4 OK - total lines:', fs.readFileSync(out,'utf8').split('\n').length);
