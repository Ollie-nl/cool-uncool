
# Cool Uncool Slide Deck – Architectuur Overzicht


## 🏗️ Architectuuroverzicht

De Cool Uncool SlideDeck is een **React-applicatie** gebouwd met **pnpm** als package manager. De applicatie ondersteunt JSON-gedreven slides en maakt gebruik van `react-router-dom` voor client-side routing.

De webapp is ontworpen om eenvoudig uitbreidbaar te zijn en maakt gebruik van  JavaScript- en React-functionaliteiten. De slides worden beheerd via statische JSON-bestanden, en gebruikers kunnen eenvoudig tussen maanden wisselen met behulp van een dropdown-selector.

---

## ⚙️ Technologieën en Bibliotheken

- **React** – Component-gebaseerd front-end framework.  
- **React Router** – Voor het beheren van routes (`react-router-dom`).  
- **React Swipeable** – Swipe-functionaliteit op mobiele apparaten.  
- **React Markdown** – Voor het renderen van Markdown-content in de slides.  
- **GH Pages** – Hosting van de productie build via de `docs/` map.  
- **pnpm** – Pakketbeheerder voor snelle builds.  
- **Prettier** – Code formattering voor consistente stijl.  

---

## 🏗️ Architectuur en Bestandstructuur

### Belangrijkste Componenten:
- **`SlideDeck.js`**  
  - Laadt de juiste slides op basis van de geselecteerde maand en jaar (via URL).  
  - Beheert state voor de huidige slide en maand.  
  - Verwerkt navigatie via toetsenbord en swipe-acties.  

- **`Slide.js`**  
  - Renders individuele slides.  
  - Ondersteunt Markdown en YouTube embeds.  

- **`MonthSelector.js`**  
  - Dropdown component voor het selecteren van een maand om slides te tonen.  

---

### Deploy Proces:
1. **Build en Deploy**  
   Bij elke `pnpm run deploy` wordt de app gebouwd en wordt de output naar de `docs/` map verplaatst.  
   GitHub Pages leest deze map om de site te hosten.  

2. **_redirects Bestanden**  
   Dit bestand zorgt ervoor dat interne routes (bijvoorbeeld `/slides/2024/12/start`) correct worden afgehandeld als de gebruiker direct naar een URL navigeert.  

---

### 📂 Belangrijke Bestanden

- **`docs/`** – Productie build voor GitHub Pages.  
- **`generateAvailableMonths.js`** – Genereert automatisch een lijst van beschikbare JSON slide-bestanden.  
- **`public/data/`** – Bevat alle slide JSON-bestanden en wordt direct gelezen door de applicatie.  

---

## 🚀 Toekomstige Uitbreidingen

- **Server-side slidebeheer**.  
- **Inzendingen optie**.  
- **Alle sessies toegevoegd**.
- **Versiebeheer**.
- **Server-side rendering (SSR) voor betere SEO en prestaties**.  
- **WebSockets voor real-time updates tijdens presentaties**.  
- **CI/CD pipelines om automatisch te testen en te deployen bij iedere commit**.  
- **More, more, mmmmoooore...**.  

### Waarom Deze Tools Belangrijk Zijn
- **React** vormt de basis van de componenten en interacties.  
- **React Router Dom** maakt dynamische routing mogelijk op basis van URL's.  
- **React Swipeable** verbetert de mobiele gebruikerservaring.  
- **Prettier** zorgt voor consistente code en helpt technische schulden te minimaliseren.  
- **gh-pages** maakt deployment naar GitHub Pages snel en eenvoudig.  


---

## 🚨 Let Op
- **Production Path:** In productie worden afbeeldingen en JSON bestanden geladen vanaf `/cool-uncool/`.  
- **Lokaal Path:** Voor localhost wordt `/data/` en `/images/` zonder `/cool-uncool/` gebruikt.  

```javascript
const getBasePath = () => {
  return process.env.NODE_ENV === "production" ? "/cool-uncool" : "";
};
```
