# Cool Uncool Slide Deck – Architectuur

## Stack

De applicatie is een statische React 19-app met React Router 7. Vite 8 verzorgt development, JSX-transformatie met de React-plugin en productiebuilds. Vitest 5 draait componenttests met Testing Library en jsdom. De actuele versies staan in [README.md](README.md); de exacte dependencyboom staat in `pnpm-lock.yaml`.

Gebruik Node 24 LTS (minimaal 24.15.0) en pnpm 12.21.0. `.nvmrc` en `package.json` leggen deze vereisten vast. GitHub Actions gebruikt dezelfde versies. Er is geen TypeScript-buildstap: de actieve React-componenten en componenttests gebruiken `.jsx`.

Create React App is vervangen omdat het is uitgefaseerd. De webpack/Babel-workarounds en ongebruikte DeckDeckGo- en TypeScript-dependencies zijn verwijderd. Afbeeldingen en iframes gebruiken native `loading="lazy"` in plaats van `react-lazyload`, waarvan de peervereisten React 19 niet ondersteunen.

## Entry, routing en basispad

De root-`index.html` is de Vite-entry en laadt `src/index.jsx`. Deze maakt de React-root aan en rendert `App` in StrictMode.

`App.jsx` beheert drie routes:

- `/`: leest `data/available-months.json`, sorteert de maanden aflopend en opent `/slides/:year/:month/start`. Bij een lege of onbereikbare index is december 2024 de fallback.
- `/slides/:year/:month/:slug`: toont `SlideDeck`.
- Alle overige routes: tonen het onbekende pad.

`vite.config.mjs` gebruikt `/` tijdens development en `/cool-uncool/` voor productie. `src/basePath.js` leidt het gedeelde basispad af van `import.meta.env.BASE_URL`. Router, JSON-fetches en lokale Markdown-afbeeldingen gebruiken daardoor hetzelfde pad, ook tijdens de productiepreview. Bij verhuizing naar een andere repositorynaam moet ook de redirect in `public/404.html` worden gecontroleerd.

## Data en componenten

`public/data/slides-YYYY-MM.json` bevat een `slides`-array. `generateAvailableMonths.js` genereert uit de bestandsnamen `public/data/available-months.json`, gesorteerd van nieuw naar oud. Dit script draait vóór development en build.

`SlideDeck.jsx`:

- Leest jaar, maand en slug uit React Router en haalt het maandbestand op.
- Selecteert de slide op slug; ondersteunt ook `slide-N` als terugvalroute.
- Navigeert met pijltjestoetsen en React Swipeable, met `preventScrollOnSwipe` volgens de huidige API.
- Laadt de maandenlijst voor de selector en alle maanden voor een willekeurige slide. De eerste slide van iedere maand wordt bij willekeurige selectie overgeslagen.
- Beheert de themastatus, overgangsanimatie en teller van resterende slides.

`Slide.jsx` rendert headings, Markdown via React Markdown en YouTube-iframes. Lokale Markdown-afbeeldingen met `/images/` krijgen het basispad; externe URL's blijven intact. Native lazy loading voorkomt een aanvullende React-wrapperdependency.

YouTube-URL's worden omgezet naar `youtube-nocookie.com/embed`, met bediening en loopparameters. De component kan een aanwezige `window.YT.Player` gebruiken om afspelen en pauzeren te sturen. De tests controleren embedinstellingen; daadwerkelijk afspelen is afhankelijk van YouTube en het browserbeleid.

`MonthSelector/MonthSelector.jsx` toont Nederlandse maandnamen, bijvoorbeeld `2026 Juli`. `DarkModeToggle/DarkModeToggle.jsx` geeft een klik door aan de themastatus in `SlideDeck`.

De oude top-level `components/`-map bevat losse prototypes en maakt geen deel uit van de entry of productiebuild.

## Build en statische hosting

`pnpm run build` genereert de maandenlijst en bouwt met Vite rechtstreeks naar `docs/`. Vite wist eerst de bestaande output en kopieert de statische bestanden uit `public/`, inclusief `data/`, `images/`, `404.html` en `_redirects`. Een apart kopieerscript en een tijdelijke `build/`-map zijn niet meer nodig.

`pnpm run preview` serveert de build lokaal onder `http://localhost:4173/cool-uncool/`. Gebruik dit om productie-URL's te controleren.

GitHub Pages kent geen SPA-fallback. De redirect in `public/404.html` zet een onbekend pad om naar een querystring op de repositoryroot. Het inline script in `index.html` herstelt vervolgens pad, query en hash voordat React Router start. `_redirects` blijft beschikbaar voor hosts die dat formaat ondersteunen; GitHub Pages gebruikt dit bestand niet.

Er zijn twee bestaande publicatiemogelijkheden:

- De GitHub Actions-workflow test en bouwt elke pull request en push naar `main`. Na een geslaagde push publiceert een aparte job `docs/` naar de root van `gh-pages`, met schrijfrechten alleen in die job. Verouderde buildbestanden worden niet bewaard. Hiervoor moet Pages `gh-pages / (root)` gebruiken.
- Bij Pages vanaf `main /docs` wordt de gecommitte build gepubliceerd. Het lokale `pnpm run deploy` bouwt, commit de output en pusht naar `main`.

De Pages-instelling bepaalt welke output live gaat. Voor datawijzigingen is bij automatische deployment alleen aanpassen van `public/` nodig. Bij direct publiceren vanaf `main/docs` moet ook de overeenkomstige inhoud in `docs/` worden bijgewerkt, via een build of handmatig kopiëren.

## Verificatie en onderhoud

`pnpm test` draait Vitest één keer en sluit af. `pnpm run test:watch` is voor lokale ontwikkeling. `src/test/setup.js` laadt DOM-matchers en ruimt na iedere test componenten, spies en globale mocks op. Netwerkrequests worden in de tests gemockt.

De suite controleert routing naar de nieuwste maand, de fallback, directe slideroutes, toetsenbordnavigatie, maandwisseling, laadfouten, de themaknop, Markdown, afbeeldingspaden en YouTube-embedinstellingen. De CI voert zowel tests als de productiebuild uit, met `pnpm install --frozen-lockfile`.

Prettier gebruikt expliciet de configuratie en ignorelijst in `.config/`. De gegenereerde `docs/`-map wordt overgeslagen. Dependency-updates vereisen controle van de migratiegidsen, tests, build en `pnpm audit`; commit daarna `package.json`, `pnpm-lock.yaml` en eventuele wijzigingen aan pnpm-instellingen en documentatie samen.
