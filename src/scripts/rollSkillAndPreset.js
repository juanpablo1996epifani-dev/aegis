setup.applyCharacterPreset = function (id) {
    const preset = setup.characterPresets[id];

    if (!preset) {
        throw new Error(`Unknown preset: ${id}`);
    }

    const character = State.variables.character;

    character.archetype = id;

    for (const disciplineId of [
        "adamant",
        "noetarch",
        "anamnesist"
    ]) {
        character.disciplines[disciplineId].level =
            preset[disciplineId];
    }
};

setup.rollSkill = function (disciplineId, skillId, threshold) {
  const discipline = State.variables.character
    .disciplines[disciplineId];

  const modifier = discipline.skills[skillId];

  const die1 = Math.floor(Math.random() * 6) + 1;
  const die2 = Math.floor(Math.random() * 6) + 1;

  const total = die1 + die2 + modifier;

  return {
    die1,
    die2,
    modifier,
    total,
    threshold,
    success: total >= threshold
  };
};