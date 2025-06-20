const abilities = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];

abilities.forEach(attr => {
  on(`change:${attr}`, () => {
    getAttrs([attr], values => {
      const score = parseInt(values[attr]) || 10;
      const mod = Math.floor((score - 10) / 2);
      setAttrs({
        [`${attr}_mod`]: mod >= 0 ? `+${mod}` : `${mod}`
      });
    });
  });
});
