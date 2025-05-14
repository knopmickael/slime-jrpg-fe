<template>
    <div class="hero-sprite" v-if="heroSprite">
        <img :src="heroSprite" alt="Hero Sprite" />
    </div>
    <div class="hero-description-box" v-if="hero">
        <p class="hero-name">{{ hero.name }}</p>
        <p class="hero-description">{{ hero.description }}</p>
        <div class="hero-stats">
            <div class="stat" style="margin-right: 15px;">
                <span class="icon">❤️</span>
                <p>{{ hero.hp }}</p>
            </div>
            <div class="stat">
                <span class="icon">⚔️</span>
                <p>{{ hero.atk }}</p>
            </div>
            <div class="stat">
                <span class="icon">🛡️</span>
                <p>{{ hero.def }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const heroSprite = computed(() => userStore.lastPickedHero?.idle_sprite || null);
const hero = computed(() => userStore.lastPickedHero);
</script>

<style scoped>
.hero-sprite {
    position: fixed;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    height: 70vh;
    /* 70% of the screen height */
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero-sprite img {
    height: 125%;
    object-fit: contain;
    animation: fly 2s infinite ease-in-out;
    /* Add flying animation */
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
    /* Add drop-shadow */
    border-radius: 10px;
    /* Optional: Add rounded corners */
}

.hero-description-box {
    position: fixed;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    height: 500px;
    width: 350px;
    background: linear-gradient(145deg, #1e1e2f, #25253a);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    color: white;
    font-family: "Arial", sans-serif;
    display: flex;
    flex-direction: column;
}

.hero-name {
    font-size: 1.8rem;
    font-weight: bold;
    color: #ffcc00;
    text-align: center;
    margin-bottom: 10px;
}

.hero-description {
    font-size: 1.25rem;
    line-height: normal;
    text-align: justify;
    margin-top: 15px;
}

.hero-stats {
    position: absolute;
    bottom: 25px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.stat {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
}

.stat .icon {
    font-size: 2.5rem;
}

@keyframes fly {

    0%,
    100% {
        transform: translateY(-10px);
        /* Move up */
    }

    50% {
        transform: translateY(10px);
        /* Move down */
    }
}
</style>
