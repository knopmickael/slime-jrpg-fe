<template>
    <div class="user-modal">
        <div class="modal-content">
            <h2>User Info</h2>
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <button @click="$emit('close')">Close</button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    user: {
        type: Object,
        required: true,
    },
});
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
    width: 40vw;
    height: 70vh;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease-in-out;
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
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    color: white;
    background: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.modal-content button:hover {
    background: #0056b3;
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
