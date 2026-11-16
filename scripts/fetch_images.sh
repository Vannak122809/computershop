#!/bin/bash

categories=(
  "thinkpad"
  "dell-laptop"
  "gaming-laptop"
  "macbook-pro"
  "asus-laptop"
  "computer-monitor"
  "gaming-monitor"
  "cpu-processor"
  "amd-ryzen"
  "motherboard"
  "ram-memory"
  "nvme-ssd"
  "graphics-card"
  "computer-case"
  "cpu-cooler"
  "wifi-router"
  "ethernet-switch"
  "access-point"
  "cyber-security"
  "laser-printer"
  "mechanical-keyboard"
  "computer-mouse"
)

mkdir -p scripts/tmp_urls
for cat in "${categories[@]}"; do
  curl -s "https://unsplash.com/s/photos/${cat}" | grep -o 'https://images.unsplash.com/photo-[a-zA-Z0-9-]*' | sort -u > "scripts/tmp_urls/${cat}.txt" &
done
wait
echo "All categories fetched in parallel"
ls -la scripts/tmp_urls/
