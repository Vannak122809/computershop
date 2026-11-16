#!/bin/bash

mkdir -p public/images/products

# Helper function to download an image if it doesn't already exist or is small
download_img() {
  local slug="$1"
  local url="$2"
  local dest="public/images/products/${slug}.jpg"
  
  if [ -f "$dest" ] && [ $(stat -f%z "$dest" 2>/dev/null || stat -c%s "$dest" 2>/dev/null) -gt 8000 ]; then
    echo "[EXISTS] $slug"
    return 0
  fi
  
  echo "Downloading $slug..."
  curl -s -L "$url" -o "$dest"
  if [ -f "$dest" ] && [ $(stat -f%z "$dest" 2>/dev/null || stat -c%s "$dest" 2>/dev/null) -gt 8000 ]; then
    echo "[OK] $slug"
  else
    echo "[WARN] $slug small or failed"
  fi
}

# 1. LAPTOPS & COMPUTERS
# Lenovo ThinkPad E14
if [ -f "public/images/products/test-thinkpad.jpg" ]; then
  cp "public/images/products/test-thinkpad.jpg" "public/images/products/lenovo-thinkpad-e14-gen-5.jpg"
fi
download_img "dell-vostro-3520" "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"
download_img "apple-macbook-air-13-m3" "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80"
download_img "asus-rog-strix-g16-2024" "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80"
download_img "asus-tuf-gaming-a15" "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?w=800&auto=format&fit=crop&q=80"
download_img "acer-nitro-v-15" "https://images.unsplash.com/photo-1558742619-fd82741daa99?w=800&auto=format&fit=crop&q=80"
download_img "lenovo-legion-pro-5" "https://images.unsplash.com/photo-1605134513573-384dcf99a44c?w=800&auto=format&fit=crop&q=80"
download_img "apple-macbook-pro-14-m3" "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
download_img "dell-xps-15-9530" "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80"
download_img "hp-pavilion-15-eg3000" "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80"

# 2. MONITORS
download_img "dell-ultrasharp-u2723qe" "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80"
download_img "samsung-odyssey-g5-27" "https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=800&auto=format&fit=crop&q=80"
download_img "lg-ultragear-27gr75q" "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80"
download_img "asus-tuf-gaming-vg249q1a" "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80"
download_img "msi-modern-md241p" "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"

# 3. CPU & MOTHERBOARD
download_img "intel-core-i5-14400f" "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80"
download_img "intel-core-i7-14700k" "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
download_img "intel-core-i9-14900k" "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80"
download_img "amd-ryzen-5-7600x" "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80"
download_img "amd-ryzen-7-7800x3d" "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80"

download_img "msi-b760m-a-wifi-ddr5" "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
download_img "asus-rog-strix-b650e-f" "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80"
download_img "gigabyte-b760-gaming-x" "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80"

# 4. RAM & SSD
download_img "corsair-vengeance-32gb-ddr5" "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80"
download_img "kingston-fury-beast-16gb-ddr5" "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80"
download_img "samsung-990-pro-2tb-nvme" "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80"
download_img "kingston-nv2-1tb-nvme" "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80"

# 5. GRAPHICS CARDS (GPU)
download_img "asus-dual-rtx-4060-8gb" "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80"
download_img "gigabyte-rtx-4070-super-windforce" "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80"
download_img "asus-tuf-rtx-4070ti-super-16gb" "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80"

# 6. CASE, PSU, COOLING
download_img "montech-air-100-argb-black" "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&auto=format&fit=crop&q=80"
download_img "nzxt-h5-flow-rgb-black" "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
download_img "cooler-master-mwe-650w-bronze" "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&auto=format&fit=crop&q=80"
download_img "corsair-rm850e-850w-gold-atx3" "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
download_img "thermalright-peerless-assassin-120-se" "https://images.unsplash.com/photo-1562975079-88005ebe260b?w=800&auto=format&fit=crop&q=80"
download_img "deepcool-ls720-360mm-liquid-cooler" "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&auto=format&fit=crop&q=80"

# 7. NETWORKING
download_img "mikrotik-rb760igs-hex-s" "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80"
download_img "mikrotik-rb5009ug-s-in" "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
download_img "mikrotik-ccr2004-16g-2s-plus" "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80"
download_img "ubiquiti-unifi-u6-pro" "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80"
download_img "ubiquiti-unifi-u6-plus" "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
download_img "tp-link-archer-ax73" "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80"
download_img "tp-link-tl-sg1024d" "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
download_img "ruijie-reyee-rg-rap2260e" "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80"
download_img "cisco-catalyst-c1000-24t-4g-l" "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
download_img "cisco-cbs350-24p-4g" "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
download_img "commscope-amp-cat6-utp-cable-305m" "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80"
download_img "toten-server-rack-9u-wallmount" "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"

# 8. FIREWALL & SECURITY
download_img "fortinet-fortigate-40f" "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80"
download_img "fortinet-fortigate-60f" "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80"
download_img "fortinet-fortigate-80f" "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80"
download_img "sophos-xgs-116" "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80"

# 9. PRINTERS & POS
download_img "epson-ecotank-l3250-wifi" "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=80"
download_img "canon-pixma-g3010-ink-tank" "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=80"
download_img "hp-laserjet-pro-m404dn" "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=80"
download_img "brother-hl-l2375dw-duplex" "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=80"
download_img "xprinter-xp-420b-thermal-barcode" "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=80"
download_img "sunmi-v2-pro-handheld-pos" "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80"

# 10. BIOMETRIC ATTENDANCE
download_img "zkteco-k40-fingerprint-attendance" "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80"
download_img "zkteco-mb20-face-fingerprint" "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80"
download_img "hikvision-ds-k1t804amf-terminal" "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80"

# 11. PERIPHERALS & POWER
download_img "logitech-mx-master-3s-mouse" "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80"
download_img "logitech-g502-hero-gaming-mouse" "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80"
download_img "keychron-k2-wireless-keyboard" "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80"
download_img "apc-back-ups-pro-1500va-ups" "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"

echo "Download completed. Listing files:"
ls -lh public/images/products | wc -l
