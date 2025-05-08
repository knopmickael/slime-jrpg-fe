<template>
  <div class="form-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" :disabled="isLoading" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" :disabled="isLoading" required />
      </div>
      <br />
      <button type="submit" :disabled="isLoading">
        <span v-if="isLoading" class="spinner"></span>
        <span v-else>Login</span>
      </button>
      <p class="register-link">
        New here? <a @click="goToRegister">Please register</a>
      </p>
    </form>
  </div>
  <div v-if="showSuccessMessage" class="success-balloon">
    Logged in successfully!
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "@/api/auth";

const username = ref("knopmickael");
const password = ref("foobar");
const isLoading = ref(false);
const showSuccessMessage = ref(false);
const router = useRouter();

const goToRegister = () => {
  router.push("/register");
};

const handleLogin = async () => {
  isLoading.value = true;
  const payload = {
    username: username.value,
    password: password.value,
  };

  try {
    const response = await loginUser(payload);
    console.log("User logged in successfully:", response);
    showSuccessMessage.value = true;

    setTimeout(() => {
      router.push("/");
    }, 3000);
  } catch (error) {
    console.error("Failed to log in user:", error);
  } finally {
    isLoading.value = false;
  }
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
  max-width: 400px;
  /* Added max-width */
  width: 100%;
  /* Ensure responsiveness */
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5),
    0 -5px 10px rgba(255, 255, 255, 0.1);
  color: #f0f0f0;
  font-family: "Arial", sans-serif;
  box-sizing: border-box;
  /* Added box-sizing */
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
  /* Ensure input fits within container */
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  /* Added box-sizing */
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

.spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #ffcc00;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 0.6s linear infinite;
  display: inline-block;
  margin-right: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.success-balloon {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: #32cd32;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 128, 0, 0.3);
  font-size: 1rem;
  font-weight: bold;
}
</style>
