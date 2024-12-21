const fs = require("fs");
const path = require("path");

// Pad naar de data-map
const dataDir = path.join(__dirname, "src/data");

// Zoek alle JSON-bestanden die `slides-` bevatten
const files = fs
  .readdirSync(dataDir)
  .filter((file) => file.startsWith("slides-") && file.endsWith(".json"));

// Haal de maanden uit de bestandsnamen
const months = files
  .map((file) => file.replace("slides-", "").replace(".json", ""))
  .sort()
  .reverse();

// Schrijf naar een JSON-bestand
const outputPath = path.join(dataDir, "available-months.json");
fs.writeFileSync(outputPath, JSON.stringify({ months }, null, 2));

console.log("Beschikbare maanden gegenereerd:", months);
