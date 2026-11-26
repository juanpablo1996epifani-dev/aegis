setup.openPanel = function (title, passageName) {
    if (!Story.has(passageName)) {
        console.error("UI passage not found:", passageName);
        return;
    }

    if (passageName === "UI_Skills") {
        setup.resetSkillDraft();
    }

    Dialog
        .create(title, "aegis-panel")
        .wikiPassage(passageName)
        .open();
};