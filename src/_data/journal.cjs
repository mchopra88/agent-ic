const fs = require('fs');
const path = require('path');

// Journal is now rendered client-side via JavaScript.
// This data file just returns the cache for any Nunjucks templates
// that still reference {{ journal }}. It does NOT overwrite the cache.
// The cache is managed exclusively by .github/scripts/fetch-journal.mjs.

module.exports = function() {
  const cachePath = path.resolve(__dirname, 'journal-cache.json');
  try {
    if (fs.existsSync(cachePath)) {
      return JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    }
  } catch(e) {}
  return [];
};
