<template>
    <div class="my-div" :style="battleBgStyle">
        <router-view></router-view>
    </div>
</template>

<script setup>
const battleBgStyle = {
    backgroundImage: "url('/assets/images/battle-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    backgroundColor: "gray"
};
</script>

<style>
.my-div {
    /* Remove background-image, background-size, background-position, height, background-color from here */
}
</style>