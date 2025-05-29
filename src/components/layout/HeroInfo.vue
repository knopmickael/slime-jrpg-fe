<template>
  <div class="hero-info" v-if="hero">
    <div class="hero-details">
      <h1>{{ hero.name }}</h1>
      <h2>{{ hero.type }} Lv.{{ hero.level }}</h2>
    </div>
    <img :src="hero.profile_picture" alt="Hero Profile" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const hero = computed(() => userStore.lastPickedHero);
</script>

<style scoped>
.hero-info {
  position: fixed;
  bottom: 10px;
  right: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 10px 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  background: linear-gradient(145deg, #1e1e2f, #25253a);
}

.hero-info img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 50%;
}

.hero-details {
  text-align: right;
}

.hero-details h1 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #ff4500;
}

.hero-details h2 {
  font-size: 1rem;
  margin-top: 5px;
  color: white;
}
</style>
