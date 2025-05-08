<template>
  <div class="form-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Done</button>
      <p class="register-link">
        New here? <a @click="goToRegister">Please register</a>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = () => {
  console.log("Username:", username.value);
  console.log("Password:", password.value);
};

const goToRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: linear-gradient(145deg, #1e1e2f, #25253a);
  padding: 30px;
  max-width: 400px; /* Added max-width */
  width: 100%; /* Ensure responsiveness */
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5),
    0 -5px 10px rgba(255, 255, 255, 0.1);
  color: #f0f0f0;
  font-family: "Arial", sans-serif;
  box-sizing: border-box; /* Added box-sizing */
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
  width: 100%; /* Ensure input fits within container */
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box; /* Added box-sizing */
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

.register-link {
  margin-top: 15px;
  font-size: 0.9rem;
  color: #f0f0f0;
}

.register-link a {
  color: #ffcc00;
  text-decoration: underline;
  cursor: pointer;
}

.register-link a:hover {
  color: #ffa500;
}
</style>
