// Navitr v3 - Turkce Sesli Navigasyon


// ============ AUDIO MAP - 250+ ses ============
const AM = {
  // Navigasyon temel
  rota_basladi:'rota_basladi', hedefe_ulastiniz:'hedefe_ulastiniz',
  rota_hesaplaniyor:'rota_hesaplaniyor', rota_iptal:'rota_iptal', rota_yeniden:'rota_yeniden',
  rota_hazir:'rota_hazir', alternatif_rota:'alternatif_rota',
  // Yön - 1km
  '1km_saga':'1km_saga','1km_sola':'1km_sola','1km_duz':'1km_duz',
  '1km_saga_hafif':'1km_saga_hafif','1km_sola_hafif':'1km_sola_hafif',
  '1km_saga_sert':'1km_saga_sert','1km_sola_sert':'1km_sola_sert',
  '1km_kavsaktan_cik':'1km_kavsaktan_cik','1km_geri':'1km_geri',
  '2km_saga':'2km_saga','2km_sola':'2km_sola',
  // Yön - 500m
  '500m_saga':'500m_saga','500m_sola':'500m_sola','500m_duz':'500m_duz',
  '500m_saga_hafif':'500m_saga_hafif','500m_sola_hafif':'500m_sola_hafif',
  '500m_saga_sert':'500m_saga_sert','500m_sola_sert':'500m_sola_sert',
  '500m_kavsaktan_cik':'500m_kavsaktan_cik',
  // Yön - 200m
  '200m_saga':'200m_saga','200m_sola':'200m_sola','200m_duz':'200m_duz',
  '200m_saga_hafif':'200m_saga_hafif','200m_sola_hafif':'200m_sola_hafif',
  '200m_saga_sert':'200m_saga_sert','200m_sola_sert':'200m_sola_sert',
  '200m_kavsaktan_cik':'200m_kavsaktan_cik','200m_geri':'200m_geri',
  // Yön - 100m
  '100m_saga':'100m_saga','100m_sola':'100m_sola',
  // Yön - 50m
  '50m_saga':'50m_saga','50m_sola':'50m_sola',
  '50m_saga_hafif':'50m_saga_hafif','50m_sola_hafif':'50m_sola_hafif',
  '50m_saga_sert':'50m_saga_sert','50m_sola_sert':'50m_sola_sert',
  '50m_geri':'50m_geri',
  // Anlık yön
  saga_don:'saga_don', sola_don:'sola_don', duz_devam:'duz_devam', geri_don:'geri_don',
  saga_hafif:'saga_hafif', sola_hafif:'sola_hafif', saga_sert:'saga_sert', sola_sert:'sola_sert',
  saga_kal:'saga_kal', sola_kal:'sola_kal', saga_cik:'saga_cik', sola_cik:'sola_cik',
  kavsaktan_cik:'kavsaktan_cik', donelden_cik:'donelden_cik',
  saga_don_sonra_sola:'saga_don_sonra_sola', sola_don_sonra_saga:'sola_don_sonra_saga',
  // Radar
  radar_1km:'radar_1km', radar_500m:'radar_500m', radar_200m:'radar_200m', radar_simdi:'radar_simdi',
  polis_1km:'polis_1km', polis_500m:'polis_500m', polis_200m:'polis_200m',
  seyyar_1km:'seyyar_1km', seyyar_500m:'seyyar_500m', seyyar_200m:'seyyar_200m',
  seyyar_polis_1km:'seyyar_polis_1km', seyyar_polis_200m:'seyyar_polis_200m',
  // GPS
  gps_zayif:'gps_zayif', gps_gitti:'gps_zayif', gps_geldi:'yola_devam',
  internet_yok:'internet_yok',
  // Kayıt
  ev_kaydedildi:'ev_kaydedildi', araba_kaydedildi:'araba_kaydedildi',
  // Trafik
  trafik_yogun:'trafik_yogun', trafik_acik:'trafik_acik',
  trafik_acildi:'trafik_acildi', trafik_kapandi:'trafik_kapandi',
  // Yol
  otoyola_gir:'otoyola_gir', otoyoldan_cik:'otoyoldan_cik',
  kopruyu_gec:'kopruyu_gec', tunelden_gec:'tunelden_gec',
  merkeze_dogru:'merkeze_dogru', yola_devam:'yola_devam', yolu_takip_et:'yolu_takip_et',
  // Diğer
  hedefe_yaklasiyorsunuz:'hedefe_yaklasiyorsunuz', hiz_asimi:'hiz_asimi',
  kirmizi_isik:'kirmizi_isik', ar_acildi:'ar_acildi', ar_kapandi:'ar_kapandi',
  konum_paylasim:'konum_paylasim', link_kopyalandi:'link_kopyalandi', paylasim_durdu:'paylasim_durdu',
  vites_1:'vites_1',vites_2:'vites_2',vites_3:'vites_3',vites_4:'vites_4',
  vites_5:'vites_5',vites_6:'vites_6',vites_asagi:'vites_asagi',vites_yukari:'vites_yukari',
  donelden_1_cikis:'kavsaktan_cik', donelden_2_cikis:'kavsaktan_cik',
  donelden_3_cikis:'kavsaktan_cik', donelden_4_cikis:'kavsaktan_cik',
  '1km_donelden_cik':'1km_kavsaktan_cik','500m_donelden_cik':'500m_kavsaktan_cik',
  '200m_donelden_cik':'200m_kavsaktan_cik',
  saga_don_200m:'200m_saga', sola_don_200m:'200m_sola',
  duz_500m:'500m_duz', duz_200m:'200m_duz', duz_1km:'1km_duz',
  rota_iptal_edildi:'rota_iptal', navigasyon_basladi:'rota_basladi',
  hedefe_ulasiyorsunuz:'hedefe_yaklasiyorsunuz',
  sol_serit:'sola_kal', sag_serit:'saga_kal',
  sol_cikis:'sola_cik', sag_cikis:'saga_cik',
  kopru_oncesi:'kopruyu_gec', tunel_oncesi:'tunelden_gec',
  otoyol_girisi:'otoyola_gir', otoyol_cikisi:'otoyoldan_cik',
  yol_sonu_saga:'saga_don', yol_sonu_sola:'sola_don',
  catal_saga:'saga_cik', catal_sola:'sola_cik',
  birlesme_saga:'saga_kal', birlesme_sola:'sola_kal',
  geri_don_200m:'200m_geri', geri_don_50m:'50m_geri',
  '100m_duz':'duz_devam','100m_geri':'100m_sola'
};

// ============ SAMPLE DATA - Türkiye geneli ============
const SAMPLE_RADARS = [
  // İstanbul
  {lat:41.015,lon:28.979,limit:50},{lat:41.068,lon:29.005,limit:50},
  {lat:41.042,lon:28.986,limit:70},{lat:40.990,lon:28.820,limit:90},
  {lat:41.105,lon:29.021,limit:50},{lat:40.978,lon:29.125,limit:70},
  // Ankara
  {lat:39.925,lon:32.836,limit:90},{lat:39.912,lon:32.854,limit:50},
  {lat:39.940,lon:32.820,limit:70},{lat:39.960,lon:32.880,limit:80},
  // İzmir
  {lat:38.419,lon:27.129,limit:70},{lat:38.440,lon:27.150,limit:50},
  {lat:38.460,lon:27.200,limit:90},{lat:38.395,lon:27.080,limit:70},
  // Antalya
  {lat:36.886,lon:30.704,limit:50},{lat:36.900,lon:30.720,limit:70},
  {lat:36.870,lon:30.680,limit:90},
  // Bursa
  {lat:40.193,lon:29.061,limit:80},{lat:40.210,lon:29.080,limit:50},
  {lat:40.180,lon:29.040,limit:70},
  // Adana
  {lat:37.000,lon:35.321,limit:90},{lat:37.015,lon:35.340,limit:70},
  // Konya
  {lat:37.874,lon:32.493,limit:90},{lat:37.890,lon:32.510,limit:70},
  // Kocaeli
  {lat:40.765,lon:30.394,limit:80},{lat:40.780,lon:30.410,limit:90},
  // Edirne
  {lat:41.680,lon:26.559,limit:90},{lat:41.695,lon:26.575,limit:70},
  // Sivas
  {lat:39.776,lon:37.015,limit:70},{lat:39.790,lon:37.030,limit:90},
  // Malatya
  {lat:38.680,lon:39.226,limit:90},
  // Denizli
  {lat:37.760,lon:29.086,limit:80},
  // Bolu
  {lat:40.550,lon:31.600,limit:90},{lat:40.565,lon:31.620,limit:80},
  // Gaziantep
  {lat:37.066,lon:37.383,limit:70},{lat:37.080,lon:37.400,limit:90},
  // Trabzon
  {lat:41.005,lon:39.730,limit:50},{lat:41.020,lon:39.750,limit:70},
  // Diyarbakır
  {lat:37.910,lon:40.218,limit:70},
  // Kayseri
  {lat:38.732,lon:35.487,limit:80},{lat:38.750,lon:35.510,limit:70},
  // Eskişehir
  {lat:39.776,lon:30.520,limit:90},{lat:39.790,lon:30.540,limit:70},
  // Mersin
  {lat:36.812,lon:34.641,limit:70},{lat:36.830,lon:34.660,limit:90},
  // Samsun
  {lat:41.286,lon:36.330,limit:70},{lat:41.300,lon:36.350,limit:50},
  // Hatay
  {lat:36.590,lon:36.172,limit:70},
  // Muğla
  {lat:37.215,lon:28.363,limit:70},{lat:37.230,lon:28.380,limit:50},
  // Sakarya
  {lat:40.690,lon:30.430,limit:90},
  // Tekirdağ
  {lat:40.978,lon:27.515,limit:90},{lat:40.990,lon:27.530,limit:70},
  // Balıkesir
  {lat:39.649,lon:27.886,limit:80},
  // Manisa
  {lat:38.614,lon:27.426,limit:70},
  // Afyon
  {lat:38.757,lon:30.540,limit:90},
  // Çanakkale
  {lat:40.155,lon:26.414,limit:70},
  // Zonguldak
  {lat:41.456,lon:31.789,limit:70},
  // Kastamonu
  {lat:41.375,lon:33.775,limit:80},
  // Erzurum
  {lat:39.905,lon:41.270,limit:70},
  // Van
  {lat:38.494,lon:43.380,limit:70}
];

const SAMPLE_MOBILE = [
  {lat:41.020,lon:28.950},{lat:39.940,lon:32.860},{lat:38.430,lon:27.150},
  {lat:37.010,lon:35.340},{lat:40.200,lon:29.080},{lat:39.100,lon:35.500},
  {lat:37.500,lon:36.900},{lat:41.200,lon:32.600},{lat:40.600,lon:31.500},
  {lat:38.750,lon:35.500},{lat:37.070,lon:37.390},{lat:41.010,lon:39.740},
  {lat:37.920,lon:40.220},{lat:38.740,lon:35.490},{lat:39.780,lon:30.530},
  {lat:36.820,lon:34.650},{lat:41.290,lon:36.340},{lat:40.700,lon:30.440}
];

