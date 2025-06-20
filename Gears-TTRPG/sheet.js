// ===== Gears Tactics Roll20 Sheet Workers =====

// Utility: Calculate ability modifier from score
const calculateModifier = (score) => Math.floor((score - 10) / 2);

// List of ability scores
const abilities = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];

// Update ability modifiers
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

// Auto-calculate initiative from dexterity_mod
on("change:dexterity_mod", function () {
  getAttrs(["dexterity_mod"], function (values) {
    const init = parseInt(values.dexterity_mod) || 0;
    setAttrs({ initiative: init });
  });
});

// Auto-update weapon attack bonus if using STR or DEX mod
on("change:repeating_weapons:weapon_stat", function (eventInfo) {
  getAttrs(["repeating_weapons_weapon_stat"], function (values) {
    const stat = values.repeating_weapons_weapon_stat;
    const modAttr = `${stat}_mod`;
    getAttrs([modAttr], function (mods) {
      const mod = parseInt(mods[modAttr]) || 0;
      const update = {};
      update["repeating_weapons_weapon_attack"] = mod;
      setAttrs(update);
    });
  });
});

// Optional: Add roll template support and skill calculations
