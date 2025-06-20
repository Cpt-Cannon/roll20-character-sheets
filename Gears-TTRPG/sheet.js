// ===== Gears Tactics Roll20 Sheet Workers =====

// Utility: Calculate ability modifier from score
const calculateModifier = (score) => Math.floor((score - 10) / 2);

// List of ability scores to track
const abilities = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];

// Auto-calculate modifiers when abilities change
abilities.forEach((ability) => {
  on(`change:${ability}`, function () {
    getAttrs([ability], function (values) {
      const score = parseInt(values[ability]) || 0;
      const mod = calculateModifier(score);
      const update = {};
      update[`${ability}_mod`] = mod;
      setAttrs(update);
    });
  });
});

// Example: Could auto-fill attack bonus using DEX or STR later
// on("change:weapon_name", function () {
//   // Future enhancement for default values
// });
