import { defineStore } from "pinia";

export const useHeroStore = defineStore("hero", {
  state: () => ({
    userPickedHero: {
      name: "Default Hero",
      type: "Warrior",
      level: 1,
      profilePicture: "https://1drv.ms/i/c/4ddf50075e4db0e6/IQSjg14FoQolRrm-tvHe9_0yAXDIbwzxD0ifsnTMxig_ONs?width=128",
    },
  }),
  actions: {
    setPickedHero(hero) {
      this.userPickedHero = hero;
    },
  },
});
