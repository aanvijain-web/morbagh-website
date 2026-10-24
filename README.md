# MORBAGH — Wear the Authentic Legacy (Progressive Web App)

**Morbagh** is a family-owned clothing brand based in **Indore, Madhya Pradesh**, with deep cultural roots in **Rajasthan**. Launched online on **11 July 2026**, the brand is created for women who want clothing that feels authentic, comfortable, and easy to wear in everyday life.

The central thought behind Morbagh is solving the everyday question: **“Aaj kya pehnu?”**

---

## 🌸 Progressive Web App (PWA) Features

This website is a full-featured Progressive Web App (PWA):
1. **Web App Manifest (`manifest.json`)**: Configured with `standalone` display mode, `#FAF7F2` brand theme, and complete icon sets.
2. **Service Worker (`sw.js`)**: Fast caching of static assets (HTML, CSS, JS, fonts, images) and offline browsing support.
3. **App Install Prompts**:
   - One-tap install banner on Android, Chrome, and Edge.
   - Built-in iOS Safari "Add to Home Screen" visual guide modal.
4. **Native Mobile App Feel**:
   - Mobile Bottom Navigation Bar (Home, Shop, Bag badge count, Story, App).
   - Safe-area insets for notched iPhones and modern Android devices.
   - Smooth horizontal scrolling for product category filter chips.
   - Live real-time product search bar with keyword matching (e.g., *Kurtis, Farsi, Indigo, Cotton*).

---

## 📁 Project Structure

```
Morbagh Website/
├── index.html            # Main HTML with PWA meta tags, bottom nav, install banner & search bar
├── manifest.json         # Web App Manifest (standalone, theme colors, icons, shortcuts)
├── sw.js                 # Service Worker (offline caching, cache-first/stale-while-revalidate)
├── images/
│   ├── logo.jpeg         # Original Morbagh brand emblem
│   └── icons/            # PWA icons (192x192, 512x512, maskable, apple-touch-icon, favicons)
├── css/
│   └── styles.css        # Heritage design tokens, PWA UI styles, and responsive media queries
├── js/
│   ├── data.js           # Real product data, indicative pricing, and brand story
│   └── app.js            # PWA registration, search engine, filters, quick view modal & cart engine
└── README.md             # Project documentation
```

---

## 📱 How to Test the Morbagh PWA on Your Phone

### Method A: Local Wi-Fi Network (Fastest Local Test)
1. Ensure your phone and computer are connected to the same Wi-Fi network.
2. Find your computer's local IP address (e.g. `192.168.1.X`):
   - Open PowerShell and run: `ipconfig` (look for *IPv4 Address*).
3. Start the local server on your computer:
   ```powershell
   powershell -ExecutionPolicy Bypass -File "C:\Users\Aanvi Jain\Desktop\Morbagh Website\scratch\server.ps1"
   ```
4. Open the browser on your phone and navigate to:
   `http://<YOUR_COMPUTER_IP>:8080/`

### Method B: Testing on Android (Chrome / Edge)
1. Open the website in Google Chrome.
2. An **"Install App"** banner will automatically appear at the bottom, or you can tap the **App** button in the bottom navigation.
3. Tap **Install** -> The Morbagh app will be added to your home screen with its authentic emblem icon and will open in full-screen standalone mode.

### Method C: Testing on iPhone / iPad (Safari)
1. Open the website in Safari.
2. Tap the **Share** icon (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>) at the bottom of the screen.
3. Scroll down and tap **“Add to Home Screen”** ➕.
4. Tap **Add** in the top-right corner.
5. Tap the Morbagh app icon on your iOS home screen — it opens as a standalone native-like app!

### Method D: Deployment (HTTPS)
Deploying this folder to any free static host supporting HTTPS (such as **GitHub Pages**, **Vercel**, **Netlify**, or **Cloudflare Pages**) will activate full PWA installation for all worldwide users immediately.
