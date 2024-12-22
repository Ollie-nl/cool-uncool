const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "public/_redirects");
const destination = path.join(__dirname, "docs/_redirects");

// Controleer of _redirects bestaat in public/
if (fs.existsSync(source)) {
  fs.copyFileSync(source, destination);
  console.log("🔄 _redirects gekopieerd naar docs/ map.");
} else {
  console.log("⚠️ _redirects niet gevonden in public/ map.");
}
