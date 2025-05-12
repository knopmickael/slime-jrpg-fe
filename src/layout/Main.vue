<template>
    <div class="my-div">
        <main>
            <router-view></router-view>
        </main>
        <UserModal v-if="showUserModal" :user="user" @close="toggleUserModal" />
        <AppModal v-if="showAppModal" @close="toggleAppModal" />
        <router-link
            v-if="!user.loggedIn"
            to="/login"
            class="user-info"
        >
            <img :src="genericProfilePicture" alt="Profile" />
            <p>Por favor, log-in</p>
        </router-link>
        <div
            v-else
            class="user-info"
            @click="toggleUserModal"
        >
            <img :src="user.profilePicture" alt="Profile" />
            <p>{{ user.username }}</p>
        </div>
        <button v-if="$route.path !== '/'" class="back-home" @click="goHome">🏠</button>
    </div>
</template>

<script setup>
import { provide, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import UserModal from "@/components/layout/UserModal.vue";
import AppModal from "@/components/layout/AppModal.vue";

const router = useRouter();
const user = useUserStore().$state;

const genericProfilePicture = "https://1drv.ms/i/c/4ddf50075e4db0e6/IQSjg14FoQolRrm-tvHe9_0yAXDIbwzxD0ifsnTMxig_ONs?width=1024";

const showUserModal = ref(false);
const showAppModal = ref(false);

const toggleUserModal = () => {
  showUserModal.value = !showUserModal.value;
};

const toggleAppModal = () => {
  showAppModal.value = !showAppModal.value;
};

provide("toggleAppModal", toggleAppModal);

const goHome = () => {
  router.push("/");
};
</script>

<style>
.my-div {
    background-image: url('https://1drv.ms/i/c/4ddf50075e4db0e6/IQRmCJxFE0XXRp3H9G4WZogYAQK4SkiYqwgZHOR4F5vJctM?width=1024');
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

.user-info {
    position: fixed;
    top: 10px;
    right: 10px;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    padding: 10px 15px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    font-weight: 500;
    text-decoration: none;
    color: black;
    cursor: pointer;
}

.user-info:hover {
    text-decoration: underline;
}

.user-info img {
    width: 25px;
    height: 25px;
    margin-right: 10px;
}

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