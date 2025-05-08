<template>
    <div class="form-container">
        <h1>Register</h1>
        <form @submit.prevent="handleRegister">
            <div class="form-group">
                <label for="usermail">E-mail</label>
                <input type="email" id="usermail" v-model="usermail" required />
            </div>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username" required />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <br>
            <button type="submit">Done</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";

const usermail = ref("");
const username = ref("");
const password = ref("");

const handleRegister = () => {
    console.log("Registering Usermail:", usermail.value);
    console.log("Registering Username:", username.value);
    console.log("Registering Password:", password.value);
};
</script>

<style scoped>
/* Reuse the same styles as LoginForm */
.form-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background: linear-gradient(145deg, #1e1e2f, #25253a);
    padding: 30px;
    max-width: 400px;
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5),
        0 -5px 10px rgba(255, 255, 255, 0.1);
    color: #f0f0f0;
    font-family: "Arial", sans-serif;
    box-sizing: border-box;
}

.form-container h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #ffcc00;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    font-weight: bold;
}

.form-group {
    margin-bottom: 15px;
    text-align: left;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    box-sizing: border-box;
}

button {
    background: linear-gradient(145deg, #ff7f50, #ff4500);
    color: white;
    border: none;
    padding: 15px 0;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    width: 100%;
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

button:hover {
    background: linear-gradient(145deg, #ffa07a, #ff6347);
    box-shadow: 0 10px 20px rgba(255, 99, 71, 0.5);
}

button:active {
    transform: translateY(2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
</style>
