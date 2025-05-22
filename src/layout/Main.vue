<template>
    <div class="my-div">
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
</script>

<style>
.my-div {
    background-image: url('../../public/assets/images/menu-bg.jpg');
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