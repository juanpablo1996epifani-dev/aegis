
setup.activeChecks ??= {};

/* ======================================
  CHAPTER 0 — AWAKENING 
   ====================================== */


setup.activeChecks["awakening.who_am_i"] = {
    id: "awakening.who_am_i",
    type: "RED",
    discipline: "anamnesist",
    skill: "intuition",
    threshold: 10,
    successPassage: "Awakening_WhoSuccess",
    failurePassage: "Awakening_WhoFailure"
};

setup.activeChecks["awakening.what_am_i"] = {
    id: "awakening.what_am_i",
    type: "RED",
    discipline: "noetarch",
    skill: "erudition",
    threshold: 10,
    successPassage: "Awakening.What_Am_I_Success",
    failurePassage: "Awakening.What_Am_I_Failure"
};


setup.activeChecks["awakening.analyze.find_out_more"] = {
    id: "awakening.analyze.find_out_more",
    type: "WHITE",
    discipline: "noetarch",
    skill: "analysis",
    threshold: 12,
    successPassage: "Awakening_Analyze_Success",
    failurePassage: "Awakening_Analyze_Failure"
};
