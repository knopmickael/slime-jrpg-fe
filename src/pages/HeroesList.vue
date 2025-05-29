<template>
    <div class="heroes-container">
        <div class="lobby-header" @click="returnToLobby">
            <div>
                <svg fill="#ffcc00" height="35px" width="35px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                    <path d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M205.606,234.394
            c5.858,5.857,5.858,15.355,0,21.213C202.678,258.535,198.839,260,195,260s-7.678-1.464-10.606-4.394l-80-79.998
            c-2.813-2.813-4.394-6.628-4.394-10.606c0-3.978,1.58-7.794,4.394-10.607l80-80.002c5.857-5.858,15.355-5.858,21.213,0
            c5.858,5.857,5.858,15.355,0,21.213l-69.393,69.396L205.606,234.394z" />
                </svg>
            </div>
            <span>Voltar</span>
        </div>
        <div class="heroes-gallery">
            <div v-for="hero in heroes" :key="hero.name" class="hero-thumb"
                :class="{ selected: hero.name === selectedHero?.name }" @click="selectHero(hero)">
                <img :src="hero.profile_picture" :alt="hero.name" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { listHeroes } from "@/api/hero";
import { setLastPickedHero } from "@/api/users";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const heroes = ref([]);
const selectedHero = ref(null);

const fetchHeroes = async () => {
    try {
        heroes.value = await listHeroes();
        if (userStore.lastPickedHero) {
            selectedHero.value = heroes.value.find(hero => hero.name === userStore.lastPickedHero.name) || null;
        }
    } catch (error) {
        console.error("Failed to fetch heroes:", error);
    }
};

const selectHero = (hero) => {
    selectedHero.value = hero;
    userStore.lastPickedHero = hero;
};

const returnToLobby = async () => {
    if (selectedHero.value) {
        try {
            const newToken = await setLastPickedHero(selectedHero.value);
            userStore.renewToken(newToken)
        } catch (error) {
            console.error("Failed to set last picked hero:", error);
        }
    }
    router.push("/lobby");
};

onMounted(() => {
    fetchHeroes();
});
</script>

<style scoped>
.heroes-container {
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

.lobby-header {
    color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.lobby-header span {
    font-size: 1.5rem;
    margin-left: 10px;
}

.heroes-gallery {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-top: 20px;
}

.hero-thumb {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s, transform 0.3s, background 0.3s;
}

.hero-thumb:hover {
    background: rgba(255, 255, 255, 0.2); /* Highlight background on hover */
}

.hero-thumb.selected {
    opacity: 1;
    transform: scale(1.1);
    box-shadow: 0 0 10px #ffcc00;
}

.hero-thumb img {
    width: 100%;
    border-radius: 10px;
}

.hero-thumb p {
    margin-top: 10px;
    color: white;
    font-weight: bold;
}
</style>
