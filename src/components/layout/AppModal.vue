<template>
    <div class="app-modal">
        <div class="modal-content">
            <button class="close-button" @click="$emit('close')">✖</button>
            <h2>Configurações do sistema:</h2>
            <div class="form-group">
                <label>
                    Sound Enabled
                </label>
                <input type="checkbox" v-model="soundEnabled" />
            </div>
            <div class="form-group">
                <label for="difficulty">Difficulty Level</label>
                <select id="difficulty" v-model="difficultyLevel">
                    <option value="easy">Easy</option>
                    <option value="normal">Normal</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAppStore } from "@/stores/appStore";
import { computed } from "vue";

const appStore = useAppStore();
const soundEnabled = computed({
    get: () => appStore.soundEnabled,
    set: (value) => appStore.toggleSound(),
});
const difficultyLevel = computed({
    get: () => appStore.difficultyLevel,
    set: (value) => appStore.setDifficultyLevel(value),
});
</script>

<style scoped>
.app-modal {
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

.form-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100% !important;
    margin-top: 25px;
}

.form-group label {
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
</style>
