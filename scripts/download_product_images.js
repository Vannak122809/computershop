const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const outDir = path.join(process.cwd(), 'public', 'images', 'products');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const searchMap = {
  "lenovo-thinkpad-e14-gen-5": "lenovo thinkpad e14 laptop product white background",
  "dell-vostro-3520": "dell vostro 3520 laptop product white background",
  "apple-macbook-air-13-m3": "apple macbook air m3 product white background",
  "asus-rog-strix-g16-2024": "asus rog strix g16 gaming laptop product white background",
  "asus-tuf-gaming-a15": "asus tuf gaming a15 laptop product white background",
  "acer-nitro-v-15": "acer nitro v 15 laptop product white background",
  "lenovo-legion-pro-5": "lenovo legion pro 5 laptop product white background",
  "apple-macbook-pro-14-m3": "apple macbook pro 14 space black product white background",
  "dell-xps-15-9530": "dell xps 15 9530 laptop product white background",
  "hp-pavilion-15-eg3000": "hp pavilion 15 laptop silver product white background",
  
  "dell-ultrasharp-u2723qe": "dell ultrasharp u2723qe 27 monitor product white background",
  "samsung-odyssey-g5-27": "samsung odyssey g5 27 curved monitor product white background",
  "lg-ultragear-27gr75q": "lg ultragear 27 gaming monitor product white background",
  "asus-tuf-gaming-vg249q1a": "asus tuf gaming vg249q1a monitor product white background",
  "msi-modern-md241p": "msi modern md241p monitor product white background",

  "intel-core-i5-14400f": "intel core i5 14400f box product white background",
  "intel-core-i7-14700k": "intel core i7 14700k box product white background",
  "intel-core-i9-14900k": "intel core i9 14900k box product white background",
  "amd-ryzen-5-7600x": "amd ryzen 5 7600x box product white background",
  "amd-ryzen-7-7800x3d": "amd ryzen 7 7800x3d box product white background",

  "msi-b760m-a-wifi-ddr5": "msi pro b760m a wifi motherboard product white background",
  "asus-rog-strix-b650e-f": "asus rog strix b650e f gaming motherboard product white background",
  "gigabyte-b760-gaming-x": "gigabyte b760 gaming x ax motherboard product white background",

  "corsair-vengeance-32gb-ddr5": "corsair vengeance ddr5 ram black product white background",
  "kingston-fury-beast-16gb-ddr5": "kingston fury beast ddr5 ram product white background",
  "samsung-990-pro-2tb-nvme": "samsung 990 pro nvme ssd box product white background",
  "kingston-nv2-1tb-nvme": "kingston nv2 nvme ssd box product white background",

  "asus-dual-rtx-4060-8gb": "asus dual rtx 4060 graphics card product white background",
  "gigabyte-rtx-4070-super-windforce": "gigabyte rtx 4070 super windforce graphics card product white background",
  "asus-tuf-rtx-4070ti-super-16gb": "asus tuf rtx 4070 ti super graphics card product white background",

  "montech-air-100-argb-black": "montech air 100 argb pc case product white background",
  "nzxt-h5-flow-rgb-black": "nzxt h5 flow rgb pc case black product white background",
  "cooler-master-mwe-650w-bronze": "cooler master mwe bronze 650 psu product white background",
  "corsair-rm850e-850w-gold-atx3": "corsair rm850e power supply product white background",
  "thermalright-peerless-assassin-120-se": "thermalright peerless assassin 120 se cpu cooler product white background",
  "deepcool-ls720-360mm-liquid-cooler": "deepcool ls720 aio liquid cooler product white background",

  "mikrotik-rb760igs-hex-s": "mikrotik hex s rb760igs router product white background",
  "mikrotik-rb5009ug-s-in": "mikrotik rb5009ug s in router product white background",
  "mikrotik-ccr2004-16g-2s-plus": "mikrotik ccr2004 16g 2s product white background",
  "ubiquiti-unifi-u6-pro": "ubiquiti unifi u6 pro access point product white background",
  "ubiquiti-unifi-u6-plus": "ubiquiti unifi u6 plus access point product white background",
  "tp-link-archer-ax73": "tp link archer ax73 router product white background",
  "tp-link-tl-sg1024d": "tp link tl sg1024d 24 port gigabit switch product white background",
  "ruijie-reyee-rg-rap2260e": "ruijie reyee rg rap2260e access point product white background",
  "cisco-catalyst-c1000-24t-4g-l": "cisco catalyst 1000 24 port switch product white background",
  "cisco-cbs350-24p-4g": "cisco cbs350 24p 4g poe switch product white background",
  "commscope-amp-cat6-utp-cable-305m": "commscope amp cat6 utp cable box product white background",
  "toten-server-rack-9u-wallmount": "toten 9u server rack cabinet product white background",

  "fortinet-fortigate-40f": "fortinet fortigate 40f firewall product white background",
  "fortinet-fortigate-60f": "fortinet fortigate 60f firewall product white background",
  "fortinet-fortigate-80f": "fortinet fortigate 80f firewall product white background",
  "sophos-xgs-116": "sophos xgs 116 firewall product white background",

  "epson-ecotank-l3250-wifi": "epson ecotank l3250 printer product white background",
  "canon-pixma-g3010-ink-tank": "canon pixma g3010 printer product white background",
  "hp-laserjet-pro-m404dn": "hp laserjet pro m404dn printer product white background",
  "brother-hl-l2375dw-duplex": "brother hl l2375dw printer product white background",
  "xprinter-xp-420b-thermal-barcode": "xprinter xp 420b barcode printer product white background",
  "sunmi-v2-pro-handheld-pos": "sunmi v2 pro handheld pos terminal product white background",

  "zkteco-k40-fingerprint-attendance": "zkteco k40 fingerprint time attendance product white background",
  "zkteco-mb20-face-fingerprint": "zkteco mb20 face fingerprint attendance product white background",
  "hikvision-ds-k1t804amf-terminal": "hikvision ds k1t804amf terminal product white background",

  "logitech-mx-master-3s-mouse": "logitech mx master 3s mouse black product white background",
  "logitech-g502-hero-gaming-mouse": "logitech g502 hero gaming mouse product white background",
  "keychron-k2-wireless-keyboard": "keychron k2 wireless mechanical keyboard product white background",
  "apc-back-ups-pro-1500va-ups": "apc back ups pro 1500va product white background"
};

