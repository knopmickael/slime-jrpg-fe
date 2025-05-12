<template>
    <div v-if="user.loggedIn" class="user-info" @click="toggleUserModal">
        <img :src="user.profilePicture || genericProfilePicture" alt="Profile" />
        <p>{{ user.username }}</p>
    </div>
    <router-link v-else to="/login" class="user-info">
        <img :src="genericProfilePicture" alt="Profile" />
        <p>Por favor, log-in</p>
    </router-link>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";

const user = useUserStore().$state;
const genericProfilePicture = "https://1drv.ms/i/c/4ddf50075e4db0e6/IQSjg14FoQolRrm-tvHe9_0yAXDIbwzxD0ifsnTMxig_ONs?width=1024";

defineProps({
    toggleUserModal: {
        type: Function,
        required: true,
    },
});
</script>

<style scoped>
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
</style>
