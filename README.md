# Cool Uncool Slide Deck

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Ollie-nl/cool-uncool/blob/main/LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()

**Cool Uncool** is een interactieve webapplicatie voor het geven van **Cool-Uncool sessies** tijdens NL DS designers meetups. De focus ligt op front-end technologieën, React, open source ontwikkeling, GitHub-integratie en toegankelijkheid.

---

## 🚀 Functies

- **Intuïtieve Slide Navigatie**: Navigeer door de slides met de pijltjestoetsen (links/rechts, boven/onder).
- **Mobiele Swipe-ondersteuning**: Swipe eenvoudig door de slides op mobiele apparaten.
- **Maandselector**: Wissel tussen maanden met behulp van de maandselector in de footer.
- **Dark Mode**: Schakel tussen licht- en donker thema met één klik.
- **Responsief Ontwerp**: Geoptimaliseerd voor verschillende schermgroottes.
- **Slide Teller**: Bekijk in één oogopslag hoeveel slides er nog volgen.
- **Leesbaare URL's**: Uit de URL is op te maken in welke maand en jaar de sessie is gegeven of wordt gegeven.

---

## 🛠️ Installatie

1. **Clone de repository**:  
   git clone https://github.com/Ollie-nl/cool-uncool.git

2. **Navigeer naar de projectmap**:  
   cd cool-uncool

3. **Installeer afhankelijkheden** (met pnpm):  
   pnpm install

4. **Start de development server**:  
   pnpm start

   Open vervolgens `http://localhost:3000` in je browser.

---

## 🔧 Scripts

- `pnpm start`: Start de development server.
- `pnpm run build`: Bouwt de applicatie voor productie.
- `pnpm test`: Voert tests uit (indien ingesteld).
- `pnpm audit fix`: Probeert bekende kwetsbaarheden te verhelpen.

---

## 📂 Slides via JSON

De slides worden beheerd via maandelijkse JSON-bestanden in `src/data/`. De bestandsnaam volgt het patroon:

```
slides-YYYY-MM.json

```

- **`YYYY`**: Het jaar (bijv. `2024`).
- **`MM`**: De maand (bijv. `12` voor december).

### Voorbeeldbestand: `slides-2024-12.json`

````json
[
  {
    "type": "heading",
    "content": "😎 😩 December",
    "slug": "start"
  },
     {
      "type": "paragraph",
      "content": "![Darth Vader Christmas](/cool-uncool/images/darth-vader-xmas.jpeg) ",
      "title": "Text met plaatje. Luke, I am Father Christmas",
      "icon": "🎄",
      "slug": "star-wars"
    },
  {
    "type": "youtube",
    "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "title": "Movie #1",
    "icon": "💃🏻",
    "slug": "Never forget XcQ"
  }
]

````

### Nieuwe maand toevoegen

1. **Maak een nieuw bestand aan in `src/data/`**:
   Geef het de naam `slides-YYYY-MM.json`, bijvoorbeeld `slides-2024-12.json`.

2. **Voeg je slides toe in JSON-formaat**:
   Zorg ervoor dat elke slide een unieke `slug` heeft.

3. **Herbuild de applicatie**:

   ```bash

   pnpm run build

   ```

4. **De maand wordt automatisch toegevoegd**:
   De maandselector toont nu de nieuwe maand.

---

## 🌍 Deployment via GitHub Pages

1. Stel in package.json het homepage-veld in:

````json
 "homepage": "https://<JOUW-GEBRUIKERSNAAM>.github.io/<REPO-NAAM>"

````

2. Voeg de volgende scripts toe in package.json: 

````json

"scripts": { "predeploy": "pnpm run build", "deploy": "gh-pages -d build" }

````

3. Installeer gh-pages (indien niet aanwezig):

````bash

 pnpm install gh-pages --save-dev  

````

4. Deploy de app:
````bash

pnpm run deploy 

````

   GitHub Pages zal de gh-pages branch gebruiken om je app te hosten.

#### GitHub Pages zal automatisch de gh-pages branch gebruiken om je applicatie te hosten.

---

## 📂 **Projectstructuur**

```
cool-uncool/
├── public/
│   ├── index.html          # HTML root-bestand
│   ├── favicon.ico         # Favicon
│   ├── data
│   │   ├── slides-2024-12.json # Maandelijkse slides
│   │   └── available-months.json # Dynamisch gegenereerde lijst        
│   └── ...                 # Andere statische bestanden
├── src/
│   ├── components/
│   │   ├── SlideDeck.js    # Hoofdcomponent voor slides
│   │   ├── Slide.js        # Component voor individuele slides
│   │   └── DarkModeToggle/ # Dark mode toggle component + CSS
│   ├── data/
│   │   ├── slides-2024-12.json # Maandelijkse slides
│   │   └── available-months.json # Dynamisch gegenereerde lijst
│   ├── styles/
│   │   └── index.css       # Globale stijlen
│   └── ...                 # Overige React-bestanden
├── package.json            # Projectafhankelijkheden en scripts
└── README.md               # Documentatie

```
---

## 📜 **Licentie**

Dit project is gelicentieerd onder de GPL-3.0-licentie. Zie het bestand [LICENSE](https://github.com/Ollie-nl/cool-uncool/blob/main/LICENSE) voor meer informatie.