function fetchUrl(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      timeout: 10000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
          const u = new URL(url);
          redirectUrl = `${u.protocol}//${u.host}${redirectUrl}`;
        }
        return fetchUrl(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function getImageUrls(query) {
  return new Promise(resolve => {
    const pageUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`;
    https.get(pageUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const vqd = data.match(/vqd=([^&"]+)/)?.[1] || data.match(/vqd=["']([^"']+)["']/)?.[1];
        if (!vqd) return resolve([]);
        const apiUrl = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}&f=,,,type:photo,,&p=1`;
        https.get(apiUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' }
        }, res2 => {
          let d2 = '';
          res2.on('data', c => d2 += c);
          res2.on('end', () => {
            try {
              const j = JSON.parse(d2);
              resolve((j.results || []).slice(0, 5).map(r => r.image));
            } catch(e) { resolve([]); }
          });
        }).on('error', () => resolve([]));
      });
    }).on('error', () => resolve([]));
  });
}

async function downloadOne(slug, query) {
  const destPath = path.join(outDir, `${slug}.jpg`);
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 5000) {
    console.log(`[SKIP] ${slug} already exists (${fs.statSync(destPath).size} bytes)`);
    return true;
  }

  const urls = await getImageUrls(query);
  for (const u of urls) {
    try {
      const buf = await fetchUrl(u);
      if (buf.length > 5000) {
        fs.writeFileSync(destPath, buf);
        console.log(`[OK] ${slug} downloaded (${buf.length} bytes)`);
        return true;
      }
    } catch(err) {
      // try next url
    }
  }
  console.log(`[FAIL] ${slug} no image downloaded`);
  return false;
}

async function run() {
  const slugs = Object.keys(searchMap);
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    await downloadOne(slug, searchMap[slug]);
    // slight delay
    await new Promise(r => setTimeout(r, 400));
  }
  console.log('Finished downloading real product images.');
}

run();