const SAMPLE_POLICE = [
  {lat:41.013,lon:28.955},{lat:39.920,lon:32.854},{lat:38.423,lon:27.143},
  {lat:37.005,lon:35.325},{lat:40.198,lon:29.065},{lat:36.890,lon:30.710},
  {lat:41.685,lon:26.565},{lat:39.780,lon:37.020},{lat:38.700,lon:39.230},
  {lat:37.770,lon:29.090},{lat:40.560,lon:31.610},{lat:37.075,lon:37.395},
  {lat:41.015,lon:39.745},{lat:37.915,lon:40.225},{lat:38.745,lon:35.495},
  {lat:39.785,lon:30.535},{lat:36.825,lon:34.655},{lat:41.295,lon:36.345},
  {lat:40.695,lon:30.435},{lat:40.985,lon:27.520}
];

// ============ STATE ============
let map, userMarker, destMarker, watchId;
let userLat=null, userLon=null, userBearing=0, userSpeed=0;
let navActive=false, driveMode=false, recalcCooldown=false;
let routeSteps=[], stepIdx=0, altRoutes=[], selRoute=0, destCoords=null;
let radarState={}, policeState={}, mobileState={};
let arMode=false, arStream=null, longTimer=null;
let trafficActive=false, tiltOn=false;
let audioQ=[], audioPlaying=false, curAudio=null, audioLock=false;
let vehicleAvatar='car', avatarMode='3d'; // '3d' veya '2d'
let savedPlaces=JSON.parse(localStorage.getItem('nav_places')||'[]');
let homePos=JSON.parse(localStorage.getItem('nav_home')||'null');
let carPos=JSON.parse(localStorage.getItem('nav_car')||'null');
let radarMarkers=[], mobileMarkers=[], policeMarkers=[];
let gpsLost=false, gpsLostTimer=null;
let cameraMode='follow'; // 'follow'|'top'|'front'|'back'|'left'|'right'
const settings={voice:true,radar:true,police:true,autoReroute:true};
let selTransport='driving', selPref='fastest';
let lpLat=null, lpLon=null;
let mapAnimFrame=null;

// ============ AUDIO - çakışmasız kuyruk ============
function playAudio(key){
  if(!settings.voice)return;
  const file=AM[key];
  if(!file)return;
  // Aynı ses zaten kuyruktaysa ekleme
  const src='/audio/'+file+'.mp3';
  if(audioQ.includes(src))return;
  audioQ.push(src);
  if(!audioPlaying)nextAudio();
}
function nextAudio(){
  if(!audioQ.length){audioPlaying=false;return;}
  audioPlaying=true;
  curAudio=new Audio(audioQ.shift());
  curAudio.onended=nextAudio;
  curAudio.onerror=()=>{audioPlaying=false;nextAudio();};
  curAudio.play().catch(()=>{audioPlaying=false;nextAudio();});
}
function stopAudio(){
  audioQ=[];
  if(curAudio){try{curAudio.pause();}catch(e){}curAudio=null;}
  audioPlaying=false;
}
function clearAudioQueue(){audioQ=[];}

