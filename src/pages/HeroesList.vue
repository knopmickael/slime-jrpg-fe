<template>
    <div class="lobby-container">
        <div class="lobby-header" @click="returnToLobby">
            <div>
                <svg fill="#ffcc00" height="35px" width="35px" version="1.1" id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330"
                    xml:space="preserve">
                    <path id="XMLID_6_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M205.606,234.394
	c5.858,5.857,5.858,15.355,0,21.213C202.678,258.535,198.839,260,195,260s-7.678-1.464-10.606-4.394l-80-79.998
	c-2.813-2.813-4.394-6.628-4.394-10.606c0-3.978,1.58-7.794,4.394-10.607l80-80.002c5.857-5.858,15.355-5.858,21.213,0
	c5.858,5.857,5.858,15.355,0,21.213l-69.393,69.396L205.606,234.394z" />
                </svg>
            </div>
            <span>Voltar</span>
        </div>
        <div class="heroes-list">
            Heroes list here...
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();
const username = userStore.username;

const returnToLobby = () => {
    router.push("/lobby");
};

</script>

<style scoped>
.lobby-container {
    position: fixed;
    top: 10px;
    left: 10px;
    bottom: 10px;
    width: 500px;
    background: linear-gradient(145deg, #1e1e2f, #25253a);
    padding: 30px;
    border-radius: 25px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5),
        0 -5px 10px rgba(255, 255, 255, 0.1);
}

.lobby-header {
    color: white;
    display: flex;
    align-items: center;
}

.lobby-header > * {
    cursor: pointer;
}

.lobby-header span {
    font-size: 2rem !important;
    margin-left: 10px;
}

.heroes-list {
    color: white;
    margin-top: 25px;
}
</style>
