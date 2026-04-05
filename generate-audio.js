// Türkçe ses dosyalarını Google TTS ile üretir
// Kullanım: node generate-audio.js
const https = require('https');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'public', 'audio');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const PHRASES = {
  // ── TEMEL YÖNLER ──────────────────────────────────────────
  'saga_don':           'Sağa dönün',
  'sola_don':           'Sola dönün',
  'duz_devam':          'Düz devam edin',
  'saga_hafif':         'Hafifçe sağa dönün',
  'sola_hafif':         'Hafifçe sola dönün',
  'saga_sert':          'Sert sağa dönün',
  'sola_sert':          'Sert sola dönün',
  'geri_don':           'Geri dönün',
  'kavsaktan_cik':      'Kavşaktan çıkın',
  'donelden_cik':       'Dönel kavşaktan çıkın',

  // ── 50 METRE ──────────────────────────────────────────────
  '50m_saga':           '50 metre sonra sağa dönün',
  '50m_sola':           '50 metre sonra sola dönün',
  '50m_saga_sert':      '50 metre sonra sert sağa dönün',
  '50m_sola_sert':      '50 metre sonra sert sola dönün',
  '50m_saga_hafif':     '50 metre sonra hafifçe sağa dönün',
  '50m_sola_hafif':     '50 metre sonra hafifçe sola dönün',
  '50m_geri':           '50 metre sonra geri dönün',

  // ── 100 METRE ─────────────────────────────────────────────
  '100m_saga':          '100 metre sonra sağa dönün',
  '100m_sola':          '100 metre sonra sola dönün',
  '100m_duz':           '100 metre sonra düz devam edin',

  // ── 200 METRE ─────────────────────────────────────────────
  '200m_saga':          '200 metre sonra sağa dönün',
  '200m_sola':          '200 metre sonra sola dönün',
  '200m_duz':           '200 metre sonra düz devam edin',
  '200m_saga_sert':     '200 metre sonra sert sağa dönün',
  '200m_sola_sert':     '200 metre sonra sert sola dönün',
  '200m_saga_hafif':    '200 metre sonra hafifçe sağa dönün',
  '200m_sola_hafif':    '200 metre sonra hafifçe sola dönün',
  '200m_geri':          '200 metre sonra geri dönün',
  '200m_kavsaktan_cik': '200 metre sonra kavşaktan çıkın',

  // ── 500 METRE ─────────────────────────────────────────────
  '500m_saga':          '500 metre sonra sağa dönün',
  '500m_sola':          '500 metre sonra sola dönün',
  '500m_duz':           '500 metre sonra düz devam edin',
  '500m_saga_sert':     '500 metre sonra sert sağa dönün',
  '500m_sola_sert':     '500 metre sonra sert sola dönün',
  '500m_saga_hafif':    '500 metre sonra hafifçe sağa dönün',
  '500m_sola_hafif':    '500 metre sonra hafifçe sola dönün',
  '500m_kavsaktan_cik': '500 metre sonra kavşaktan çıkın',

  // ── 1 KİLOMETRE ───────────────────────────────────────────
  '1km_saga':           '1 kilometre sonra sağa dönün',
  '1km_sola':           '1 kilometre sonra sola dönün',
  '1km_duz':            '1 kilometre sonra düz devam edin',
  '1km_saga_sert':      '1 kilometre sonra sert sağa dönün',
  '1km_sola_sert':      '1 kilometre sonra sert sola dönün',
  '1km_saga_hafif':     '1 kilometre sonra hafifçe sağa dönün',
  '1km_sola_hafif':     '1 kilometre sonra hafifçe sola dönün',
  '1km_kavsaktan_cik':  '1 kilometre sonra kavşaktan çıkın',
  '1km_geri':           '1 kilometre sonra geri dönün',

  // ── 2 KİLOMETRE ───────────────────────────────────────────
  '2km_saga':           '2 kilometre sonra sağa dönün',
  '2km_sola':           '2 kilometre sonra sola dönün',

  // ── HEDEF ─────────────────────────────────────────────────
  'hedefe_ulastiniz':   'Hedefinize ulaştınız',
  'hedefe_yaklasiyorsunuz': 'Hedefinize yaklaşıyorsunuz',
  'rota_yeniden':       'Rota yeniden hesaplanıyor',
  'rota_hazir':         'Rota hazır, yola çıkabilirsiniz',
  'rota_iptal':         'Rota iptal edildi',
  'yola_devam':         'Yola devam edin',

  // ── KAVŞAK / ÖZEL ─────────────────────────────────────────
  'saga_don_sonra_sola':  'Sağa dönün, ardından sola dönün',
  'sola_don_sonra_saga':  'Sola dönün, ardından sağa dönün',
  'kopruyu_gec':          'Köprüyü geçin',
  'tunelden_gec':         'Tünelden geçin',
  'otoyola_gir':          'Otoyola girin',
  'otoyoldan_cik':        'Otoyoldan çıkın',
  'saga_cik':             'Sağdan çıkın',
  'sola_cik':             'Soldan çıkın',
  'yolu_takip_et':        'Yolu takip edin',
  'saga_kal':             'Sağda kalın',
  'sola_kal':             'Solda kalın',
  'merkeze_dogru':        'Merkeze doğru ilerleyin',

  // ── RADAR ─────────────────────────────────────────────────
  'radar_1km':            'Dikkat! 1 kilometre ileride radar',
  'radar_500m':           'Dikkat! 500 metre ileride radar',
  'radar_200m':           'Radar! Hızınızı düşürün',
  'radar_simdi':          'Radar noktasındasınız',
  'seyyar_1km':           'Dikkat! 1 kilometre ileride seyyar radar',
  'seyyar_500m':          'Dikkat! 500 metre ileride seyyar radar',
  'seyyar_200m':          'Seyyar radar! Hızınızı düşürün',
  'kirmizi_isik':         'Dikkat! İleride kırmızı ışık radarı',
  'hiz_asimi':            'Hız limitini aştınız, yavaşlayın',
  'hiz_normal':           'Hız normale döndü',

  // ── POLİS ─────────────────────────────────────────────────
  'polis_1km':            'Dikkat! 1 kilometre ileride polis noktası',
  'polis_500m':           'Dikkat! 500 metre ileride polis noktası',
  'polis_200m':           'Polis noktası! Yavaşlayın',
  'seyyar_polis_1km':     'Dikkat! 1 kilometre ileride seyyar polis',
  'seyyar_polis_200m':    'Seyyar polis! Yavaşlayın',

  // ── TRAFİK ────────────────────────────────────────────────
  'trafik_yogun':         'İleride trafik yoğunluğu var',
  'trafik_acik':          'Trafik açık, yola devam edebilirsiniz',
  'trafik_acildi':        'Trafik katmanı açıldı',
  'trafik_kapandi':       'Trafik katmanı kapatıldı',
  'alternatif_rota':      'Alternatif rota bulundu',

  // ── GENEL ─────────────────────────────────────────────────
  'konum_paylasim':       'Konum paylaşımı başlatıldı',
  'paylasim_durdu':       'Konum paylaşımı durduruldu',
  'ev_kaydedildi':        'Ev konumu kaydedildi',
  'araba_kaydedildi':     'Araç konumu kaydedildi',
  'ar_acildi':            'Artırılmış gerçeklik açıldı',
  'ar_kapandi':           'Artırılmış gerçeklik kapatıldı',
  'link_kopyalandi':      'Link kopyalandı',
  'gps_zayif':            'GPS sinyali zayıf',
  'internet_yok':         'İnternet bağlantısı yok',
  'rota_hesaplaniyor':    'Rota hesaplanıyor, lütfen bekleyin',
};


function downloadTTS(text, filename) {
  return new Promise((resolve, reject) => {
    const outPath = path.join(OUT, filename + '.mp3');
    if (fs.existsSync(outPath)) { console.log(`✓ Mevcut: ${filename}`); resolve(); return; }

    const encoded = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=tr&client=tw-ob`;

    const file = fs.createWriteStream(outPath);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    https.get(url, options, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => { file.close(); console.log(`✓ İndirildi: ${filename}`); resolve(); });
      } else {
        file.close();
        fs.unlinkSync(outPath);
        console.log(`✗ Hata (${res.statusCode}): ${filename}`);
        resolve(); // devam et
      }
    }).on('error', (e) => {
      console.log(`✗ Bağlantı hatası: ${filename} - ${e.message}`);
      resolve();
    });
  });
}

async function main() {
  console.log('Türkçe ses dosyaları oluşturuluyor...\n');
  const entries = Object.entries(PHRASES);
  for (const [key, text] of entries) {
    await downloadTTS(text, key);
    await new Promise(r => setTimeout(r, 300)); // rate limit
  }
  console.log('\nTamamlandı! Ses dosyaları: public/audio/');
}

main();
