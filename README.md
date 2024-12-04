# Cool Uncool Slide Deck

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Ollie-nl/cool-uncool/blob/main/LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()

**Cool Uncool** is een interactieve webapplicatie waarmee ik Cool-Uncool presentatie geef op NL DS designers meetups. Dit project is bedoeld als een demonstratie van front-end technologieën, met aandacht voor React, OpenSource, GitHub en toegankelijkheid.

---

## 🚀 **Features**

- **Slide Deck Navigatie**: Navigeer door slides met pijltjestoetsen (links/rechts, boven/onder).
- **Dark Mode**: Wissel tussen lichte en donkere modus met een interactieve toggle.
- **Responsief Design**: Geoptimaliseerd voor verschillende schermformaten.
- **Gebruiksvriendelijke Teller**: Bekijk hoeveel slides er nog over zijn.

---

## 🛠️ **Installatie**

1. **Clone de repository**:
   ```bash
   git clone https://github.com/Ollie-nl/cool-uncool.git
   ```
2. **Navigeer naar de projectmap**:
   ```bash
   cd cool-uncool
   ```
3. **Installeer afhankelijkheden**:
   ```bash
   npm install
   ```
4. **Start de development server**:
   ```bash
   npm start
   ```
   Open de applicatie in je browser via `http://localhost:3000`.

---

## 🔧 **Scripts**

- `npm start`: Start de development server.
- `npm run build`: Bouwt de applicatie voor productie.
- `npm test`: Voert tests uit (als ze zijn ingesteld).
- `npm audit fix`: Herstelt kwetsbaarheden in dependencies.

---

## 🌟 **Hoe te gebruiken**

1. Start de applicatie en gebruik de pijltjestoetsen om slides te navigeren.
2. Wissel tussen lichte en donkere modus met de toggle in de rechterbovenhoek.
3. Volg de teller onderaan om te zien hoeveel slides er nog zijn.

---

## 📂 **Projectstructuur**

```
cool-uncool/
├── public/
│   ├── index.html          # HTML root file
│   ├── favicon.ico         # Emoji-gebaseerde favicon
│   └── ...                 # Overige publieke bestanden
├── src/
│   ├── components/
│   │   ├── SlideDeck.js    # Hoofdcomponent voor slides
│   │   ├── Slide.js        # Individuele slide component
│   │   └── DarkModeToggle/ # Dark mode toggle component en CSS
│   ├── data/
│   │   └── slides.json     # JSON-data voor slides
│   ├── styles/
│   │   └── index.css       # Globale stijlen
│   └── ...                 # Overige React bestanden
├── package.json            # Project dependencies en scripts
└── README.md               # Documentatie
```

---

## ⚠️ **Bekende Issues**

1. **Kwetsbare dependencies**:
   Gebruik `npm audit fix` om bekende problemen te verhelpen.
2. **Browserondersteuning**:
   Favicon werkt mogelijk niet correct in oudere browsers of Safari (SVG).

---

## 📜 **Licentie**

Dit project is gelicentieerd onder de MIT-licentie. Zie het bestand [GPL-3.0 license](https://github.com/Ollie-nl/cool-uncool?tab=GPL-3.0-1-ov-file#readme) voor meer informatie.

---