// ============ MATH ============
function dist(a,b,c,d){
  const R=6371000,dL=(c-a)*Math.PI/180,dO=(d-b)*Math.PI/180;
  const x=Math.sin(dL/2)**2+Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(dO/2)**2;
  return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
}
function brng(a,b,c,d){
  const dO=(d-b)*Math.PI/180;
  const y=Math.sin(dO)*Math.cos(c*Math.PI/180);
  const x=Math.cos(a*Math.PI/180)*Math.sin(c*Math.PI/180)-Math.sin(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.cos(dO);
  return(Math.atan2(y,x)*180/Math.PI+360)%360;
}
function fmtDist(m){return m>=1000?(m/1000).toFixed(1)+' km':Math.round(m)+' m';}
function fmtTime(s){
  const totalMin=Math.round(s/60);
  if(totalMin<60)return totalMin+' dk';
  const h=Math.floor(totalMin/60);
  const m=totalMin%60;
  return m>0?h+' sa '+m+' dk':h+' sa';
}
function arrTime(s){const d=new Date(Date.now()+s*1000);return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0');}
function calcDur(distM,profile){
  const spd={car:55,bike:14,foot:4.5,truck:45,motorcycle:55};
  return distM/((spd[profile]||55)*1000/3600);
}

// ============ SVG - Google Maps tarzı üstten bakış avatarlar ============
// ============ AVATARLAR - sadece üçgen ve nokta ============
const AVATARS = {
  // Radarbot tarzı üçgen - navigasyon oku
  triangle:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
    <defs>
      <linearGradient id="av_tri" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#4fc3f7"/>
        <stop offset="100%" stop-color="#0277bd"/>
      </linearGradient>
      <filter id="av_sh"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.5)"/></filter>
    </defs>
    <ellipse cx="24" cy="38" rx="13" ry="7" fill="rgba(0,0,0,0.25)"/>
    <polygon points="24,4 42,44 24,34 6,44" fill="url(#av_tri)" filter="url(#av_sh)"/>
    <polygon points="24,4 15,24 24,20" fill="#81d4fa" opacity=".55"/>
    <polygon points="24,4 33,24 24,20" fill="#01579b" opacity=".3"/>
    <circle cx="24" cy="28" r="5" fill="#fff" opacity=".95"/>
    <circle cx="24" cy="28" r="2.5" fill="#0277bd"/>
    <circle cx="24" cy="28" r="1" fill="#fff"/>
  </svg>`,

  // Nokta - basit GPS noktası
  dot:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
    <defs>
      <filter id="dot_sh"><feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="rgba(0,0,0,0.4)"/></filter>
    </defs>
    <circle cx="24" cy="24" r="18" fill="rgba(79,195,247,0.2)"/>
    <circle cx="24" cy="24" r="12" fill="#4fc3f7" filter="url(#dot_sh)"/>
    <circle cx="24" cy="24" r="7" fill="#fff"/>
    <circle cx="24" cy="24" r="4" fill="#0277bd"/>
    <circle cx="24" cy="24" r="1.5" fill="#fff"/>
  </svg>`
};

function vehicleSVG(type){
  return AVATARS[type]||AVATARS.triangle;
}

// ============ MARKER SVGs ============
function radarSVG(){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44" height="44"><circle cx="22" cy="22" r="20" fill="rgba(229,57,53,0.18)" stroke="#e53935" stroke-width="1.5"/><rect x="7" y="13" width="30" height="19" rx="4" fill="#e53935"/><rect x="9" y="15" width="26" height="15" rx="3" fill="#c62828"/><circle cx="22" cy="22" r="6.5" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="22" cy="22" r="2.5" fill="#fff"/><rect x="20" y="3" width="4" height="10" rx="1.5" fill="#e53935"/><rect x="17" y="3" width="10" height="4" rx="1" fill="#c62828"/><line x1="10" y1="15" x2="14" y2="19" stroke="#fff" stroke-width="1.5" opacity=".6"/><line x1="34" y1="15" x2="30" y2="19" stroke="#fff" stroke-width="1.5" opacity=".6"/></svg>`;}
function mobileSVG(){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44" height="44"><circle cx="22" cy="22" r="20" fill="rgba(255,111,0,0.18)" stroke="#ff6f00" stroke-width="1.5"/><line x1="22" y1="40" x2="14" y2="28" stroke="#ff6f00" stroke-width="2.5" stroke-linecap="round"/><line x1="22" y1="40" x2="22" y2="28" stroke="#ff6f00" stroke-width="2.5" stroke-linecap="round"/><line x1="22" y1="40" x2="30" y2="28" stroke="#ff6f00" stroke-width="2.5" stroke-linecap="round"/><rect x="11" y="14" width="22" height="15" rx="3" fill="#ff6f00"/><rect x="13" y="16" width="18" height="11" rx="2" fill="#e65100"/><circle cx="22" cy="21" r="5" fill="none" stroke="#fff" stroke-width="2"/><circle cx="22" cy="21" r="2" fill="#fff"/></svg>`;}
function policeSVG(){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44" height="44"><circle cx="22" cy="22" r="20" fill="rgba(21,101,192,0.18)" stroke="#1565c0" stroke-width="1.5"/><polygon points="22,4 37,13 37,31 22,40 7,31 7,13" fill="#1565c0"/><polygon points="22,4 37,13 37,31 22,40 7,31 7,13" fill="none" stroke="#fff" stroke-width="1.5"/><text x="22" y="27" text-anchor="middle" font-size="17" font-weight="bold" fill="#fff" font-family="Arial,sans-serif">P</text></svg>`;}
function homeSVG(){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 46" width="38" height="46"><path d="M19 2C11 2 4 9 4 17c0 12 15 27 15 27s15-15 15-27C34 9 27 2 19 2z" fill="#43a047" stroke="#fff" stroke-width="1.5"/><polygon points="19,8 28,17 24,17 24,26 14,26 14,17 10,17" fill="#fff"/></svg>`;}
function carPinSVG(){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 46" width="38" height="46"><path d="M19 2C11 2 4 9 4 17c0 12 15 27 15 27s15-15 15-27C34 9 27 2 19 2z" fill="#1a73e8" stroke="#fff" stroke-width="1.5"/><path d="M11 20h16v-3l-2-5H13l-2 5v3z" fill="#fff"/><circle cx="14" cy="21" r="2" fill="#1a73e8"/><circle cx="24" cy="21" r="2" fill="#1a73e8"/></svg>`;}
function pinSVG(c){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 38" width="30" height="38"><path d="M15 1C8 1 2 7 2 14c0 9 13 23 13 23s13-14 13-23C28 7 22 1 15 1z" fill="${c||'#ff9800'}" stroke="#fff" stroke-width="1.5"/><circle cx="15" cy="14" r="5.5" fill="#fff"/></svg>`;}
function destSVG(){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 54" width="42" height="54"><path d="M21 2C11 2 3 10 3 20c0 14 18 32 18 32s18-18 18-32C39 10 31 2 21 2z" fill="#e53935" stroke="#fff" stroke-width="2"/><circle cx="21" cy="20" r="9" fill="#fff"/><circle cx="21" cy="20" r="4.5" fill="#e53935"/></svg>`;}

// ============ ARROW SVG ============
function arrowSVG(m,t,size){
  const w=size==='small'?24:44;
  const h=size==='small'?24:44;
  const c=w/2;
  if(t==='roundabout'||t==='rotary'){
    return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="${w}" height="${h}"><circle cx="22" cy="22" r="18" fill="rgba(79,195,247,0.15)" stroke="#4fc3f7" stroke-width="2.5"/><path d="M22 4 A18 18 0 0 1 40 22" fill="none" stroke="#4fc3f7" stroke-width="2.5" stroke-linecap="round"/><polygon points="40,17 44,24 34,24" fill="#4fc3f7"/><circle cx="22" cy="22" r="6" fill="#4fc3f7" opacity=".3"/></svg>`;
  }
  if(t==='arrive'){
    return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="${w}" height="${h}"><path d="M22 4C13 4 6 11 6 20c0 11 16 22 16 22s16-11 16-22C38 11 31 4 22 4z" fill="#e53935"/><circle cx="22" cy="20" r="7" fill="#fff"/><circle cx="22" cy="20" r="3" fill="#e53935"/></svg>`;
  }
  const angles={straight:0,right:90,left:-90,uturn:180,'slight right':40,'slight left':-40,'sharp right':130,'sharp left':-130};
  const deg=angles[m]!==undefined?angles[m]:0;
  const col=m==='uturn'?'#ff5722':m&&m.includes('right')?'#4fc3f7':m&&m.includes('left')?'#4fc3f7':'#4fc3f7';
  return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="${w}" height="${h}" style="transform:rotate(${deg}deg)"><circle cx="22" cy="22" r="20" fill="${col}" opacity=".12"/><polygon points="22,4 34,36 22,28 10,36" fill="${col}"/><polygon points="22,4 28,20 22,16" fill="#fff" opacity=".5"/></svg>`;
}

// ============ TRANSLATE STEP ============
function translateStep(step){
  if(!step)return'Devam edin';
  const t=(step.maneuver&&step.maneuver.type)||'';
  const m=(step.maneuver&&step.maneuver.modifier)||'';
  const ex=step.maneuver&&step.maneuver.exit;
  if(t==='depart')return'Rota başladı';
  if(t==='arrive')return'Hedefinize ulaştınız';
  if(t==='turn'||t==='new name'||t==='continue'){
    if(m==='right')return'Sağa dönün';
    if(m==='left')return'Sola dönün';
    if(m==='slight right')return'Hafif sağa';
    if(m==='slight left')return'Hafif sola';
    if(m==='sharp right')return'Sert sağa';
    if(m==='sharp left')return'Sert sola';
    if(m==='uturn')return'Geri dönün';
    return'Düz devam edin';
  }
  if(t==='roundabout'||t==='rotary'){
    if(ex)return`Döner kavşağa girin · ${ex}. çıkış`;
    return'Döner kavşağa girin';
  }
  if(t==='exit roundabout'||t==='exit rotary')return'Döner kavşaktan çıkın';
  if(t==='on ramp'){if(m.includes('right'))return'Sağdan otoyola girin';if(m.includes('left'))return'Soldan otoyola girin';return'Otoyola girin';}
  if(t==='off ramp'){if(m.includes('right'))return'Sağdan çıkın';if(m.includes('left'))return'Soldan çıkın';return'Otoyoldan çıkın';}
  if(t==='fork'){if(m.includes('right'))return'Çatalda sağa';if(m.includes('left'))return'Çatalda sola';return'Çatalda devam';}
  if(t==='merge'){if(m.includes('right'))return'Sağdan birleşin';if(m.includes('left'))return'Soldan birleşin';return'Birleşin';}
  if(t==='end of road'){if(m==='right')return'Yol sonunda sağa';if(m==='left')return'Yol sonunda sola';return'Yol sonunda dönün';}
  if(t==='use lane')return'Şeridi kullanın';
  return'Devam edin';
}

function stepAudioKey(step){
  if(!step)return null;
  const t=(step.maneuver&&step.maneuver.type)||'';
  const m=(step.maneuver&&step.maneuver.modifier)||'';
  if(t==='arrive')return'hedefe_ulastiniz';
  if(t==='depart')return'rota_basladi';
  if(t==='roundabout'||t==='rotary')return'kavsaktan_cik';
  if(t==='exit roundabout'||t==='exit rotary')return'donelden_cik';
  if(t==='on ramp')return'otoyola_gir';
  if(t==='off ramp')return'otoyoldan_cik';
  if(m==='right')return'saga_don';
  if(m==='left')return'sola_don';
  if(m==='slight right')return'saga_hafif';
  if(m==='slight left')return'sola_hafif';
  if(m==='sharp right')return'saga_sert';
  if(m==='sharp left')return'sola_sert';
  if(m==='uturn')return'geri_don';
  if(m.includes('right'))return'saga_kal';
  if(m.includes('left'))return'sola_kal';
  return'duz_devam';
}

function distAudioKey(d,step){
  const t=(step&&step.maneuver&&step.maneuver.type)||'';
  const m=(step&&step.maneuver&&step.maneuver.modifier)||'';
  const isRound=t==='roundabout'||t==='rotary';
  let dir='duz';
  if(m==='right')dir='saga';else if(m==='left')dir='sola';
  else if(m==='slight right')dir='saga_hafif';else if(m==='slight left')dir='sola_hafif';
  else if(m==='sharp right')dir='saga_sert';else if(m==='sharp left')dir='sola_sert';
  else if(m==='uturn')dir='geri';
  if(isRound){
    if(d>=900)return'1km_kavsaktan_cik';
    if(d>=400)return'500m_kavsaktan_cik';
    return'200m_kavsaktan_cik';
  }
  if(d>=900){
    if(dir==='saga')return'1km_saga';if(dir==='sola')return'1km_sola';
    if(dir==='saga_hafif')return'1km_saga_hafif';if(dir==='sola_hafif')return'1km_sola_hafif';
    if(dir==='saga_sert')return'1km_saga_sert';if(dir==='sola_sert')return'1km_sola_sert';
    if(dir==='geri')return'1km_geri';return'1km_duz';
  }
  if(d>=400){
    if(dir==='saga')return'500m_saga';if(dir==='sola')return'500m_sola';
    if(dir==='saga_hafif')return'500m_saga_hafif';if(dir==='sola_hafif')return'500m_sola_hafif';
    if(dir==='saga_sert')return'500m_saga_sert';if(dir==='sola_sert')return'500m_sola_sert';
    return'500m_duz';
  }
  if(d>=150){
    if(dir==='saga')return'200m_saga';if(dir==='sola')return'200m_sola';
    if(dir==='saga_hafif')return'200m_saga_hafif';if(dir==='sola_hafif')return'200m_sola_hafif';
    if(dir==='saga_sert')return'200m_saga_sert';if(dir==='sola_sert')return'200m_sola_sert';
    if(dir==='geri')return'200m_geri';return'200m_duz';
  }
  if(dir==='saga')return'50m_saga';if(dir==='sola')return'50m_sola';
  if(dir==='saga_hafif')return'50m_saga_hafif';if(dir==='sola_hafif')return'50m_sola_hafif';
  if(dir==='saga_sert')return'50m_saga_sert';if(dir==='sola_sert')return'50m_sola_sert';
  if(dir==='geri')return'50m_geri';return'duz_devam';
}

// ============ MAP INIT ============
function initMap(){
  const hour=new Date().getHours();
  const style=hour>=20||hour<7?'https://tiles.openfreemap.org/styles/dark':'https://tiles.openfreemap.org/styles/liberty';
  try{
    map=new maplibregl.Map({
      container:'map',
      style,
      center:[32.8,39.9],
      zoom:6,
      pitch:0,
      bearing:0,
      attributionControl:false,
      maxTileCacheSize:150,
      fadeDuration:0,
      renderWorldCopies:false,
      antialias:true,
      refreshExpiredTiles:false
    });
  }catch(e){
    // Style yüklenemezse fallback
    map=new maplibregl.Map({
      container:'map',
      style:{version:8,sources:{},layers:[{id:'bg',type:'background',paint:{'background-color':'#1a1a2e'}}]},
      center:[32.8,39.9],zoom:6,attributionControl:false
    });
  }

  map.addControl(new maplibregl.AttributionControl({compact:true,customAttribution:''}),'bottom-right');

  map.on('load',()=>{
    add3D();
    setTimeout(()=>{
      addRadarMarkers();
      addMobileMarkers();
      addPoliceMarkers();
      loadSavedMarkers();
    },800);
    startSpeedometer();
  });

  map.on('error',e=>{console.warn('Map error:',e.error);});
  map.on('rotate',updateCompass);
  map.on('pitch',updateCompass);

  // Long press
  map.on('mousedown',e=>{longTimer=setTimeout(()=>showLongPress(e.lngLat.lat,e.lngLat.lng),700);});
  map.on('mouseup',()=>clearTimeout(longTimer));
  map.on('mousemove',()=>clearTimeout(longTimer));
  map.on('touchstart',e=>{if(e.points&&e.points.length===1){longTimer=setTimeout(()=>showLongPress(e.lngLat.lat,e.lngLat.lng),700);}});
  map.on('touchend',()=>clearTimeout(longTimer));
  map.on('touchmove',()=>clearTimeout(longTimer));

  // Splash 2.5 saniye sonra kaldır
  setTimeout(()=>{const s=document.getElementById('splash');if(s){s.style.opacity='0';setTimeout(()=>s.style.display='none',600);}},2500);
}

function add3D(){
  try{
    const layers=map.getStyle().layers;
    let labelId;
    for(const l of layers){if(l.type==='symbol'&&l.layout&&l.layout['text-field']){labelId=l.id;break;}}
    if(map.getLayer('3d-buildings'))return;
    const srcNames=['openmaptiles','composite','osm'];
    let src=null;
    for(const s of srcNames){if(map.getSource(s)){src=s;break;}}
    if(!src)return;
    map.addLayer({
      id:'3d-buildings',source:src,'source-layer':'building',
      type:'fill-extrusion',minzoom:14,
      paint:{
        'fill-extrusion-color':['case',
          ['has','building:colour'],['get','building:colour'],
          ['==',['get','building'],'yes'],'#d4cfc8','#ccc5bc'
        ],
        'fill-extrusion-height':['coalesce',['get','height'],['get','render_height'],8],
        'fill-extrusion-base':['coalesce',['get','min_height'],['get','render_min_height'],0],
        'fill-extrusion-opacity':0.82
      }
    },labelId);
  }catch(e){}
}

function toggle3DBuildings(on){
  if(map.getLayer('3d-buildings')){
    map.setLayoutProperty('3d-buildings','visibility',on?'visible':'none');
  }else if(on){
    // Katman yoksa ekle
    add3D();
  }
}

function changeBasemap(v){
  const styles={
    '3d':'https://tiles.openfreemap.org/styles/liberty',
    'osm':'https://tiles.openfreemap.org/styles/liberty',
    'dark':'https://tiles.openfreemap.org/styles/dark',
    'topo':'https://tiles.openfreemap.org/styles/positron'
  };
  if(v==='satellite'){
    map.setStyle({version:8,sources:{sat:{type:'raster',tiles:['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],tileSize:256,attribution:'© Esri'}},layers:[{id:'sat',type:'raster',source:'sat'}]});
  }else{
    map.setStyle(styles[v]||styles.osm);
  }
  map.once('styledata',()=>{
    add3D();
    if(altRoutes.length)setTimeout(()=>drawRouteLines(altRoutes,selRoute),400);
  });
}

function toggleNightMode(on){
  if(on){const h=new Date().getHours();changeBasemap(h>=20||h<7?'dark':'osm');}
  else changeBasemap('osm');
}

// ============ KAMERA MODLARI ============
function setCameraMode(mode){
  cameraMode=mode;
  document.querySelectorAll('.cam-btn').forEach(b=>b.classList.remove('active'));
  const btn=document.querySelector(`.cam-btn[data-mode="${mode}"]`);
  if(btn)btn.classList.add('active');
  applyCameraMode();
}

// Kamera son güncelleme zamanı - throttle için
let lastCamUpdate=0;

function applyCameraMode(){
  if(!userLat)return;
  const now=Date.now();
  // GPS güncellemesi çok sık gelirse kamerayı her seferinde hareket ettirme
  // Navigasyon modunda 250ms, normal modda 500ms throttle
  const throttle=navActive?250:500;
  if(now-lastCamUpdate<throttle)return;
  lastCamUpdate=now;

  const center=[userLon,userLat];
  // Navigasyonda çok kısa duration - gerçek zamanlı hissi
  const dur=navActive?200:600;
  const opts={center,duration:dur,easing:t=>t};  // linear easing = daha doğal

  switch(cameraMode){
    case'follow': opts.pitch=60;opts.bearing=userBearing;opts.zoom=18;break;
    case'top':    opts.pitch=0;opts.bearing=0;opts.zoom=17;break;
    case'front':  opts.pitch=70;opts.bearing=(userBearing+180)%360;opts.zoom=18;break;
    case'back':   opts.pitch=60;opts.bearing=userBearing;opts.zoom=18;break;
    case'left':   opts.pitch=55;opts.bearing=(userBearing+90)%360;opts.zoom=17;break;
    case'right':  opts.pitch=55;opts.bearing=(userBearing-90+360)%360;opts.zoom=17;break;
  }
  map.easeTo(opts);
}

// ============ GPS ============
function startGPS(){
  if(!navigator.geolocation){
    showToast('Bu cihaz GPS desteklemiyor');
    return;
  }
  // Önce izin durumunu kontrol et
  if(navigator.permissions){
    navigator.permissions.query({name:'geolocation'}).then(result=>{
      if(result.state==='denied'){
        showToast('Konum izni reddedildi. Tarayıcı ayarlarından izin verin.');
        return;
      }
      _startWatch();
    }).catch(()=>_startWatch());
  }else{
    _startWatch();
  }
}

function _startWatch(){
  // İlk konum için hemen sor (izin dialogu açılır)
  navigator.geolocation.getCurrentPosition(
    onPos,
    onPosErr,
    {enableHighAccuracy:true,timeout:15000,maximumAge:0}
  );
  // Sonra sürekli takip
  watchId=navigator.geolocation.watchPosition(
    onPos,
    onPosErr,
    {enableHighAccuracy:true,maximumAge:500,timeout:10000}
  );
}

function onPosErr(e){
  if(!gpsLost){
    gpsLost=true;
    playAudio('gps_zayif');
    showToast('GPS sinyali kayboldu');
    // 3 saniye sonra tekrar dene
    gpsLostTimer=setTimeout(()=>{
      if(gpsLost){
        navigator.geolocation.getCurrentPosition(onPos,()=>{},
          {enableHighAccuracy:true,timeout:8000});
      }
    },3000);
  }
}

// GPS smoothing - ani sıçramaları önler
let smoothLat=null, smoothLon=null, smoothBearing=0;
const SMOOTH=0.25; // 0=hiç smooth, 1=tam smooth

function smoothPos(lat,lon,hdg){
  if(smoothLat===null){smoothLat=lat;smoothLon=lon;smoothBearing=hdg||0;return{lat,lon,bearing:hdg||0};}
  // Exponential moving average
  smoothLat=smoothLat+(lat-smoothLat)*SMOOTH;
  smoothLon=smoothLon+(lon-smoothLon)*SMOOTH;
  // Bearing smoothing - açı wrap-around dikkat
  let db=((hdg||0)-smoothBearing+540)%360-180;
  smoothBearing=(smoothBearing+db*SMOOTH+360)%360;
  return{lat:smoothLat,lon:smoothLon,bearing:smoothBearing};
}

function onPos(pos){
  const wasLost=gpsLost;
  gpsLost=false;
  clearTimeout(gpsLostTimer);
  if(wasLost){
    clearAudioQueue();
    setTimeout(()=>playAudio('gps_geldi'),300);
    showToast('GPS sinyali geri geldi');
  }
  const rawLat=pos.coords.latitude;
  const rawLon=pos.coords.longitude;
  const spd=(pos.coords.speed||0)*3.6;
  const hdg=pos.coords.heading;

  // Ham bearing hesapla
  let rawBearing=userBearing;
  if(userLat!==null){
    rawBearing=(hdg!==null&&hdg!==undefined&&!isNaN(hdg)&&hdg>=0)?hdg:brng(userLat,userLon,rawLat,rawLon);
  }

  // Smooth uygula
  const s=smoothPos(rawLat,rawLon,rawBearing);
  userLat=s.lat; userLon=s.lon; userBearing=s.bearing; userSpeed=spd;

  updateUserMarker();
  updateSpeedometer(spd);
  if(driveMode)applyCameraMode();
  if(navActive)checkNav(userLat,userLon);
  checkRadarProx(userLat,userLon);
  checkPoliceProx(userLat,userLon);
  checkMobileProx(userLat,userLon);
}

function centerOnUser(){
  if(userLat===null){startGPS();showToast('Konum alınıyor...');return;}
  map.flyTo({center:[userLon,userLat],zoom:16,pitch:0,bearing:0,duration:700});
}

function updateUserMarker(){
  if(userLat===null)return;
  if(!userMarker){
    const el=document.createElement('div');
    el.innerHTML=vehicleSVG(vehicleAvatar);
    // CSS transition ile pürüzsüz hareket
    el.style.cssText='transform-origin:center center;cursor:pointer;will-change:transform;transition:transform 0.15s linear;';
    userMarker=new maplibregl.Marker({element:el,anchor:'center',pitchAlignment:'map',rotationAlignment:'map'})
      .setLngLat([userLon,userLat]).addTo(map);
  }else{
    // requestAnimationFrame ile smooth güncelleme
    requestAnimationFrame(()=>{
      userMarker.setLngLat([userLon,userLat]);
      userMarker.setRotation(userBearing);
    });
  }
}

function selectAvatar(el){
  document.querySelectorAll('.av').forEach(e=>e.classList.remove('selected'));
  el.classList.add('selected');
  vehicleAvatar=el.dataset.v;
  if(userMarker){
    userMarker.getElement().innerHTML=vehicleSVG(vehicleAvatar);
    userMarker.setRotation(userBearing);
  }
}

function setAvatarMode(mode){
  avatarMode=mode;
  document.querySelectorAll('.av-mode-btn').forEach(b=>b.classList.remove('active'));
  const btn=document.querySelector(`.av-mode-btn[data-mode="${mode}"]`);
  if(btn)btn.classList.add('active');
  if(userMarker){
    userMarker.getElement().innerHTML=vehicleSVG(vehicleAvatar);
    userMarker.setRotation(userBearing);
  }
  // Avatar grid'i güncelle
  document.querySelectorAll('.av').forEach(el=>{
    const v=el.dataset.v;
    const svg=mode==='3d'?(AVATAR_3D[v]||AVATAR_3D.car):(AVATAR_2D[v]||AVATAR_2D.car);
    el.innerHTML=svg;
  });
}

function toggleTilt(){
  tiltOn=!tiltOn;
  document.getElementById('fab-tilt').classList.toggle('active',tiltOn);
  map.easeTo({pitch:tiltOn?60:0,duration:400});
}

function updateCompass(){
  const b=map.getBearing();
  const n=document.getElementById('compass-needle-n');
  const s=document.getElementById('compass-needle-s');
  if(n)n.setAttribute('transform',`rotate(${-b},18,18)`);
  if(s)s.setAttribute('transform',`rotate(${-b},18,18)`);
}

function resetBearing(){map.easeTo({bearing:0,pitch:0,duration:500});}

// ============ API HELPERS - proxy üzerinden ============
async function overpassQuery(q){
  // Önce kendi proxy'imizi dene, hata olursa direkt dene
  try{
    const r=await fetch('/api/overpass',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({query:q})
    });
    if(!r.ok)throw new Error('proxy '+r.status);
    return await r.json();
  }catch(e){
    // Fallback: direkt Overpass
    const r2=await fetch('https://overpass-api.de/api/interpreter',{
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:'data='+encodeURIComponent(q)
    });
    return await r2.json();
  }
}

async function nominatimSearch(q){
  try{
    const r=await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    if(!r.ok)throw new Error('proxy '+r.status);
    return await r.json();
  }catch(e){
    const r2=await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&countrycodes=tr&limit=6&addressdetails=1`,{headers:{'Accept-Language':'tr'}});
    return await r2.json();
  }
}
async function searchPlace(){
  const q=document.getElementById('search-input').value.trim();
  if(!q)return;
  const el=document.getElementById('search-results');
  el.innerHTML='<div class="sr-item" style="color:#888">Aranıyor...</div>';
  el.style.display='block';
  try{
    const data=await nominatimSearch(q);
    if(!data.length){el.innerHTML='<div class="sr-item">Sonuç bulunamadı</div>';return;}
    el.innerHTML=data.map(d=>`<div class="sr-item" onclick="pickSearch(${d.lat},${d.lon},'${(d.display_name||'').replace(/'/g,"\\'").substring(0,80)}')">
      <div style="font-weight:600;font-size:13px;color:#222">${(d.display_name||'').split(',')[0]}</div>
      <div style="font-size:11px;color:#888">${(d.display_name||'').split(',').slice(1,3).join(',')}</div>
    </div>`).join('');
  }catch(e){el.innerHTML='<div class="sr-item" style="color:#f44">Arama başarısız</div>';}
}

function pickSearch(lat,lon,name){
  document.getElementById('search-results').style.display='none';
  document.getElementById('search-input').value=name.split(',')[0];
  map.flyTo({center:[parseFloat(lon),parseFloat(lat)],zoom:15,duration:800});
  openRouteModal(parseFloat(lat),parseFloat(lon),name);
}

// ============ ROUTE MODAL ============
function openRouteModal(lat,lon,name){
  destCoords={lat,lon};
  document.getElementById('rm-dest-name').textContent=(name||'Hedef').split(',')[0];
  document.getElementById('route-modal').classList.remove('hidden');
  fetchAltRoutes();
}
function closeRouteModal(){document.getElementById('route-modal').classList.add('hidden');}

function selectTransport(btn){
  document.querySelectorAll('.tm-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');selTransport=btn.dataset.mode;fetchAltRoutes();
}
function selectPref(el){
  document.querySelectorAll('.rm-pref').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');selPref=el.dataset.pref;fetchAltRoutes();
}

async function fetchAltRoutes(){
  if(!userLat||!destCoords)return;
  const profileMap={driving:'car',cycling:'bike',foot:'foot','driving-hgv':'truck',motorcycle:'car'};
  const osrmP=selTransport==='cycling'?'bike':selTransport==='foot'?'foot':'car';
  const speedP=profileMap[selTransport]||'car';
  const url=`https://router.project-osrm.org/route/v1/${osrmP}/${userLon},${userLat};${destCoords.lon},${destCoords.lat}?alternatives=3&steps=true&geometries=geojson&overview=full`;
  try{
    const r=await fetch(url);const data=await r.json();
    if(!data.routes||!data.routes.length)return;
    altRoutes=data.routes.map(rt=>({...rt,duration:calcDur(rt.distance,speedP)}));
    selRoute=0;
    renderAltRoutes();
    previewRoute(0);
  }catch(e){showToast('Rota hesaplanamadı');}
}

function renderAltRoutes(){
  altRoutes.forEach((r,i)=>{
    const el=document.getElementById('alt-'+i);if(!el)return;
    el.style.display='flex';el.classList.remove('loading');
    el.querySelector('.alt-name').textContent=i===0?'En Hızlı':'Alternatif '+(i+1);
    el.querySelector('.alt-meta').textContent=fmtDist(r.distance)+' · '+fmtTime(r.duration);
    if(i===selRoute)el.classList.add('selected');else el.classList.remove('selected');
  });
}

function previewRoute(idx){
  selRoute=idx;
  document.querySelectorAll('.rm-alt-item').forEach(e=>e.classList.remove('selected'));
  const el=document.getElementById('alt-'+idx);if(el)el.classList.add('selected');
  if(altRoutes[idx])drawRouteLines(altRoutes,idx);
}
function selectAltRoute(idx){previewRoute(idx);}

function startSelectedRoute(){
  if(!altRoutes[selRoute])return;
  closeRouteModal();
  beginNavigation(altRoutes[selRoute]);
}

// ============ ROUTE DRAWING ============
function drawRouteLines(routes,selIdx){
  for(let i=0;i<4;i++){
    if(map.getLayer('route-'+i))map.removeLayer('route-'+i);
    if(map.getSource('route-'+i))map.removeSource('route-'+i);
  }
  if(!routes||!routes.length)return;
  routes.forEach((r,i)=>{
    map.addSource('route-'+i,{type:'geojson',data:{type:'Feature',geometry:r.geometry}});
    // Seçili rota için gölge efekti
    if(i===selIdx){
      map.addLayer({id:'route-shadow-'+i,type:'line',source:'route-'+i,
        layout:{'line-join':'round','line-cap':'round'},
        paint:{'line-color':'#000','line-width':10,'line-opacity':0.15,'line-blur':3}
      });
    }
    map.addLayer({id:'route-'+i,type:'line',source:'route-'+i,
      layout:{'line-join':'round','line-cap':'round'},
      paint:{'line-color':i===selIdx?'#1a73e8':'#9e9e9e','line-width':i===selIdx?7:3,'line-opacity':i===selIdx?1:0.55}
    });
  });
  if(destMarker)destMarker.remove();
  const coords=routes[selIdx].geometry.coordinates;
  const last=coords[coords.length-1];
  const el=document.createElement('div');el.innerHTML=destSVG();
  destMarker=new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat(last).addTo(map);
  const bounds=coords.reduce((b,c)=>b.extend(c),new maplibregl.LngLatBounds(coords[0],coords[0]));
  map.fitBounds(bounds,{padding:{top:80,bottom:120,left:60,right:80},duration:600});
}

// ============ NAVIGATION ============
function beginNavigation(route){
  routeSteps=route.legs[0].steps;
  stepIdx=0;navActive=true;driveMode=true;
  document.getElementById('nav-bar').classList.remove('hidden');
  document.getElementById('route-bar').classList.remove('hidden');
  updateNavBar();
  updateRouteBar(route);
  clearAudioQueue();
  playAudio('rota_basladi');
  cameraMode='follow';
  if(userLat)map.easeTo({center:[userLon,userLat],pitch:60,bearing:userBearing,zoom:18,duration:800});
}

function updateNavBar(){
  if(!routeSteps||stepIdx>=routeSteps.length)return;
  const step=routeSteps[stepIdx];
  const next=routeSteps[stepIdx+1];
  const m=(step.maneuver&&step.maneuver.modifier)||'straight';
  const t=(step.maneuver&&step.maneuver.type)||'';

  document.getElementById('nav-icon-wrap').innerHTML=arrowSVG(m,t);
  document.getElementById('nav-instr').textContent=translateStep(step);
  document.getElementById('nav-dist').textContent=fmtDist(step.distance);

  // Cadde adı
  const streetEl=document.getElementById('nav-street');
  if(streetEl)streetEl.textContent=(step.name&&step.name!=='')?step.name:'';

  // Adres (reverse geocode - sadece navigasyon başında ve her 30 saniyede bir)
  updateCurrentAddress();

  // Sonraki manevra göster
  const nextBox=document.getElementById('nav-next-box');
  if(next&&nextBox){
    const nm=(next.maneuver&&next.maneuver.modifier)||'straight';
    const nt=(next.maneuver&&next.maneuver.type)||'';
    document.getElementById('nav-next-icon').innerHTML=arrowSVG(nm,nt,'small');
    document.getElementById('nav-next-text').textContent=translateStep(next);
    document.getElementById('nav-next-dist').textContent=fmtDist(step.distance);
    nextBox.classList.remove('hidden');
  }else if(nextBox){
    nextBox.classList.add('hidden');
  }
}

// Adres güncelleme - reverse geocode
let lastAddrUpdate=0;
let manualAddress=null; // kullanıcı elle girdiyse

async function updateCurrentAddress(){
  if(!userLat)return;
  if(manualAddress)return; // elle girilmişse otomatik güncelleme
  const now=Date.now();
  if(now-lastAddrUpdate<20000)return;
  lastAddrUpdate=now;
  try{
    const r=await fetch(`/api/reverse?lat=${userLat}&lon=${userLon}`);
    if(!r.ok)return;
    const d=await r.json();
    const addr=d.address||{};
    const parts=[];
    const road=addr.road||addr.pedestrian||addr.footway||addr.path||addr.street;
    if(road)parts.push(road);
    if(addr.house_number)parts[parts.length-1]=(parts[parts.length-1]||'')+' No:'+addr.house_number;
    const mahalle=addr.suburb||addr.neighbourhood||addr.quarter||addr.village||addr.town;
    if(mahalle)parts.push(mahalle);
    const el=document.getElementById('nav-address');
    if(el&&parts.length)el.textContent=parts.join(', ');
  }catch(e){}
}

function editAddress(){
  const el=document.getElementById('nav-address');
  if(!el)return;
  const cur=el.textContent;
  const input=document.createElement('input');
  input.type='text';
  input.value=cur==='--'?'':cur;
  input.placeholder='Mahalle, Cadde, No...';
  input.style.cssText='width:100%;background:rgba(255,255,255,0.1);border:1px solid #4fc3f7;border-radius:6px;padding:4px 8px;color:#fff;font-size:10px;outline:none;';
  el.innerHTML='';
  el.appendChild(input);
  input.focus();
  input.select();
  const save=()=>{
    const val=input.value.trim();
    manualAddress=val||null;
    el.textContent=val||'--';
  };
  input.addEventListener('blur',save);
  input.addEventListener('keydown',e=>{if(e.key==='Enter')input.blur();if(e.key==='Escape'){manualAddress=null;el.textContent=cur;input.blur();}});
}

function updateRouteBar(route){
  const r=route||altRoutes[selRoute];if(!r)return;
  const totalMin=Math.round(r.duration/60);
  const rbTime=document.getElementById('rb-time');
  const rbUnit=document.getElementById('rb-unit');
  if(totalMin<60){
    if(rbTime)rbTime.textContent=totalMin;
    if(rbUnit)rbUnit.textContent='dk';
  }else{
    const h=Math.floor(totalMin/60),m=totalMin%60;
    if(rbTime)rbTime.textContent=h+(m>0?':'+String(m).padStart(2,'0'):'');
    if(rbUnit)rbUnit.textContent='sa';
  }
  document.getElementById('rb-dist').textContent=fmtDist(r.distance);
  document.getElementById('rb-arr').textContent='Varış: '+arrTime(r.duration);
}

function cancelRoute(){
  navActive=false;driveMode=false;routeSteps=[];stepIdx=0;
  altRoutes=[];destCoords=null;
  for(let i=0;i<4;i++){
    if(map.getLayer('route-shadow-'+i))map.removeLayer('route-shadow-'+i);
    if(map.getLayer('route-'+i))map.removeLayer('route-'+i);
    if(map.getSource('route-'+i))map.removeSource('route-'+i);
  }
  if(destMarker){destMarker.remove();destMarker=null;}
  document.getElementById('nav-bar').classList.add('hidden');
  document.getElementById('route-bar').classList.add('hidden');
  document.getElementById('route-modal').classList.add('hidden');
  map.easeTo({pitch:0,bearing:0,zoom:15,duration:600});
  stopAudio();
  playAudio('rota_iptal');
}

function checkNav(lat,lon){
  if(!routeSteps||stepIdx>=routeSteps.length)return;
  const step=routeSteps[stepIdx];
  const coords=step.geometry.coordinates;
  const end=coords[coords.length-1];
  const d=dist(lat,lon,end[1],end[0]);
  const next=routeSteps[stepIdx+1];
  const nt=(next&&next.maneuver&&next.maneuver.type)||'';
  const isRound=nt==='roundabout'||nt==='rotary';

  if(d<1150&&d>900&&!step._1km){
    step._1km=true;
    if(next)playAudio(isRound?'1km_kavsaktan_cik':distAudioKey(1000,next));
  }
  if(d<600&&d>400&&!step._500m){
    step._500m=true;
    if(next)playAudio(isRound?'500m_kavsaktan_cik':distAudioKey(500,next));
  }
  if(d<250&&d>150&&!step._200m){
    step._200m=true;
    if(next)playAudio(isRound?'200m_kavsaktan_cik':distAudioKey(200,next));
  }
  if(d<130&&d>70&&!step._100m){step._100m=true;if(next)playAudio(distAudioKey(100,next));}
  if(d<70&&!step._50m){step._50m=true;if(next)playAudio(distAudioKey(50,next));}

  if(d<25){
    stepIdx++;
    if(stepIdx>=routeSteps.length){
      navActive=false;driveMode=false;
      clearAudioQueue();
      playAudio('hedefe_ulastiniz');
      document.getElementById('nav-bar').classList.add('hidden');
      document.getElementById('route-bar').classList.add('hidden');
      showToast('Hedefinize ulaştınız!');
      map.easeTo({pitch:0,bearing:0,duration:600});
      return;
    }
    updateNavBar();
    clearAudioQueue();
    playAudio(stepAudioKey(routeSteps[stepIdx]));
  }else{
    document.getElementById('nav-dist').textContent=fmtDist(d);
  }

  // Rotadan sapma
  if(!recalcCooldown&&altRoutes[selRoute]){
    const allC=altRoutes[selRoute].geometry.coordinates;
    let minD=Infinity;
    for(const c of allC){const dd=dist(lat,lon,c[1],c[0]);if(dd<minD)minD=dd;}
    if(minD>60){
      recalcCooldown=true;
      clearAudioQueue();
      playAudio('rota_yeniden');
      showToast('Rotadan sapıldı...');
      document.getElementById('reroute-toast').classList.remove('hidden');
      setTimeout(()=>{
        document.getElementById('reroute-toast').classList.add('hidden');
        if(destCoords)fetchAltRoutes().then(()=>{if(altRoutes[0])beginNavigation(altRoutes[0]);});
        recalcCooldown=false;
      },3000);
    }
  }
}

// ============ RADAR / POLICE ============
function addRadarMarkers(){
  SAMPLE_RADARS.forEach((r,i)=>{
    const el=document.createElement('div');el.innerHTML=radarSVG();el.style.cursor='pointer';
    const m=new maplibregl.Marker({element:el,anchor:'center'})
      .setLngLat([r.lon,r.lat])
      .setPopup(new maplibregl.Popup({offset:22}).setHTML(`<b>Sabit Radar</b><br>Limit: ${r.limit} km/h`))
      .addTo(map);
    radarMarkers.push(m);
  });
  fetchOSMRadars();
}

async function fetchOSMRadars(){
  // Tüm Türkiye tek sorguda çek - daha hızlı
  try{
    const q=`[out:json][timeout:60];(node["highway"="speed_camera"](36,26,42,45);node["enforcement"="maxspeed"](36,26,42,45);node["device"="speed_camera"](36,26,42,45);node["highway"="speed_camera:conditional"](36,26,42,45););out;`;
    const d=await overpassQuery(q);
    let added=0;
    (d.elements||[]).forEach(e=>{
      if(!e.lat||!e.lon)return;
      const isDup=radarMarkers.some(m=>{const ll=m.getLngLat();return Math.abs(ll.lat-e.lat)<0.001&&Math.abs(ll.lng-e.lon)<0.001;});
      if(isDup)return;
      const el2=document.createElement('div');el2.innerHTML=radarSVG();el2.style.cursor='pointer';
      const limit=(e.tags&&(e.tags.maxspeed||e.tags['maxspeed:advisory']||e.tags['maxspeed:forward']))||'?';
      const m=new maplibregl.Marker({element:el2,anchor:'center'})
        .setLngLat([e.lon,e.lat])
        .setPopup(new maplibregl.Popup({offset:22}).setHTML(`<b>Radar (OSM)</b><br>Limit: ${limit} km/h`))
        .addTo(map);
      radarMarkers.push(m);
      added++;
    });
    if(added>0)console.log(`OSM'den ${added} radar eklendi`);
  }catch(e){
    console.warn('OSM radar yüklenemedi, sadece örnek veriler gösteriliyor');
  }
}

function addMobileMarkers(){
  SAMPLE_MOBILE.forEach(r=>{
    const el=document.createElement('div');el.innerHTML=mobileSVG();el.style.cursor='pointer';
    const m=new maplibregl.Marker({element:el,anchor:'center'})
      .setLngLat([r.lon,r.lat])
      .setPopup(new maplibregl.Popup({offset:22}).setHTML('<b>Seyyar Radar</b>'))
      .addTo(map);
    mobileMarkers.push(m);
  });
}

function addPoliceMarkers(){
  SAMPLE_POLICE.forEach(p=>{
    const el=document.createElement('div');el.innerHTML=policeSVG();el.style.cursor='pointer';
    const m=new maplibregl.Marker({element:el,anchor:'center'})
      .setLngLat([p.lon,p.lat])
      .setPopup(new maplibregl.Popup({offset:22}).setHTML('<b>Polis Noktası</b>'))
      .addTo(map);
    policeMarkers.push(m);
  });
  fetchOSMPolice();
}

async function fetchOSMPolice(){
  const regions=[[36,26,39,32],[36,32,39,38],[36,38,39,45],[39,26,42,32],[39,32,42,38],[39,38,42,45]];
  for(const [s,w,n,e] of regions){
    try{
      const q=`[out:json][timeout:30];node["amenity"="police"](${s},${w},${n},${e});out;`;
      const d=await overpassQuery(q);
      (d.elements||[]).forEach(e=>{
        const isDup=policeMarkers.some(m=>{const ll=m.getLngLat();return Math.abs(ll.lat-e.lat)<0.0005&&Math.abs(ll.lng-e.lon)<0.0005;});
        if(isDup)return;
        const el2=document.createElement('div');el2.innerHTML=policeSVG();el2.style.cursor='pointer';
        const m=new maplibregl.Marker({element:el2,anchor:'center'})
          .setLngLat([e.lon,e.lat])
          .setPopup(new maplibregl.Popup({offset:22}).setHTML(`<b>Polis</b><br>${(e.tags&&e.tags.name)||''}`))
          .addTo(map);
        policeMarkers.push(m);
      });
    }catch(e){}
    await new Promise(res=>setTimeout(res,400));
  }
}

function toggleRadarLayer(on){radarMarkers.forEach(m=>m.getElement().style.display=on?'':'none');}
function toggleMobileRadarLayer(on){mobileMarkers.forEach(m=>m.getElement().style.display=on?'':'none');}
function togglePoliceLayer(on){policeMarkers.forEach(m=>m.getElement().style.display=on?'':'none');}

// ============ PROXIMITY ALERTS ============
function checkRadarProx(lat,lon){
  if(!settings.radar)return;
  SAMPLE_RADARS.forEach((r,i)=>{
    const d=dist(lat,lon,r.lat,r.lon);const k='r'+i;
    if(d<1150&&d>900&&!radarState[k+'_1']){radarState[k+'_1']=1;playAudio('radar_1km');showAlertBox('radar-alert','radar-dist-text',Math.round(d)+' m');}
    if(d<600&&d>400&&!radarState[k+'_5']){radarState[k+'_5']=1;playAudio('radar_500m');showAlertBox('radar-alert','radar-dist-text',Math.round(d)+' m');}
    if(d<250&&d>150&&!radarState[k+'_2']){radarState[k+'_2']=1;playAudio('radar_200m');showAlertBox('radar-alert','radar-dist-text',Math.round(d)+' m');}
    if(d<50&&!radarState[k+'_n']){radarState[k+'_n']=1;playAudio('radar_simdi');showAlertBox('radar-alert','radar-dist-text','Şimdi!');}
    if(d>1300){delete radarState[k+'_1'];delete radarState[k+'_5'];delete radarState[k+'_2'];delete radarState[k+'_n'];}
  });
}
function checkMobileProx(lat,lon){
  if(!settings.radar)return;
  SAMPLE_MOBILE.forEach((r,i)=>{
    const d=dist(lat,lon,r.lat,r.lon);const k='m'+i;
    if(d<1150&&d>900&&!mobileState[k+'_1']){mobileState[k+'_1']=1;playAudio('seyyar_1km');showAlertBox('mobile-radar-alert','mobile-radar-dist-text',Math.round(d)+' m');}
    if(d<600&&d>400&&!mobileState[k+'_5']){mobileState[k+'_5']=1;playAudio('seyyar_500m');showAlertBox('mobile-radar-alert','mobile-radar-dist-text',Math.round(d)+' m');}
    if(d<250&&d>150&&!mobileState[k+'_2']){mobileState[k+'_2']=1;playAudio('seyyar_200m');showAlertBox('mobile-radar-alert','mobile-radar-dist-text',Math.round(d)+' m');}
    if(d>1300){delete mobileState[k+'_1'];delete mobileState[k+'_5'];delete mobileState[k+'_2'];}
  });
}
function checkPoliceProx(lat,lon){
  if(!settings.police)return;
  SAMPLE_POLICE.forEach((p,i)=>{
    const d=dist(lat,lon,p.lat,p.lon);const k='p'+i;
    if(d<1150&&d>900&&!policeState[k+'_1']){policeState[k+'_1']=1;playAudio('polis_1km');showAlertBox('police-alert','police-dist-text',Math.round(d)+' m');}
    if(d<600&&d>400&&!policeState[k+'_5']){policeState[k+'_5']=1;playAudio('polis_500m');showAlertBox('police-alert','police-dist-text',Math.round(d)+' m');}
    if(d<250&&d>150&&!policeState[k+'_2']){policeState[k+'_2']=1;playAudio('polis_200m');showAlertBox('police-alert','police-dist-text',Math.round(d)+' m');}
    if(d>1300){delete policeState[k+'_1'];delete policeState[k+'_5'];delete policeState[k+'_2'];}
  });
}
function showAlertBox(boxId,distId,txt){
  const box=document.getElementById(boxId);const dt=document.getElementById(distId);
  if(!box)return;if(dt)dt.textContent=txt;
  box.classList.remove('hidden');clearTimeout(box._t);
  box._t=setTimeout(()=>box.classList.add('hidden'),4500);
}

// ============ TRAFFIC ============
function toggleTraffic(){
  trafficActive=!trafficActive;
  document.getElementById('fab-traffic').classList.toggle('active',trafficActive);
  document.getElementById('traffic-legend').classList.toggle('hidden',!trafficActive);
  if(!trafficActive){
    if(map.getLayer('traffic-l'))map.removeLayer('traffic-l');
    if(map.getSource('traffic-s'))map.removeSource('traffic-s');
    playAudio('trafik_kapandi');return;
  }
  playAudio('trafik_acildi');loadTraffic();
}
function toggleTrafficLayer(on){if(on!==trafficActive)toggleTraffic();}

async function loadTraffic(){
  if(!map)return;
  // Overpass yerine haritanın kendi kaynaklarını kullan - her zaman çalışır
  try{
    // Mevcut harita stilindeki yol katmanlarını bul ve üstüne trafik rengi ekle
    const style=map.getStyle();
    if(!style||!style.sources)return;

    // OpenFreeMap'in openmaptiles kaynağını kullan
    const src=map.getSource('openmaptiles')?'openmaptiles':null;
    if(!src){
      // Kaynak yoksa Overpass ile dene
      await loadTrafficOverpass();
      return;
    }

    // Trafik katmanı - yol tipine göre renk
    if(map.getLayer('traffic-l'))map.removeLayer('traffic-l');
    map.addLayer({
      id:'traffic-l',
      type:'line',
      source:src,
      'source-layer':'transportation',
      filter:['in','class','motorway','trunk','primary','secondary'],
      layout:{'line-join':'round','line-cap':'round'},
      paint:{
        'line-color':['case',
          ['==',['get','class'],'motorway'],'#d50000',
          ['==',['get','class'],'trunk'],'#ff6d00',
          ['==',['get','class'],'primary'],'#ffd600',
          '#00c853'
        ],
        'line-width':['interpolate',['linear'],['zoom'],
          8,['case',['==',['get','class'],'motorway'],3,2],
          14,['case',['==',['get','class'],'motorway'],8,['==',['get','class'],'trunk'],6,4]
        ],
        'line-opacity':0.75
      }
    });
  }catch(e){
    await loadTrafficOverpass();
  }
}

async function loadTrafficOverpass(){
  if(!userLat)return;
  const b=`${userLat-0.8},${userLon-0.8},${userLat+0.8},${userLon+0.8}`;
  const q=`[out:json][timeout:25];(way["highway"~"motorway|trunk|primary|secondary"](${b}););out geom;`;
  try{
    const d=await overpassQuery(q);
    const features=(d.elements||[]).filter(e=>e.type==='way'&&e.geometry).map(e=>{
      const hw=(e.tags&&e.tags.highway)||'';
      const rand=Math.random();
      const color=hw==='motorway'?(rand<0.3?'#d50000':rand<0.6?'#ff6d00':'#ffd600'):
                  hw==='trunk'?(rand<0.2?'#ff6d00':rand<0.5?'#ffd600':'#00c853'):
                  rand<0.15?'#ffd600':'#00c853';
      return{type:'Feature',properties:{color,hw},geometry:{type:'LineString',coordinates:e.geometry.map(p=>[p.lon,p.lat])}};
    });
    if(!features.length){showToast('Trafik verisi bulunamadı');return;}
    if(map.getLayer('traffic-l'))map.removeLayer('traffic-l');
    if(map.getSource('traffic-s'))map.removeSource('traffic-s');
    map.addSource('traffic-s',{type:'geojson',data:{type:'FeatureCollection',features}});
    map.addLayer({id:'traffic-l',type:'line',source:'traffic-s',
      layout:{'line-join':'round','line-cap':'round'},
      paint:{'line-color':['get','color'],'line-width':5,'line-opacity':0.8}
    });
  }catch(e){showToast('Trafik yüklenemedi');}
}

// ============ NEARBY ============
async function filterNearby(cat,btn){
  document.querySelectorAll('.cat').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  const el=document.getElementById('nearby-list');
  el.innerHTML='<div style="padding:12px;color:#4fc3f7;text-align:center">Aranıyor...</div>';

  if(!userLat){
    showToast('Konum alınıyor...');startGPS();
    let tries=0;
    const wait=setInterval(()=>{
      tries++;
      if(userLat){clearInterval(wait);filterNearby(cat,btn);}
      else if(tries>20){clearInterval(wait);el.innerHTML='<div style="padding:10px;color:#888;text-align:center">Konum alınamadı</div>';}
    },500);
    return;
  }

  // Küçük bbox - daha hızlı yanıt
  const R=0.12;
  const R2=0.2;
  const bbox=`${userLat-R},${userLon-R},${userLat+R},${userLon+R}`;
  const bbox2=`${userLat-R2},${userLon-R2},${userLat+R2},${userLon+R2}`;

  const queries={
    all:`(node["amenity"~"fuel|restaurant|hospital|pharmacy|atm|parking|mosque|police|bank|cafe|fast_food|post_office"](${bbox});node["shop"~"supermarket|convenience|grocery|bakery"](${bbox}););`,
    fuel:`node["amenity"="fuel"](${bbox2});`,
    restaurant:`(node["amenity"~"restaurant|cafe|fast_food|bar|food_court"](${bbox}););`,
    hospital:`(node["amenity"~"hospital|clinic|doctors|dentist"](${bbox2}););`,
    pharmacy:`node["amenity"="pharmacy"](${bbox2});`,
    atm:`(node["amenity"~"atm|bank"](${bbox}););`,
    parking:`node["amenity"="parking"](${bbox});`,
    mosque:`(node["amenity"="place_of_worship"]["religion"="muslim"](${bbox2}););`,
    market:`(node["shop"~"supermarket|convenience|grocery|bakery|market"](${bbox}););`,
    government:`(node["amenity"~"townhall|town_hall|courthouse|police|fire_station|post_office|library"](${bbox2});node["office"~"government|administrative|municipality"](${bbox2}););`
  };

  const catTR={fuel:'Akaryakıt',restaurant:'Restoran',hospital:'Hastane',pharmacy:'Eczane',
    atm:'ATM/Banka',parking:'Otopark',mosque:'Cami',market:'Market',government:'Resmi Kurum',all:'Tümü'};
  const icons={fuel:'⛽',restaurant:'🍽',hospital:'🏥',pharmacy:'💊',atm:'🏧',parking:'🅿',
    mosque:'🕌',market:'🛒',government:'🏛',cafe:'☕',bank:'🏦',police:'👮',
    supermarket:'🛒',convenience:'🛒',grocery:'🛒',bakery:'🥖',
    townhall:'🏛',town_hall:'🏛',courthouse:'⚖️',fire_station:'🚒',
    post_office:'📮',library:'📚',dentist:'🦷',doctors:'👨‍⚕️',clinic:'🏥',
    bar:'🍺',fast_food:'🍔',food_court:'🍽',all:'📍'};

  const amenityTR={fuel:'Akaryakıt',restaurant:'Restoran',cafe:'Kafe',fast_food:'Fast Food',
    hospital:'Hastane',clinic:'Klinik',doctors:'Doktor',dentist:'Diş Hekimi',
    pharmacy:'Eczane',atm:'ATM',bank:'Banka',parking:'Otopark',
    mosque:'Cami',place_of_worship:'İbadet Yeri',
    supermarket:'Süpermarket',convenience:'Market',grocery:'Bakkal',bakery:'Fırın',
    townhall:'Belediye',town_hall:'Belediye',courthouse:'Adliye',
    fire_station:'İtfaiye',post_office:'PTT',library:'Kütüphane',
    police:'Polis',bar:'Bar',food_court:'Yemek Alanı'};

  const q=`[out:json][timeout:20];${queries[cat]||queries.all}out;`;
  try{
    const d=await overpassQuery(q);
    const items=(d.elements||[])
      .filter(e=>e.lat&&e.lon&&e.tags)
      .map(e=>({...e,_d:dist(userLat,userLon,e.lat,e.lon)}))
      .sort((a,b)=>a._d-b._d).slice(0,20);

    if(!items.length){
      el.innerHTML=`<div style="padding:12px;color:#888;text-align:center">${catTR[cat]||cat} kategorisinde yakında yer bulunamadı</div>`;
      return;
    }

    el.innerHTML=items.map(e=>{
      const name=e.tags.name||(amenityTR[e.tags.amenity||e.tags.shop||e.tags.office]||cat);
      const amenity=e.tags.amenity||e.tags.shop||e.tags.office||'';
      const amenityLabel=amenityTR[amenity]||amenity;
      const icon=icons[amenity]||icons[cat]||'📍';
      const d2=e._d<1000?Math.round(e._d)+' m':(e._d/1000).toFixed(1)+' km';
      const safe=name.replace(/'/g,"\\'").replace(/"/g,'&quot;');
      return`<div class="ni" onclick="openRouteModal(${e.lat},${e.lon},'${safe}');closePanel('nearby-panel')">
        <div class="ni-icon">${icon}</div>
        <div class="ni-info"><div class="ni-name">${name}</div><div class="ni-meta">${d2}${amenityLabel?' · '+amenityLabel:''}</div></div>
      </div>`;
    }).join('');
  }catch(e){
    el.innerHTML='<div style="padding:12px;color:#888;text-align:center">Yakında yer bulunamadı</div>';
  }
}

// ============ SAVED PLACES ============
// Marker referansları - silinebilmesi için
let homeMarker=null, carMarker=null;

function saveHome(lat,lon){
  const la=lat||userLat,lo=lon||userLon;
  if(!la){showToast('Konum alınıyor...');return;}
  homePos={lat:la,lon:lo};localStorage.setItem('nav_home',JSON.stringify(homePos));
  playAudio('ev_kaydedildi');showToast('Ev kaydedildi');
  if(homeMarker)homeMarker.remove();
  homeMarker=addHomeMarker(la,lo);
}
function saveCar(lat,lon){
  const la=lat||userLat,lo=lon||userLon;
  if(!la){showToast('Konum alınıyor...');return;}
  carPos={lat:la,lon:lo};localStorage.setItem('nav_car',JSON.stringify(carPos));
  playAudio('araba_kaydedildi');showToast('Araç konumu kaydedildi');
  if(carMarker)carMarker.remove();
  carMarker=addCarMarker(la,lo);
}
function deleteHome(){homePos=null;localStorage.removeItem('nav_home');if(homeMarker){homeMarker.remove();homeMarker=null;}showToast('Ev silindi');}
function deleteCar(){carPos=null;localStorage.removeItem('nav_car');if(carMarker){carMarker.remove();carMarker=null;}showToast('Araç konumu silindi');}
function goHome(){if(!homePos){showToast('Ev kayıtlı değil');return;}openRouteModal(homePos.lat,homePos.lon,'Ev');}
function gotoCar(){if(!carPos){showToast('Araç konumu kayıtlı değil');return;}openRouteModal(carPos.lat,carPos.lon,'Araç');}

function addHomeMarker(lat,lon){
  const el=document.createElement('div');el.innerHTML=homeSVG();
  return new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat([lon,lat])
    .setPopup(new maplibregl.Popup().setHTML('<b>Ev</b><br><button onclick="goHome()">Rota</button> <button onclick="deleteHome()">Sil</button>'))
    .addTo(map);
}
function addCarMarker(lat,lon){
  const el=document.createElement('div');el.innerHTML=carPinSVG();
  return new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat([lon,lat])
    .setPopup(new maplibregl.Popup().setHTML('<b>Araç</b><br><button onclick="gotoCar()">Rota</button> <button onclick="deleteCar()">Sil</button>'))
    .addTo(map);
}
function addPinMarker(lat,lon,name){
  const el=document.createElement('div');el.innerHTML=pinSVG('#ff9800');
  return new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat([lon,lat])
    .setPopup(new maplibregl.Popup().setHTML(`<b>${name}</b><br><button onclick="openRouteModal(${lat},${lon},'${name.replace(/'/g,"\\'")}')">Rota</button>`))
    .addTo(map);
}

function loadSavedMarkers(){
  if(homePos)homeMarker=addHomeMarker(homePos.lat,homePos.lon);
  if(carPos)carMarker=addCarMarker(carPos.lat,carPos.lon);
  savedPlaces.forEach(p=>addPinMarker(p.lat,p.lon,p.name));
}
function savePlace(lat,lon,name){
  const p={lat,lon,name,id:Date.now()};savedPlaces.push(p);
  localStorage.setItem('nav_places',JSON.stringify(savedPlaces));
  addPinMarker(lat,lon,name);showToast('Yer kaydedildi');renderPins();
}
function renderPins(){
  const el=document.getElementById('pins-list');if(!el)return;
  if(!savedPlaces.length){el.innerHTML='<div style="padding:10px;color:#888">Kayıtlı yer yok</div>';return;}
  el.innerHTML=savedPlaces.map(p=>`<div class="pin-item"><div class="pin-item-info" onclick="map.flyTo({center:[${p.lon},${p.lat}],zoom:15})"><div class="pin-item-name">${p.name}</div></div><button class="pin-del" onclick="deletePin(${p.id})">✕</button></div>`).join('');
}
function deletePin(id){savedPlaces=savedPlaces.filter(p=>p.id!==id);localStorage.setItem('nav_places',JSON.stringify(savedPlaces));renderPins();}
function clearAllPins(){if(!confirm('Tüm kayıtlı yerler silinsin mi?'))return;savedPlaces=[];localStorage.removeItem('nav_places');renderPins();}

// ============ LONG PRESS ============
function showLongPress(lat,lon){
  lpLat=lat;lpLon=lon;
  const p=document.getElementById('longPressPanel');if(p)p.classList.remove('hidden');
}
function lpRoute(){openRouteModal(lpLat,lpLon,'Seçilen Nokta');closePanel('longPressPanel');}
function lpSaveHome(){saveHome(lpLat,lpLon);closePanel('longPressPanel');}
function lpSaveCar(){saveCar(lpLat,lpLon);closePanel('longPressPanel');}

// ============ SPEEDOMETER ============
function startSpeedometer(){setInterval(()=>drawSpeedometer(userSpeed||0),1000);}
function updateSpeedometer(s){drawSpeedometer(s);}
function drawSpeedometer(spd){
  const c=document.getElementById('spd-canvas');if(!c)return;
  const ctx=c.getContext('2d');
  const w=c.width,h=c.height,cx=w/2,cy=h/2,r=Math.min(w,h)/2-4;
  ctx.clearRect(0,0,w,h);
  ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle='rgba(13,13,40,0.9)';ctx.fill();
  ctx.strokeStyle='#333';ctx.lineWidth=2;ctx.stroke();
  const max=200,sa=Math.PI*0.75,ea=Math.PI*2.25;
  const ang=sa+(Math.min(spd,max)/max)*(ea-sa);
  ctx.beginPath();ctx.arc(cx,cy,r-6,sa,ea);ctx.strokeStyle='#1a1a2e';ctx.lineWidth=9;ctx.stroke();
  const col=spd>120?'#f44336':spd>80?'#ff9800':'#4caf50';
  ctx.beginPath();ctx.arc(cx,cy,r-6,sa,ang);ctx.strokeStyle=col;ctx.lineWidth=9;ctx.lineCap='round';ctx.stroke();
  // Ticks
  for(let i=0;i<=10;i++){
    const a=sa+(i/10)*(ea-sa);
    const x1=cx+(r-16)*Math.cos(a),y1=cy+(r-16)*Math.sin(a);
    const x2=cx+(r-24)*Math.cos(a),y2=cy+(r-24)*Math.sin(a);
    ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle='#555';ctx.lineWidth=1.5;ctx.stroke();
  }
  ctx.fillStyle='#fff';ctx.font=`bold ${Math.round(r*0.44)}px Arial`;ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(Math.round(spd),cx,cy-3);
  ctx.fillStyle='#888';ctx.font=`${Math.round(r*0.2)}px Arial`;ctx.fillText('km/s',cx,cy+r*0.33);
  const num=document.getElementById('spd-num');if(num)num.textContent=Math.round(spd);
}

// ============ AR ============
async function toggleAR(){
  arMode=!arMode;
  const ov=document.getElementById('ar-overlay');
  if(arMode){
    try{
      arStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});
      const v=document.getElementById('ar-video');if(v){v.srcObject=arStream;v.play();}
      if(ov)ov.classList.remove('hidden');
      playAudio('ar_acildi');drawAR();
    }catch(e){arMode=false;showToast('Kamera erişimi reddedildi');}
  }else{
    if(arStream){arStream.getTracks().forEach(t=>t.stop());arStream=null;}
    if(ov)ov.classList.add('hidden');
    playAudio('ar_kapandi');
  }
}
function drawAR(){
  const c=document.getElementById('ar-canvas');if(!c||!arMode)return;
  const ctx=c.getContext('2d');
  c.width=window.innerWidth;c.height=window.innerHeight;
  ctx.clearRect(0,0,c.width,c.height);
  const cx=c.width/2,cy=c.height/2;
  let angle=0;
  if(destCoords&&userLat){const b=brng(userLat,userLon,destCoords.lat,destCoords.lon);angle=(b-userBearing)*Math.PI/180;}
  ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);
  ctx.beginPath();ctx.moveTo(0,-70);ctx.lineTo(22,22);ctx.lineTo(0,8);ctx.lineTo(-22,22);ctx.closePath();
  ctx.fillStyle='rgba(26,115,232,0.88)';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
  ctx.restore();
  if(destCoords&&userLat){
    const d=dist(userLat,userLon,destCoords.lat,destCoords.lon);
    ctx.fillStyle='#fff';ctx.font='bold 22px Arial';ctx.textAlign='center';ctx.fillText(fmtDist(d),cx,cy+90);
  }
  requestAnimationFrame(drawAR);
}

// ============ PANEL HELPERS ============
function openPanel(id){
  document.querySelectorAll('.panel').forEach(p=>p.classList.add('hidden'));
  const p=document.getElementById(id);if(p)p.classList.remove('hidden');
  if(id==='pins-panel')renderPins();
}
function closePanel(id){const p=document.getElementById(id);if(p)p.classList.add('hidden');}
function togglePanel(id){const p=document.getElementById(id);if(p)p.classList.toggle('hidden');}

function showToast(msg){
  const el=document.getElementById('reroute-toast');if(!el)return;
  el.textContent=msg;el.classList.remove('hidden');
  clearTimeout(el._t);el._t=setTimeout(()=>el.classList.add('hidden'),3000);
}

function toggleTollLayer(){}
function toggleRoadworkLayer(){}
function togglePOILayer(){}

// ============ INIT ============
// ============ INIT ============
function _init(){
  // Service Worker kaydet (offline mod)
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').catch(()=>{});
  }
  initMap();
  startGPS();
  const si=document.getElementById('search-input');
  if(si)si.addEventListener('keydown',e=>{if(e.key==='Enter')searchPlace();});
  document.addEventListener('click',e=>{
    const sr=document.getElementById('search-results');
    const si2=document.getElementById('search-input');
    if(sr&&si2&&!sr.contains(e.target)&&e.target!==si2)sr.style.display='none';
  });
  setInterval(()=>{
    const h=new Date().getHours();
    const cb=document.getElementById('set-night');
    if(cb&&cb.checked)changeBasemap(h>=20||h<7?'dark':'osm');
  },60000);
  const urlParams=new URLSearchParams(location.search);
  const sc=urlParams.get('share');
  if(sc)watchSharedLocation(sc);
}

// DOMContentLoaded veya zaten yüklendiyse direkt çalıştır
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',_init);
}else{
  _init();
}

// ============ CANLI KONUM PAYLAŞMA ============
let shareActive=false, shareInterval=null;
let shareCode=null;

function toggleShare(){
  if(shareActive){
    stopShare();
  }else{
    startShare();
  }
}

function startShare(){
  if(!userLat){showToast('Önce konum alın');return;}
  shareCode=Math.random().toString(36).substr(2,6).toUpperCase();
  shareActive=true;
  const btn=document.getElementById('share-btn');
  const info=document.getElementById('share-info');
  const codeEl=document.getElementById('share-code');
  if(btn)btn.textContent='Paylaşımı Durdur';
  if(btn)btn.style.background='rgba(229,57,53,0.3)';
  if(info)info.style.display='block';
  if(codeEl)codeEl.textContent=shareCode;
  // Her 3 saniyede konumu gönder
  sendShareLocation();
  shareInterval=setInterval(sendShareLocation,3000);
  showToast('Konum paylaşılıyor: '+shareCode);
}

function stopShare(){
  shareActive=false;
  clearInterval(shareInterval);
  const btn=document.getElementById('share-btn');
  const info=document.getElementById('share-info');
  if(btn){btn.textContent='Paylaşmayı Başlat';btn.style.background='';}
  if(info)info.style.display='none';
  showToast('Paylaşım durduruldu');
}

async function sendShareLocation(){
  if(!shareActive||!userLat||!shareCode)return;
  try{
    await fetch('/share/'+shareCode,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({lat:userLat,lon:userLon,bearing:userBearing,t:Date.now()})
    });
  }catch(e){}
}

