<template>
    <div class="my-div" :style="mainBgStyle">
        <main>
            <router-view></router-view>
        </main>
        <UserModal v-if="showUserModal" :user="user" @close="toggleUserModal" />
        <AppModal v-if="showAppModal" @close="toggleAppModal" />
        <UserInfo :toggleUserModal="toggleUserModal" />
        <BackHomeButton v-if="$route.path !== '/'" />
    </div>
</template>

<script setup>
import { provide, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import UserModal from "@/components/layout/UserModal.vue";
import AppModal from "@/components/layout/AppModal.vue";
import UserInfo from "@/components/layout/UserInfo.vue";
import BackHomeButton from "@/components/layout/BackHomeButton.vue";

const user = useUserStore().$state;

const showUserModal = ref(false);
const showAppModal = ref(false);

const toggleUserModal = () => {
    showUserModal.value = !showUserModal.value;
};

const toggleAppModal = () => {
    showAppModal.value = !showAppModal.value;
};

provide("toggleAppModal", toggleAppModal);

const mainBgStyle = {
    backgroundImage: "url('/assets/images/menu-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh"
};
</script>

<style>
.my-div {
    /* Remove background-image, background-size, background-position, height from here */
}
</style>