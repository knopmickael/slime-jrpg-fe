<template>
    <div class="my-div">
        <main>
            <router-view></router-view>
        </main>
        <UserModal v-if="showUserModal" :user="user" @close="toggleUserModal" />
        <AppModal v-if="showAppModal" @close="toggleAppModal" />
        <UserInfo :toggleUserModal="toggleUserModal" />
        <BackHomeButton v-if="$route.path !== '/'" />
        <HeroInfo />
    </div>
</template>

<script setup>
import { provide, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import UserModal from "@/components/layout/UserModal.vue";
import AppModal from "@/components/layout/AppModal.vue";
import UserInfo from "@/components/layout/UserInfo.vue";
import BackHomeButton from "@/components/layout/BackHomeButton.vue";
import HeroInfo from "@/components/layout/HeroInfo.vue";

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
    background-image: url('https://1drv.ms/i/c/4ddf50075e4db0e6/IQRa6bnWvvJRSYtSzajwOo0FASOADAD6AC66VPC3ewMPWfs?width=1920');
    background-size: cover;
    background-position: center;
    height: 100vh;
}
</style>
