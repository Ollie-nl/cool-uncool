# Cool Uncool Slide Deck – Architectuur Overzicht

## 🏗️ Architectuuroverzicht

De Cool Uncool SlideDeck is een **React-applicatie** gebouwd met **pnpm** als package manager. De applicatie ondersteunt JSON-gedreven slides en maakt gebruik van `react-router-dom` voor client-side routing.

De webapp is ontworpen om eenvoudig uitbreidbaar te zijn en maakt gebruik van JavaScript- en React-functionaliteiten. De slides worden beheerd via statische JSON-bestanden, en gebruikers kunnen eenvoudig tussen maanden wisselen met behulp van een dropdown-selector. Op de root (`/`) start de app automatisch in de meest recente maand.

---

## ⚙️ Technologieën en Bibliotheken

- **React** – Component-gebaseerd front-end framework.
- **React Router** – Voor het beheren van routes (`react-router-dom`).
- **React Swipeable** – Swipe-functionaliteit op mobiele apparaten.
- **React Markdown** – Voor het renderen van Markdown-content in de slides.
- **GH Pages** – Hosting van de productie build via de `docs/` map.
- **pnpm** – Pakketbeheerder voor snelle builds.
- **Prettier** – Code formattering voor consistente stijl.

### Waarom Deze Tools Belangrijk Zijn

- **React** vormt de basis van de componenten en interacties.
- **React Router Dom** maakt dynamische routing mogelijk op basis van URL's.
- **React Swipeable** verbetert de mobiele gebruikerservaring.
- **Prettier** zorgt voor consistente code en helpt technische schulden te minimaliseren.
- **gh-pages** maakt deployment naar GitHub Pages snel en eenvoudig.

---

## 🏗️ Architectuur en Bestandstructuur

### 🧩 Belangrijkste Componenten:

- **`SlideDeck.js`**

  - Laadt de juiste slides op basis van de geselecteerde maand en jaar (via URL).
  - Beheert state voor de huidige slide en maand.
  - Verwerkt navigatie via toetsenbord en swipe-acties.

- **`Slide.js`**

  - Renders individuele slides.
  - Ondersteunt Markdown en YouTube embeds.

- **`MonthSelector.js`**
  - Dropdown component voor het selecteren van een maand om slides te tonen (label: `YYYY Maand`, meest recente bovenaan).

---

### 📦 Deploy Proces:

1. **Build en Deploy**  
   Bij elke `pnpm run deploy` wordt de app gebouwd en wordt de output naar de `docs/` map verplaatst.  
   GitHub Pages leest deze map om de site te hosten.

2. **GitHub Pages SPA Routing via `404.html`**  
   GitHub Pages ondersteunt geen `_redirects` (Netlify-formaat). In plaats daarvan vangt `docs/404.html` alle onbekende paden op, codeert het pad als query parameter, en stuurt door naar `index.html`. Een script in `index.html` herstelt de originele URL zodat React Router de route correct oppikt. Dit maakt directe URL-toegang (bijv. `/slides/2026/06/start`) mogelijk zonder een 404 van GitHub.

---

### 📂 Belangrijke Bestanden

- **`docs/`** – Productie build voor GitHub Pages.
- **`generateAvailableMonths.js`** – Genereert automatisch een lijst van beschikbare JSON slide-bestanden.
- **`public/data/`** – Bevat alle slide JSON-bestanden en `available-months.json` voor de maandselector.

---

## 🚀 Toekomstige Uitbreidingen

- **Server-side slidebeheer**.
- **Inzendingen optie**.
- **Server-side rendering (SSR) voor betere SEO en prestaties**.
- **WebSockets voor real-time updates tijdens presentaties**.

---

## 🚨 Let Op

- **Production Path:** In productie worden afbeeldingen en JSON bestanden geladen vanaf `/cool-uncool/`.
- **Lokaal Path:** Voor localhost wordt `/data/` en `/images/` zonder `/cool-uncool/` gebruikt.

```javascript
const getBasePath = () => {
  return process.env.NODE_ENV === "production" ? "/cool-uncool" : "";
};
```

- **Data-only wijzigingen:** Voor nieuwe slide JSON-bestanden is geen rebuild nodig. Voeg het bestand toe aan zowel `public/data/` als `docs/data/` en update `available-months.json` in beide mappen. Commit en push direct.
- **Broncode wijzigingen:** Gebruik `pnpm run deploy` om de volledige app te herbouwen en te deployen.
