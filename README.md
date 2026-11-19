# Cool Uncool Slide Deck

[![GitHub license](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)

**Cool Uncool** is een interactieve React-app voor Cool-Uncool sessies tijdens NL DS designers meetups. Slides staan in maandelijkse JSON-bestanden. De app ondersteunt toetsenbordnavigatie, swipen, een maandselector, willekeurige slides, Markdown, YouTube-video's en een licht en donker thema. Op de homepage opent automatisch de meest recente maand.

## Installatie

Gebruik **Node.js 24 LTS, minimaal 24.15.0**, en **pnpm 12.21.0**. De Node-hoofdversie staat in `.nvmrc`; de pnpm-versie staat in `package.json`. Node 26 of nieuwer wordt ook ondersteund.

```bash
git clone https://github.com/Ollie-nl/cool-uncool.git
cd cool-uncool
nvm install
nvm use
npm install --global pnpm@12.21.0
pnpm install --frozen-lockfile
pnpm start
```

Open `http://localhost:3000`. Zonder nvm kun je Node 24 LTS zelf installeren. Gebruik één package manager en commit `pnpm-lock.yaml` bij dependencywijzigingen.

## Technologieën

Gecontroleerd en bijgewerkt op 19 november 2026:

| Onderdeel                              | Versie                  | Gebruik                             |
| -------------------------------------- | ----------------------- | ----------------------------------- |
| React / React DOM                      | 19.3.1                  | Componenten en rendering            |
| React Router DOM                       | 7.18.6                  | Routes per jaar, maand en slide     |
| React Markdown                         | 10.1.0                  | Markdown in slides                  |
| React Swipeable                        | 7.0.2                   | Touch- en muisnavigatie             |
| Vite / React-plugin                    | 8.3.8 / 6.3.0           | Developmentserver en productiebuild |
| Vitest                                 | 5.1.1                   | Tests                               |
| Testing Library React / DOM / jest-dom | 16.3.3 / 10.4.2 / 8.0.0 | Componenttests en DOM-asserties     |
| jsdom                                  | 31.0.1                  | Browseromgeving voor tests          |
| Prettier                               | 3.10.1                  | Codeopmaak                          |
| pnpm                                   | 12.21.0                 | Dependencybeheer                    |

`package.json` bevat de toegestane versieranges; `pnpm-lock.yaml` legt de exacte installatie vast. Create React App en `react-scripts` zijn vervangen door Vite, omdat [Create React App is uitgefaseerd](https://react.dev/blog/2025/02/14/sunsetting-create-react-app). Ongebruikte DeckDeckGo-, TypeScript- en webpack/Babel-dependencies zijn verwijderd. `react-lazyload` is vervangen door native `loading="lazy"` voor afbeeldingen en iframes, zodat er geen dependency met verouderde React-peervereisten nodig is.

## Scripts

| Commando                   | Resultaat                                                             |
| -------------------------- | --------------------------------------------------------------------- |
| `pnpm start`               | Genereert de maandenlijst en start Vite op poort 3000                 |
| `pnpm run build`           | Genereert de maandenlijst en vervangt `docs/` door een productiebuild |
| `pnpm run preview`         | Toont de productiebuild op `http://localhost:4173/cool-uncool/`       |
| `pnpm test`                | Voert alle tests één keer uit, ook geschikt voor CI                   |
| `pnpm run test:watch`      | Voert tests opnieuw uit bij wijzigingen                               |
| `pnpm run generate-months` | Vernieuwt `public/data/available-months.json`                         |
| `pnpm run prettier`        | Formatteert bronbestanden; slaat gegenereerde output over             |
| `pnpm run deploy`          | Bouwt, commit `docs/` en pusht naar `main`                            |

`pnpm run deploy` maakt een commit en pusht daadwerkelijk. Gebruik `pnpm run build` om alleen lokaal te bouwen. De build wist de bestaande inhoud van `docs/`; bewerk bronbestanden daarom in `src/`, `public/` en de root-`index.html`.

## Slides via JSON

Maak bestanden in `public/data/` met de naam `slides-YYYY-MM.json`:

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

| Type        | Verplichte velden | Optioneel       |
| ----------- | ----------------- | --------------- |
| `heading`   | `content`, `slug` | `icon`          |
| `paragraph` | `content`, `slug` | `title`, `icon` |
| `youtube`   | `url`, `slug`     | `title`, `icon` |

Gebruik unieke slugs binnen een maand en `start` voor de eerste slide. Afbeeldingen staan in `public/images/` en krijgen in Markdown een pad als `/images/voorbeeld.png`; de app voegt in productie zelf `/cool-uncool` toe. Externe afbeeldings-URL's blijven behouden.

YouTube-video's worden via `youtube-nocookie.com` ingesloten met zichtbare bediening en automatisch herhalen. Embed-, watch-, shorts- en youtu.be-URL's worden herkend.

### Nieuwe maand toevoegen

1. Maak `public/data/slides-YYYY-MM.json` en voeg eventuele afbeeldingen toe aan `public/images/`.
2. Voer `pnpm run generate-months` uit. De maandenlijst wordt automatisch van nieuw naar oud gesorteerd; `pnpm start` en `pnpm run build` doen dit ook.
3. Controleer de slides met `pnpm start` en bouw met `pnpm run build`.
4. Commit de brondata en, bij hosting vanaf `main/docs`, ook de bijgewerkte `docs/`-map.

Bij uitsluitend datawijzigingen en hosting vanaf `main/docs` kun je een rebuild overslaan: kopieer de gewijzigde JSON-bestanden, de gegenereerde maandenlijst en eventuele afbeeldingen ook naar de overeenkomstige locaties in `docs/`. Bij automatische deployment via de workflow is kopiëren niet nodig: die bouwt vanuit `public/`.

## Tests en dependencies bijwerken

De componenttests controleren de startredirect, directe slideroutes, toetsenbordnavigatie, maandselectie, het lege scherm bij laadfouten, de themaknop, Markdown, afbeeldingen en YouTube-embedinstellingen. Fetches worden gemockt; de tests hebben geen externe video- of netwerkverbinding nodig.

```bash
pnpm outdated
pnpm update --latest
pnpm test
pnpm run build
pnpm audit
```

Controleer bij hoofdversie-updates de migratiedocumentatie en Node-vereisten, pas zo nodig code en documentatie aan en commit het lockbestand. `pnpm-workspace.yaml` bevat een exacte uitzondering voor de recent uitgebrachte `@testing-library/jest-dom@8.0.0`, die bij deze upgrade door pnpm is vastgelegd voor de standaard wachttijd voor nieuwe releases.

## Deployment via GitHub Pages

De productiebuild staat in `docs/` en gebruikt het basispad `/cool-uncool/`.

De bestaande GitHub Actions-workflow `.github/workflows/deploy.yml` test en bouwt pull requests en pushes naar `main`. Bij een geslaagde push naar `main` publiceert de workflow de build naar de root van de branch `gh-pages`. Kies hiervoor in GitHub **Settings → Pages → Deploy from a branch → gh-pages → / (root)**. De workflow gebruikt Node uit `.nvmrc`, pnpm uit `package.json` en een installatie met `--frozen-lockfile`.

Als GitHub Pages in plaats daarvan op **main → /docs** staat ingesteld, wordt de gecommitte `docs/`-map gepubliceerd. Bouw en commit die output bij broncodewijzigingen; het bestaande `pnpm run deploy` helpt daarbij. Kies één van deze Pages-bronnen in de repositoryinstellingen.

Website: [Cool Uncool](https://ollie-nl.github.io/cool-uncool/).

GitHub Pages verwerkt geen Netlify-`_redirects`. `public/404.html` stuurt een directe slideroute door naar de homepage met het pad in de querystring. Het script in de root-`index.html` herstelt die route voordat React Router start. Vite kopieert `404.html`, `_redirects`, data en afbeeldingen automatisch naar `docs/`.

## Projectstructuur

```text
cool-uncool/
├── index.html                   # Vite-entry en herstel van Pages-routes
├── vite.config.mjs              # Build, basispad, developmentserver en Vitest
├── .nvmrc                       # Node 24 LTS
├── .config/                     # Prettier-configuratie
├── .github/workflows/deploy.yml # CI en deployment naar gh-pages
├── public/
│   ├── data/                    # JSON-bronbestanden en maandenlijst
│   ├── images/                  # Afbeeldingen voor slides
│   └── 404.html                 # GitHub Pages SPA-redirect
├── src/
│   ├── App.jsx                  # Router en startredirect
│   ├── index.jsx                # React-root
│   ├── basePath.js              # Gedeeld basispad uit Vite
│   ├── components/              # SlideDeck, Slide, themaknop, maandselector
│   ├── __tests__/               # Componenttests
│   ├── test/setup.js            # DOM-matchers en testopruiming
│   └── styles/
├── docs/                        # Gegenereerde productiebuild
├── generateAvailableMonths.js
├── pnpm-workspace.yaml          # pnpm-instellingen
├── pnpm-lock.yaml
└── package.json
```

Zie [ARCHITECTURE.md](ARCHITECTURE.md) voor de gegevensstroom en buildkeuzes.

## Problemen oplossen

- **Node-versiefout:** voer `nvm install && nvm use` uit en installeer dependencies opnieuw met de vastgelegde pnpm-versie.
- **Geen slides beschikbaar:** controleer of het JSON-bestand bestaat, geldige JSON bevat en een `slides`-array heeft.
- **Nieuwe maand ontbreekt:** voer `pnpm run generate-months` uit en publiceer de vernieuwde maandenlijst.
- **Afbeeldingen of JSON laden niet:** gebruik `pnpm run preview` om de productievariant inclusief `/cool-uncool/` lokaal te controleren. Bestandsnamen en hoofdletters moeten overeenkomen.
- **404 bij een directe slideroute:** controleer of de gepubliceerde build `404.html` bevat en of de Pages-bron op de bedoelde branch en map staat.

## Releases en licentie

Gebruik [Semantic Versioning](https://semver.org/): major voor brekende wijzigingen, minor voor nieuwe functies en patch voor bugfixes. Werk `version` in `package.json` bij voor een release en maak daarna desgewenst een tag en GitHub Release.

Dit project is gelicentieerd onder [GPL-3.0](LICENSE).
