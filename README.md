# Little Brain — Παιχνίδια Μυαλού (Kids up to 5–6 Years Old)

A calm, offline-first collection of **17 cognitive & brain-training games** designed specifically for children up to 5–6 years old, available in **Greek (`ΕΛ`)** and **English (`EN`)**, with **Light & Dark mode**, gentle sound synthesis, spoken audio in **Flags of the World**, and zero gamification/stress timers.

## Running Locally on Home LAN / Wi-Fi

1. Double-click `start-lan-server.bat` (or run `powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 8080`).
2. Open in your browser:
   - **On this PC**: `http://localhost:8080`
   - **On phones/tablets on your Home Wi-Fi**: `http://192.168.1.180:8080`
   *(Note: If a tablet/phone on your Wi-Fi cannot reach port 8080, allow inbound TCP port `8080` on Private networks in Windows Defender Firewall).*

## Offline / Airplane Mode Support

- The app registers a Service Worker (`/sw.js`) and Web App Manifest (`/manifest.webmanifest`) that pre-caches every HTML, CSS, JS, and SVG asset locally on the first visit.
- All graphics, SVG country flags, and sound effects are generated locally with zero external network dependencies.
- Spoken prompts in **Flags of the World** use the device's built-in offline Text-to-Speech (`window.speechSynthesis`) in Greek (`el-GR`) and English (`en-US`).
