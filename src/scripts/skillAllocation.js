
/* ======================================
   SKILL ALLOCATION
   ====================================== */

setup.resetSkillDraft = function () {
    State.temporary.skillDraft = {};
};

setup.getSkillDraft = function (disciplineId, skillId) {
    const key = `${disciplineId}.${skillId}`;
    return State.temporary.skillDraft?.[key] || 0;
};

setup.getSkillDraftTotal = function () {
    return Object.values(
        State.temporary.skillDraft || {}
    ).reduce((sum, value) => sum + value, 0);
};

setup.getRemainingSkillPoints = function () {
    return State.variables.character.skillInc
        - setup.getSkillDraftTotal();
};

setup.stageSkillUpgrade = function (
    disciplineId,
    skillId,
    change
) {
    if (change !== 1 && change !== -1) {
        return false;
    }

    const character = State.variables.character;
    const skill = character.disciplines?.[disciplineId]
        ?.skills?.[skillId];

    if (typeof skill !== "number") {
        return false;
    }

    const draft = State.temporary.skillDraft || {};
    const key = `${disciplineId}.${skillId}`;
    const current = draft[key] || 0;

    if (change > 0 &&
        setup.getRemainingSkillPoints() <= 0) {
        return false;
    }

    if (current + change < 0) {
        return false;
    }

    draft[key] = current + change;

    if (draft[key] === 0) {
        delete draft[key];
    }

    State.temporary.skillDraft = draft;
    return true;
};

setup.confirmSkillDraft = function () {
    const character = State.variables.character;
    const draft = State.temporary.skillDraft || {};
    const entries = Object.entries(draft);
    const total = setup.getSkillDraftTotal();

    if (total <= 0 || total > character.skillInc) {
        return false;
    }

    // Validate everything before spending anything.
    for (const [key, amount] of entries) {
        const [disciplineId, skillId] = key.split(".");
        const skill = character.disciplines?.[disciplineId]
            ?.skills?.[skillId];

        if (!Number.isInteger(amount) ||
            amount <= 0 ||
            typeof skill !== "number") {
            return false;
        }
    }

    // Commit all upgrades.
    for (const [key, amount] of entries) {
        const [disciplineId, skillId] = key.split(".");

        character.disciplines[disciplineId]
            .skills[skillId] += amount;
    }

    character.skillInc -= total;
    setup.resetSkillDraft();

    return true;
};