<template>
    <div class="user-modal">
        <div class="modal-content">
            <button class="close-button" @click="$emit('close')">✖</button>
            <h2>Dados do usuário:</h2>
            <div class="user-field">
                <label for="username">Username:</label>
                <div class="input-container">
                    <input type="text" id="username" :value="user.username" readonly />
                    <button class="edit-button">
                        ✏
                    </button>
                </div>
            </div>
            <div class="user-field">
                <label for="usermail">Email:</label>
                <div class="input-container">
                    <input type="text" id="usermail" :value="user.usermail" readonly />
                    <button class="edit-button" disabled>
                        ✏
                    </button>
                </div>
            </div>
            <div class="logout-btn"><span @click="handleLogout(); $emit('close')">Logout</span></div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from "vue-router";

defineProps({
    user: {
        type: Object,
        required: true,
    },
});

const router = useRouter();
const userStore = useUserStore();

const handleLogout = () => {
    userStore.logOut();
    router.push("/");
};
</script>

<style scoped>
.user-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    width: 30vw;
    height: 60vh;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
    text-align: justify;
    animation: fadeIn 0.3s ease-in-out;
    position: relative;
    display: flex;
    flex-direction: column;
}

.modal-content h2 {
    margin-bottom: 20px;
    font-size: 1.8rem;
    color: #333;
}

.modal-content p {
    margin: 10px 0;
    font-size: 1.2rem;
    color: #555;
}

.modal-content button {
    color: white;
    background: #007bff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s ease;
    padding: 5px 10px;
    font-size: 12px;
}

.modal-content button:hover {
    background: #0056b3;
}

.close-button {
    position: absolute;
    top: 30px;
    right: 25px;
    padding: 10px 15px !important;
    background: rgba(0, 0, 0, 0.1) !important;
    color: gray !important;
}

.close-button:hover {
    background: rgba(0, 0, 0, 0.2) !important;
}

.user-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100% !important;
    margin-top: 25px;
}

.user-field label {
    font-size: 1.2rem;
    color: #555;
    flex: 1;
    text-align: left;
}

.input-container {
    display: flex;
    align-items: center;
    flex: 2;
    justify-content: flex-end;
}

.input-container input {
    width: 70%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    margin-right: 10px;
    background-color: #f9f9f9;
    color: #333;
}

.input-container input[readonly] {
    cursor: not-allowed;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.logout-btn {
    position: absolute;
    bottom: 35px;
    left: 0;
    width: 100%;
    cursor: pointer;
    text-decoration: underline;
    display: flex;
    justify-content: center;
}

.logout-btn:hover {
    font-weight: 500;
}
</style>