function copyShareLink(){
  const link=location.origin+'/?share='+shareCode;
  if(navigator.clipboard){
    navigator.clipboard.writeText(link).then(()=>showToast('Link kopyalandı!'));
  }else{
    showToast(link);
  }
}

// Paylaşılan konumu izle
let sharedMarker=null;
async function watchSharedLocation(code){
  showToast('Konum izleniyor: '+code);
  const poll=async()=>{
    try{
      const r=await fetch('/share/'+code);
      if(!r.ok)return;
      const d=await r.json();
      if(!d.lat)return;
      if(!sharedMarker){
        const el=document.createElement('div');
        el.innerHTML=`<svg viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="16" fill="rgba(255,152,0,0.2)" stroke="#ff9800" stroke-width="2"/><circle cx="20" cy="20" r="8" fill="#ff9800"/><circle cx="20" cy="20" r="4" fill="#fff"/></svg>`;
        sharedMarker=new maplibregl.Marker({element:el,anchor:'center'})
          .setLngLat([d.lon,d.lat])
          .setPopup(new maplibregl.Popup().setHTML('<b>Paylaşılan Konum</b>'))
          .addTo(map);
      }else{
        sharedMarker.setLngLat([d.lon,d.lat]);
      }
    }catch(e){}
  };
  poll();
  setInterval(poll,3000);
}


