
/* ======================================
   ACTIVE CHECKS
   ====================================== */


setup.canRetryWhiteCheck = function (checkId) {
    const check = setup.activeChecks[checkId];
    const previous = State.variables.checks?.[checkId];

    if (!check || check.type !== "WHITE") {
        return false;
    }

    if (!previous || previous.success) {
        return false;
    }

    const discipline =
        State.variables.character.disciplines[check.discipline];

    const currentSkill = discipline?.skills?.[check.skill];

    return (
        typeof currentSkill === "number" &&
        currentSkill > previous.skillAtAttempt
    );
};

setup.resolveActiveCheck = function (checkId) {
    const check = setup.activeChecks[checkId];

    if (!check) {
        throw new Error(`Unknown check: ${checkId}`);
    }

    const state = State.variables;
    const previous = state.checks[checkId];

    // Completed checks and RED checks never reroll.
    if (previous) {
        if (check.type === "RED" || previous.success) {
            return previous;
        }

        // A failed WHITE check requires a retry unlock.
        if (!setup.canRetryWhiteCheck(checkId)) {
            return previous;
        }
    }

    const characterDiscipline =
        state.character.disciplines[check.discipline];

    if (!characterDiscipline) {
        throw new Error(`Unknown discipline: ${check.discipline}`);
    }

    const discipline = characterDiscipline.level;
    const skill = characterDiscipline.skills[check.skill];

    if (typeof discipline !== "number" ||
        typeof skill !== "number") {
        throw new Error(`Invalid skill: ${check.skill}`);
    }

    const dice = [random(1, 6), random(1, 6)];

    const total = dice[0] + dice[1] + discipline + skill;

    const result = {
        id: checkId,
        type: check.type,
        dice,
        discipline,
        skill,
        skillAtAttempt: skill,
        total,
        threshold: check.threshold,
        success: total >= check.threshold,
        attempts: (previous?.attempts || 0) + 1
    };

    state.checks[checkId] = result;

    return result;
};