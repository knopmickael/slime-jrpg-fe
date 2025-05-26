<template>
    <div class="lobby-container">
        <h1>Bem vindo, <span>{{ username }}</span>.</h1>
        <ul class="lobby-options">
            <li>
                <button 
                    @click="goToBattle" 
                    :disabled="!userStore.lastPickedHero"
                >
                    Iniciar jornada
                </button>
            </li>
            <li><button @click="goToHeroesList">Selecionar herói</button></li>
            <li><button disabled>Loja</button></li>
            <li><button @click="openAppModal">Configurações</button></li>
        </ul>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();
const username = userStore.username;

const goToHeroesList = () => {
    router.push("/lobby/heroes");
};

const goToBattle = () => {
    router.push("/battle");
};

const toggleAppModal = inject("toggleAppModal");
const openAppModal = () => {
    toggleAppModal();
};

</script>

<style scoped>
.lobby-container {
    position: fixed;
    top: 10px;
    left: 10px;
    bottom: 10px;
    width: 500px;
    background: linear-gradient(145deg, #1e1e2f, #25253a);
    padding: 30px;
    border-radius: 25px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5),
        0 -5px 10px rgba(255, 255, 255, 0.1);
}

.lobby-container h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    color: white;
}

.lobby-container h1 span {
    color: #ffcc00;
}

.lobby-options {
    list-style: none;
    padding: 0;
    margin: 0;
}

.lobby-options li {
    margin: 10px 0;
}

.lobby-options button {
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

.lobby-options button:hover {
    background: linear-gradient(145deg, #ffa07a, #ff6347);
    box-shadow: 0 10px 20px rgba(255, 99, 71, 0.5);
}

.lobby-options button:active {
    transform: translateY(2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
</style>
