<template>
  <button class="back-home" @click="goHome">🏠</button>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
.back-home {
  position: fixed;
  bottom: 10px;
  left: 10px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 10px 15px;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  border: none;
  color: black;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.back-home:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
}
</style>
