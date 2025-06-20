// Utility to calculate modifiers
const calculateModifier = (score) => Math.floor((score - 10) / 2);

// Update all ability modifiers and initiative
on("change:strength change:dexterity change:constitution change:intelligence change:wisdom change:charisma", () => {
  getAttrs(["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"], (values) => {
    const updates = {
      strength_mod: calculateModifier(parseInt(values.strength) || 0),
      dexterity_mod: calculateModifier(parseInt(values.dexterity) || 0),
      constitution_mod: calculateModifier(parseInt(values.constitution) || 0),
      intelligence_mod: calculateModifier(parseInt(values.intelligence) || 0),
      wisdom_mod: calculateModifier(parseInt(values.wisdom) || 0),
      charisma_mod: calculateModifier(parseInt(values.charisma) || 0),
      initiative: calculateModifier(parseInt(values.dexterity) || 0),
    };
    setAttrs(updates);
  });
});

// Update weapon attack bonus based on chosen stat
on("change:repeating_weapons:weapon_stat", (eventInfo) => {
  const statAttr = eventInfo.newValue;

  // Get the relevant modifier for selected stat
  const rowPrefix = eventInfo.sourceAttribute.replace(/weapon_stat$/, "");
  getAttrs([statAttr + "_mod"], (modValues) => {
    const mod = modValues[statAttr + "_mod"] || "0";
    const update = {};
    update[`${rowPrefix}weapon_attack`] = mod;
    setAttrs(update);
  });
});
