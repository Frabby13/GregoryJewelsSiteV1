// Generates the 21 internal pages (7 types x 3 concepts) from shared content + per-concept templates.
// Zero dependencies:  node scripts/build-pages.mjs
const mods = ['atelier', 'cinema', 'maison'];
let total = 0;
for (const m of mods) {
  let mod;
  try { mod = await import(`./site/${m}.mjs`); } catch (e) { if (e.code === 'ERR_MODULE_NOT_FOUND' && String(e.message).includes(m + '.mjs')) { console.log(`skip ${m} (not written yet)`); continue; } throw e; }
  const files = mod.build();
  total += files.length;
  console.log(`${m}: ${files.length} pages`);
}
console.log(`total: ${total}`);
