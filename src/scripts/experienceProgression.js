/* ======================================
   EXPERIENCE AND PROGRESSION
   ====================================== */

setup.EXP_THRESHOLD = 100;

setup.addSkillPoint = function (amount = 1) {
    if (!Number.isInteger(amount) || amount <= 0) {
        return false;
    }

    State.variables.character.skillPoints += amount;

    return true;
};

setup.addExperiencePoints = function (amount) {
    if (!Number.isInteger(amount) || amount <= 0) {
        return false;
    }

    const character = State.variables.character;

    character.exp += amount;

    const earnedPoints = Math.floor(
        character.exp / setup.EXP_THRESHOLD
    );

    if (earnedPoints > 0) {
        setup.addSkillPoint(earnedPoints);
        character.exp %= setup.EXP_THRESHOLD;
    }

    return true;
};

setup.upgradeSkill = function (disciplineId, skillId) {
    const character = State.variables.character;
    const discipline = character.disciplines[disciplineId];

    if (
        !discipline ||
        typeof discipline.skills[skillId] !== "number" ||
        character.skillPoints <= 0
    ) {
        return false;
    }

    discipline.skills[skillId] += 1;
    character.skillPoints -= 1;

    return true;
};
