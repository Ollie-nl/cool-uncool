
## 📄 **ARCHITECTURE.md (Nieuw)**


# Cool Uncool - Architectuur

Dit document beschrijft de architectuur van de **Cool Uncool SlideDeck Webapp**.

---

## 🏗️ Architectuuroverzicht

De Cool Uncool SlideDeck is een **React-applicatie** gebouwd met **pnpm** als package manager. De applicatie ondersteunt JSON-gedreven slides en maakt gebruik van `react-router-dom` voor client-side routing.
De webapp is ontworpen om eenvoudig uitbreidbaar te zijn en maakt gebruik van  JavaScript- en React-functionaliteiten. De slides worden beheerd via statische JSON-bestanden, en gebruikers kunnen eenvoudig tussen maanden wisselen met behulp van een dropdown-selector.

---

## 🚀 Gebruikte Technologieën

De applicatie maakt gebruik van de volgende kerntechnologieën:

### Frontend:
- **React** (`react` en `react-dom`): Frontend component-based framework voor het bouwen van de gebruikersinterface.  
 - **Versie**: `18.3.1`  
- **React Router Dom** (`react-router-dom`): Voor client-side routing en dynamische URL's.  
 - **Versie**: `7.1.0`  
- **React Markdown** (`react-markdown`): Voor het renderen van Markdown binnen React-componenten.  
  - **Versie**: `9.0.1`  
- **React Swipeable** (`react-swipeable`): Voor swipe-ondersteuning op mobiele apparaten.  
  - **Versie**: `7.0.2`  

### Build Tools:
- **React Scripts** (`react-scripts`): Gebruikt voor het builden, starten en testen van de app.  
  - **Versie**: `5.0.1`  
- **TypeScript** (`typescript`): Voor statische type-checking (optioneel, maar aanwezig als dependency).  
  - **Versie**: `3.9.10`  
- **Babel** (`@babel/plugin-proposal-private-property-in-object`): Transpileert moderne JavaScript naar backwards-compatible versies.  
  - **Versie**: `7.21.11`  

### Styling en Optimalisatie:
- **Resolve URL Loader** (`resolve-url-loader`): Helpt bij het correct verwerken van URL's in CSS en SCSS bestanden.  
  - **Versie**: `5.0.0`  
- **Loader Utils** (`loader-utils`): Helpt bij het configureren van Webpack-loaders.  
  - **Versie**: `3.3.1`  

### Deployment:
- **GitHub Pages** (`gh-pages`): Voor eenvoudige deployment van de app naar GitHub Pages.  
  - **Versie**: `6.2.0`  

### Code Formatting:
- **Prettier** (`prettier`): Code formatter voor consistente code-styling.  
  - **Versie**: `3.4.2`  

---

## 📂 Componentenoverzicht

1. **SlideDeck.js**  
   - Hoofdcomponent. Beheert de navigatie tussen slides op basis van `year`, `month` en `slug` uit de URL.

2. **Slide.js**  
   - Rendert individuele slides op basis van hun `type` (`heading`, `youtube`, `paragraph`).

3. **DarkModeToggle.js**  
   - Schakelt tussen light en dark mode.

4. **MonthSelector.js**  
   - Dropdown om te wisselen tussen verschillende maanden (geladen uit `available-months.json`).

---

## 📂 Data Management

- **Slides**: Geleverd via JSON-bestanden (`slides-YYYY-MM.json`).  
- **Maandselector**: Dynamisch gegenereerd uit `available-months.json`.  
- **Routing**:  /slides/:year/:month/:slug

---


## 🛠️ Build- en Deployproces

- **Builden voor productie**:  

```bash

pnpm run build

```

## 🌍 Deployment en Hosting

De applicatie wordt gedeployed naar GitHub Pages door gebruik te maken van het gh-pages pakket.
Het script pnpm run deploy zorgt voor het builden van de applicatie en pushen van de build/ map naar de gh-pages branch.

## 🔧 Ontwikkelomgeving en Configuratie

- Pakketbeheer: pnpm wordt gebruikt om pakketten te beheren en dependency-resolutie te optimaliseren.
- Browserversies: De applicatie ondersteunt de laatste versies van Chrome, Firefox en Safari.
- Configuratie in browserslist binnen package.json.
 - Configuratie in browserslist binnen package.json.


---

## 🚀 Toekomstige Uitbreidingen

- **Server-side slidebeheer**.  
- **Inzendingen optie**.  
- **Alle sessies teogevoegd**.
- **Versiebeheer**.
- **Server-side rendering (SSR) voor betere SEO en prestaties**.  
- **WebSockets voor real-time updates tijdens presentaties**.  
- **CI/CD pipelines om automatisch te testen en te deployen bij iedere commit**.  
- **More...**.  

### Waarom Deze Tools Belangrijk Zijn
- **React** vormt de basis van de componenten en interacties.  
- **React Router Dom** maakt dynamische routing mogelijk op basis van URL's.  
- **React Swipeable** verbetert de mobiele gebruikerservaring.  
- **Prettier** zorgt voor consistente code en helpt technische schulden te minimaliseren.  
- **gh-pages** maakt deployment naar GitHub Pages snel en eenvoudig.  
