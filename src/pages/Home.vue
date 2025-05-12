<template>
  <div class="menu-container">
    <h1>Slime JRPG</h1>
    <ul class="menu-options">
      <li><button @click="startNewGame" :disabled="isUserAuthenticated">Novo Jogo</button></li>
      <li><button @click="continueGame" :disabled="!isUserAuthenticated">Continuar</button></li>
      <li><button @click="openConfig">Configurações</button></li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, inject } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const isUserAuthenticated = ref(false);
const toggleAppModal = inject("toggleAppModal");

onMounted(() => {
  isUserAuthenticated.value = userStore.loggedIn;
});

watch(() => userStore.loggedIn, (loggedIn) => {
  isUserAuthenticated.value = loggedIn;
});

const startNewGame = () => {
  router.push("/login");
};

const continueGame = () => {
  router.push("/lobby");
};

const openConfig = () => {
  toggleAppModal();
};
</script>

<style scoped>
.menu-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: linear-gradient(145deg, #1e1e2f, #25253a);
  padding: 30px;
  min-width: 350px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5),
    0 -5px 10px rgba(255, 255, 255, 0.1);
  color: #f0f0f0;
  font-family: "Arial", sans-serif;
}

.menu-container h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffcc00;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.menu-options {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-options li {
  margin: 10px 0;
}

.menu-options button {
  background: linear-gradient(145deg, #ff7f50, #ff4500);
  color: white;
  border: none;
  padding: 15px 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.menu-options button:hover {
  background: linear-gradient(145deg, #ffa07a, #ff6347);
  box-shadow: 0 10px 20px rgba(255, 99, 71, 0.5);
}

.menu-options button:active {
  transform: translateY(2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
</style>