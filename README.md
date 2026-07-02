# Cool Uncool Slide Deck

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Ollie-nl/cool-uncool/blob/main/LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()

**Cool Uncool** is een interactieve webapplicatie voor het geven van **Cool-Uncool sessies** tijdens NL DS designers meetups. De focus ligt op front-end technologieën, React, open source ontwikkeling, GitHub-integratie en toegankelijkheid.

---

## 🚀 Functies

- **Intuïtieve Slide Navigatie**: Navigeer door de slides met de pijltjestoetsen (links/rechts, boven/onder).
- **Mobiele Swipe-ondersteuning**: Swipe eenvoudig door de slides op mobiele apparaten.
- **Maandselector**: Wissel tussen maanden met behulp van de maandselector in de footer.
- **Slimme start**: Op de homepage start je automatisch in de meest recente maand.
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

De slides worden beheerd via maandelijkse JSON-bestanden in `public/data/`. De bestandsnaam volgt het patroon:

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
      "type": "heading",
      "content": "😎 😩 December",
      "slug": "start"
    },
    {
      "type": "paragraph",
      "content": "![Darth Vader Christmas](/images/darth-vader-xmas.jpeg)",
      "title": "Luke, I am Father Christmas",
      "icon": "🎄",
      "slug": "star-wars"
    },
    {
      "type": "youtube",
      "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "title": "Movie #1",
      "icon": "💃🏻",
      "slug": "never-forget-xcq"
    }
  ]
}
```

**Ondersteunde slide types:**

| Type | Verplichte velden | Optioneel |
|------|-------------------|-----------|
| `heading` | `content`, `slug` | `icon` |
| `youtube` | `url`, `slug` | `title`, `icon` |
| `paragraph` | `content`, `slug` | `title`, `icon` |

> `youtube`-slides herhalen altijd automatisch (loop) zodra de video eindigt; dit staat vast in de code en is niet per slide instelbaar. De ingebouwde YouTube-bedieningsbalk (play/pauze, volume, voortgang) wordt gewoon getoond.

### Nieuwe maand toevoegen

1. **Maak een nieuw bestand aan in `public/data/`**:
   Geef het de naam `slides-YYYY-MM.json`, bijvoorbeeld `slides-2025-03.json`.

2. **Kopieer het bestand ook naar `docs/data/`** voor directe live deployment:
   ```bash
   cp public/data/slides-2025-03.json docs/data/slides-2025-03.json
   ```

3. **Voeg de maand toe aan `available-months.json`** in zowel `public/data/` als `docs/data/`:
   ```json
   { "months": ["2025-03", "2025-02", ...] }
   ```

4. **Commit en push** — geen rebuild nodig voor data-only wijzigingen:
   ```bash
   git add public/data/ docs/data/ && git commit -m "feat: slides juni 2025" && git push
   ```

> Gebruik `pnpm run deploy` alleen als je ook broncode hebt gewijzigd. Voor nieuwe JSON-bestanden is een directe push voldoende.

---

## 🌍 Deployment via GitHub Pages (Met DOCS map)

De app wordt automatisch gedeployed naar GitHub Pages.
De output wordt geplaatst in de docs/ map en GitHub Pages haalt de inhoud direct daaruit.

### Deploy Stappen:

1. Maak een productie build en deploy:

```bash
 pnpm run deploy

```

---

2. Website wordt gedeployed op

[Cool Uncool op GitHub](https://ollie-nl.github.io/cool-uncool/)

---

## 🔧 Belangrijke Scripts

- pnpm start (Start de development server op localhost)
- pnpm run build (Maakt een productie build en plaatst deze in de docs/ map)
- pnpm run deploy (Voert een build uit en pusht deze naar de main branch voor GitHub Pages)

---

## 📂 **Projectstructuur**

```
cool-uncool/
├── public/                      # Statische bestanden
│   ├── images/                  # Afbeeldingen voor slides
│   ├── data/                    # JSON bronbestanden voor slides
│   │   ├── available-months.json
│   │   └── slides-YYYY-MM.json
│   ├── 404.html                 # GitHub Pages SPA redirect
│   └── index.html
├── src/                         # React broncode
│   ├── components/
│   ├── styles/
│   └── App.js
├── docs/                        # Productie build (GitHub Pages leest hieruit)
│   ├── data/                    # Gekopieerde JSON bestanden
│   ├── images/                  # Gekopieerde afbeeldingen
│   ├── 404.html                 # GitHub Pages SPA redirect (gekopieerd)
│   └── index.html
├── generateAvailableMonths.js   # Genereert available-months.json bij build
├── copyRedirects.js             # Kopieert _redirects na build
├── package.json
└── README.md
```

---

## ⚠️ Problemen oplossen

- Geen slides beschikba-r: Zorg dat de JSON-bestanden in public/data/ correct zijn.
- Afbeeldingen laden niet op GH Pages: Controleer of de paden naar afbeeldingen beginnen met /cool-uncool/ in productie.
- 404 op GitHub Pages bij directe URL-toegang: Controleer of `docs/404.html` aanwezig is. Dit bestand vangt alle 404's op en stuurt ze door naar `index.html` zodat React Router de route kan afhandelen.

---

## 🏅 Semantic Versioning

We gebruiken Semantic Versioning (SemVer) om releases te beheren:

1.0.0 = Major.Minor.Patch
Major – Brekende veranderingen
Minor – Nieuwe features, backwards-compatible
Patch – Bugfixes en kleine updates

```bash
git tag v1.0.0
git push origin v1.0.0

```

## Commit Message Conventies

```bash
git commit -m "feat: Nieuwe maandelijkse slide selector toegevoegd"
git commit -m "fix: Bug verholpen in Dark Mode toggle"
git commit -m "docs: README bijgewerkt met installatie instructies"
git commit -m "chore: GitHub Actions workflow toegevoegd voor CI"
git commit -m "style: Styling aan gebracht"


```

## Release Draaiend Houden (Tags & Releases)

```bash
git tag -a v1.1.0 -m "Release 1.1.0 - Nieuwe slides en dark mode"
git push origin v1.1.0

```

### Maak releases op GitHub:

1. Ga naar Releases tab in je repo.
2. Klik op Draft new release.
3. Kies een tag (v1.1.0) en beschrijf de wijzigingen.
4. Klik op Publish.

### Versiebeheer in Package.json

#### Verhoog de versie bij elke release:

```json
{
  "version": "1.1.0"
}
```

#### Gebruik de volgende commando's:

```bash

npm version patch  # Kleine bugfix
npm version minor  # Nieuwe feature
npm version major  # Brekende verandering

```

#### Push tags automatisch mee:

```bash

git push --follow-tags

```

---

## 📜 **Licentie**

Dit project is gelicentieerd onder de GPL-3.0-licentie. Zie het bestand [LICENSE](https://github.com/Ollie-nl/cool-uncool/blob/main/LICENSE) voor meer informatie.
