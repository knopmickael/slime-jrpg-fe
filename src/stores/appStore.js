import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    soundEnabled: false,
    difficultyLevel: "normal",
  }),
  actions: {
    toggleSound() {
      this.soundEnabled = !this.soundEnabled;
    },
    setDifficultyLevel(level) {
      if (!["easy", "normal", "hard"].includes(level)) return;
      this.difficultyLevel = level;
    },
  },
});
