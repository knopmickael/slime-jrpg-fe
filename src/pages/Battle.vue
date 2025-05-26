<template>
    <div class="battle-container">

        <div class="lifebar-container">
            <img :src="playerHero.profile_picture" class="lifebar-player-logo" />
            <div class="player-lifebar lifebar">
                <div class="bar" :style="{ width: playerHPPercent + '%' }"></div>
            </div>
            <div class="enemy-lifebar lifebar">
                <div class="bar" :style="{ width: enemyHPPercent + '%' }"></div>
            </div>
            <img :src="enemyHero.profile_picture" class="lifebar-player-logo" />
        </div>

        <div class="slimes-row">
            <div class="slime-side player">
                <img :src="playerHero.idle_sprite" class="slime-img" :class="{ animate: playerAttackAnim }" />
                <div v-if="battleEnded && playerHP > 0" class="battle-result">Vitória!</div>
                <div v-if="battleEnded && playerHP <= 0" class="battle-result">Derrota!</div>
            </div>
            <div class="slime-side enemy">
                <img :src="enemyHero.idle_sprite" class="slime-img" :class="{ animate: enemyAttackAnim }" />
            </div>
        </div>

        <div class="battle-joystick">
            <button @click="attackEnemy"
                :disabled="isAnimating || turn !== 'player' || battleEnded">Atacar</button>
            <button @click="defend"
                :disabled="isAnimating || turn !== 'player' || battleEnded">Defender</button>
        </div>

    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";

// Use the user's selected hero as player
const userStore = useUserStore();
const playerHero = userStore.lastPickedHero;

// Hardcoded purple slime as enemy for now
const enemyHero = {
    name: "Purple Slime",
    hp: 70,
    atk: 3,
    def: 5,
    description: "O mais enigmático dos três, o Purple Slime resiste ao tempo com sua incrível vitalidade. Seus ataques são fracos, mas sua defesa e HP o transformam num verdadeiro muro gelatinoso.",
    idle_sprite: "/assets/images/slimes/purple/idle.png",
    attack_sprite: "/assets/images/slimes/purple/attack.png",
    damage_received_sprite: "/assets/images/slimes/purple/damage_received.png",
    celebration_sprite: "/assets/images/slimes/purple/celebration.png",
    profile_picture: "/assets/images/slimes/purple/profile_picture.png",
};

const playerHP = ref(playerHero.hp);
const enemyHP = ref(enemyHero.hp);

const playerHPPercent = computed(() => Math.max(0, (playerHP.value / playerHero.hp) * 100));
const enemyHPPercent = computed(() => Math.max(0, (enemyHP.value / enemyHero.hp) * 100));

const turn = ref("player");
const isAnimating = ref(false);
const playerAttackAnim = ref(false);
const enemyAttackAnim = ref(false);
const battleEnded = ref(false);

function calcDamage(attacker, defender) {
    // attacker.atk - defender.def / 2, minimum 1
    return Math.max(1, Math.round(attacker.atk - defender.def / 2));
}

const attackEnemy = async () => {
    if (battleEnded.value) return;
    isAnimating.value = true;
    playerAttackAnim.value = true;
    await new Promise(r => setTimeout(r, 500));
    const dmg = calcDamage(playerHero, enemyHero);
    enemyHP.value = Math.max(0, enemyHP.value - dmg);
    playerAttackAnim.value = false;
    await new Promise(r => setTimeout(r, 400));
    if (enemyHP.value <= 0) {
        battleEnded.value = true;
        isAnimating.value = false;
        return;
    }
    turn.value = "enemy";
    enemyTurn();
};

const defend = async () => {
    if (battleEnded.value) return;
    isAnimating.value = true;
    // Next enemy attack will do half damage
    turn.value = "enemy";
    await enemyTurn(true);
};

const enemyTurn = async (playerDefending = false) => {
    await new Promise(r => setTimeout(r, 600));
    enemyAttackAnim.value = true;
    await new Promise(r => setTimeout(r, 500));
    let dmg = calcDamage(enemyHero, playerHero);
    if (playerDefending) dmg = Math.floor(dmg / 2);
    playerHP.value = Math.max(0, playerHP.value - dmg);
    enemyAttackAnim.value = false;
    await new Promise(r => setTimeout(r, 400));
    if (playerHP.value <= 0) {
        battleEnded.value = true;
        isAnimating.value = false;
        return;
    }
    turn.value = "player";
    isAnimating.value = false;
};
</script>

<style scoped>
.battle-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-end;
    height: 90vh;
    position: relative;
}

.lifebar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #00000097;
    position: fixed;
    top: 0;
    left: 0;
}

.lifebar-player-logo {
    width: 100px;
    height: 100px;
    margin: 25px;
}

.lifebar {
    width: 100%;
    height: 30px;
    background: #333;
    margin: 15px;
    border-radius: 25px !important;
    position: relative;
    overflow: hidden;
}

.lifebar .bar {
    height: 100%;
    background: linear-gradient(90deg, #ff744d, #ffcc00);
    transition: width 0.3s;
    border-radius: 25px !important;
}

.enemy-lifebar .bar {
    right: 0;
    left: auto;
    position: absolute;
    transform-origin: right;
    background: linear-gradient(270deg, #ff744d, #ffcc00);
}

.player-lifebar .bar {
    left: 0;
    right: auto;
    position: absolute;
    transform-origin: left;
}

.slimes-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; /* Center vertically */
    flex: 1;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 60px 0 60px;
    box-sizing: border-box;
}

.slime-side {
    width: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    box-shadow: none;
    padding: 0;
    border-radius: 0;
    min-height: 0;
    margin-bottom: 0;
    justify-content: flex-end;
}

.slime-side.player {
    align-items: flex-start;
    margin-right: 0;
}

.slime-side.enemy {
    align-items: flex-end;
    margin-left: 0;
}

.slime-img {
    width: 290px;
    height: 290px;
    object-fit: contain;
    transition: transform 0.2s;
    display: block;
    margin-bottom: 0;
    margin-top: 90px !important; /* Add margin on top of each slime sprite */
}

.slime-img.animate {
    animation: attackAnim 0.5s;
}

@keyframes attackAnim {
    0% {
        transform: translateX(0);
    }

    30% {
        transform: translateX(30px) scale(1.1);
    }

    60% {
        transform: translateX(-10px) scale(0.95);
    }

    100% {
        transform: translateX(0);
    }
}

.battle-joystick {
    position: fixed;
    left: 40px;
    bottom: 40px;
    z-index: 10;
    display: flex;
    gap: 20px;
}

.battle-joystick button {
    background: linear-gradient(145deg, #ff7f50, #ff4500);
    color: white;
    border: none;
    padding: 18px 40px;
    border-radius: 14px;
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: bold;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.battle-joystick button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.battle-options {
    display: none; /* Hide original options */
}

.vs-text {
    font-size: 2.5rem;
    color: #ffcc00;
    font-weight: bold;
    margin: 0 30px 40px 30px;
    text-shadow: 0 2px 5px #000;
    align-self: flex-end;
}

.battle-result {
    margin-top: 30px;
    font-size: 2rem;
    color: #32cd32;
    font-weight: bold;
    text-shadow: 0 2px 5px #000;
}

.battle-result:has(+ .battle-result) {
    color: #ff4d4d;
}
</style>
