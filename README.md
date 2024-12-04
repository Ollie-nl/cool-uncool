# Cool Uncool Slide Deck

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Ollie-nl/cool-uncool/blob/main/LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()

**Cool Uncool** is een interactieve webapplicatie waarmee ik Cool-Uncool presentaties geef tijdens NL DS designers meetups. Dit project demonstreert front-end technologieën met aandacht voor React, open source, GitHub en toegankelijkheid.

---

## 🚀 **Features**

- **Slide Deck Navigatie**: Navigeer door slides met pijltjestoetsen (links/rechts, boven/onder).
- **Swipe-ondersteuning**: Bedien de slides eenvoudig op mobiele apparaten met swipe-navigatie.
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

## 📂 **Slide JSON-structuur**

De applicatie maakt gebruik van maandelijkse JSON-bestanden om slides te beheren. Deze bestanden staan in de map `src/data/` en moeten het volgende naamgevingspatroon volgen:
```
slides-YYYY-MM.json
```

- **`YYYY`**: Het jaar (bijv. `2024`).
- **`MM`**: De maand (bijv. `12` voor december).

### Voorbeeldbestand: `slides-2024-12.json`
```json
{
  "slides": [
    {
      "id": 1,
      "title": "Welkom bij December 2024",
      "content": "Dit is de eerste slide."
    },
    {
      "id": 2,
      "title": "Slide Twee",
      "content": "Meer inhoud volgt."
    }
  ]
}
```

### Nieuwe maand toevoegen

1. **Maak een nieuw bestand aan in `src/data/`**:
   Geef het de naam `slides-YYYY-MM.json`, bijvoorbeeld `slides-2024-12.json`.

2. **Voeg je slides toe in JSON-formaat**:
   Zorg ervoor dat elke slide een uniek `id`, een `title`, en een `content` heeft.

3. **Herbuild de applicatie**:
   ```bash
   npm run build
   ```

4. **De maand wordt automatisch toegevoegd**:
   De maandselector toont nu de nieuwe maand.

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
│   │   ├── slides-2024-12.json # Voorbeeld van maandelijkse slides
│   │   └── available-months.json # Automatisch gegenereerde lijst
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

Dit project is gelicentieerd onder de GPL-3.0-licentie. Zie het bestand [LICENSE](https://github.com/Ollie-nl/cool-uncool/blob/main/LICENSE) voor meer informatie.

