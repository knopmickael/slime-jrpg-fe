<template>
    <div class="my-div">
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const cu = ref(0)
</script>

<style>
.my-div {
    background-image: url('@/assets/menu-bg.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    animation: pan-zoom 20s infinite alternate ease-in-out;
}

@keyframes pan-zoom {
    0% {
        background-size: 105%;
        background-position: bottom left;
    }
    25% {
        background-size: 110%;
        background-position: top left;
    }
    50% {
        background-size: 115%;
        background-position: top right;
    }
    75% {
        background-size: 110%;
        background-position: bottom right;
    }
    100% {
        background-size: 105%;
        background-position: bottom left;
    }
}
</style>