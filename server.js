const express = require('express');
const https = require('https');
const http = require('http');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(require('path').join(__dirname, 'public')));
app.use(express.json());

// Overpass API proxy - CORS sorununu çözer
app.post('/api/overpass', (req, res) => {
  const query = req.body.query;
  if (!query) return res.status(400).json({ error: 'query gerekli' });

  const postData = 'data=' + encodeURIComponent(query);
  const options = {
    hostname: 'overpass-api.de',
    path: '/api/interpreter',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'Navitr/1.0'
    }
  };

  const proxyReq = https.request(options, (proxyRes) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    let data = '';
    proxyRes.on('data', chunk => data += chunk);
    proxyRes.on('end', () => {
      try { res.json(JSON.parse(data)); }
      catch(e) { res.status(500).json({ error: 'Parse hatası', raw: data.substring(0, 200) }); }
    });
  });

  proxyReq.on('error', (e) => res.status(500).json({ error: e.message }));
  proxyReq.setTimeout(30000, () => { proxyReq.destroy(); res.status(504).json({ error: 'Timeout' }); });
  proxyReq.write(postData);
  proxyReq.end();
});

// Nominatim proxy
app.get('/api/search', (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'q gerekli' });
  const path = `/search?q=${encodeURIComponent(q)}&format=json&countrycodes=tr&limit=6&addressdetails=1&accept-language=tr`;
  const options = {
    hostname: 'nominatim.openstreetmap.org',
    path,
    method: 'GET',
    headers: { 'User-Agent': 'Navitr/1.0' }
  };
  const proxyReq = https.request(options, (proxyRes) => {
    res.setHeader('Content-Type', 'application/json');
    let data = '';
    proxyRes.on('data', chunk => data += chunk);
    proxyRes.on('end', () => {
      try { res.json(JSON.parse(data)); }
      catch(e) { res.status(500).json([]); }
    });
  });
  proxyReq.on('error', () => res.json([]));
  proxyReq.setTimeout(10000, () => { proxyReq.destroy(); res.json([]); });
  proxyReq.end();
});

// Nominatim reverse geocode proxy
app.get('/api/reverse', (req, res) => {
  const {lat, lon} = req.query;
  if (!lat || !lon) return res.status(400).json({});
  const path = `/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&accept-language=tr`;
  const options = {
    hostname: 'nominatim.openstreetmap.org',
    path,
    method: 'GET',
    headers: { 'User-Agent': 'Navitr/1.0' }
  };
  const proxyReq = https.request(options, (proxyRes) => {
    res.setHeader('Content-Type', 'application/json');
    let data = '';
    proxyRes.on('data', chunk => data += chunk);
    proxyRes.on('end', () => {
      try { res.json(JSON.parse(data)); }
      catch(e) { res.json({}); }
    });
  });
  proxyReq.on('error', () => res.json({}));
  proxyReq.setTimeout(8000, () => { proxyReq.destroy(); res.json({}); });
  proxyReq.end();
});
const locations = {};

app.post('/share/:id', (req, res) => {
  locations[req.params.id] = { ...req.body, t: Date.now() };
  res.json({ ok: true });
});

app.get('/share/:id', (req, res) => {
  const loc = locations[req.params.id];
  if (!loc) return res.status(404).json({ error: 'Bulunamadı' });
  res.json(loc);
});

app.listen(PORT, () => console.log(`RestoreBana çalışıyor: http://localhost:${PORT}`));

// Render uyku modunu önle - kendi kendine ping
if(process.env.RENDER_EXTERNAL_URL){
  setInterval(()=>{
    https.get(process.env.RENDER_EXTERNAL_URL, ()=>{}).on('error',()=>{});
  }, 14 * 60 * 1000); // 14 dakikada bir
}
