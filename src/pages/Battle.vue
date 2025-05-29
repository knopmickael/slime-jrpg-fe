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
                <div v-if="playerDamageText" class="damage-float player-damage">{{ playerDamageText }}</div>
                <img :src="playerSprite" class="slime-img" :class="{ animate: playerAttackAnim }" />
            </div>
            <div class="slime-side enemy">
                <div v-if="enemyDamageText" class="damage-float enemy-damage">{{ enemyDamageText }}</div>
                <img :src="enemySprite" class="slime-img" :class="['slime-img-enemy', { animate: enemyAttackAnim }]"
                    style="transform: scaleX(-1);" />
            </div>
        </div>

        <div class="battle-joystick">
            <button @click="attackEnemy" :disabled="isAnimating || turn !== 'player' || battleEnded">Atacar</button>
            <button class="defend-btn" @click="defend"
                :disabled="isAnimating || turn !== 'player' || battleEnded">Defender</button>
            <button class="abort-btn" @click="abort"
                :disabled="isAnimating || turn !== 'player' || battleEnded">Abortar</button>
        </div>

        <div v-if="battleEnded" class="battle-end-modal">
            <div class="battle-end-modal-bg"></div>
            <button class="battle-end-btn" :class="{ lose: playerHP <= 0 }" @click="goToLobby">
                <span v-if="playerHP > 0">Parabéns!<br>Voltar ao Lobby</span>
                <span v-else>Que pena, voltar ao lobby</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

// Use the user's selected hero as player
const userStore = useUserStore();
const playerHero = userStore.lastPickedHero;

// Hardcoded purple slime as enemy for now
const enemyHero = {
    name: "Purple Slime",
    hp: 40,
    atk: 12,
    def: 3,
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

const playerSprite = ref(playerHero.idle_sprite);
const enemySprite = ref(enemyHero.idle_sprite);

async function showSprite(refSprite, spriteUrl, duration = 400) {
    const prev = refSprite.value;
    refSprite.value = spriteUrl;
    await new Promise(r => setTimeout(r, duration));
    refSprite.value = prev;
}

const playerDamageText = ref("");
const enemyDamageText = ref("");

// Helper to show damage text for a short time
function showDamage(refText, dmg) {
    refText.value = `-${dmg}`;
    setTimeout(() => {
        refText.value = "";
    }, 900);
}

const attackEnemy = async () => {
    if (battleEnded.value) return;
    isAnimating.value = true;
    playerAttackAnim.value = true;
    await showSprite(playerSprite, playerHero.attack_sprite, 400);
    await new Promise(r => setTimeout(r, 100));
    // Enemy receives damage
    await showSprite(enemySprite, enemyHero.damage_received_sprite, 350);
    const dmg = calcDamage(playerHero, enemyHero);
    enemyHP.value = Math.max(0, enemyHP.value - dmg);
    showDamage(enemyDamageText, dmg);
    playerAttackAnim.value = false;
    await new Promise(r => setTimeout(r, 200));
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
    await showSprite(enemySprite, enemyHero.attack_sprite, 400);
    await new Promise(r => setTimeout(r, 100));
    // Player receives damage
    await showSprite(playerSprite, playerHero.damage_received_sprite, 350);
    let dmg = calcDamage(enemyHero, playerHero);
    if (playerDefending) dmg = Math.floor(dmg / 2);
    playerHP.value = Math.max(0, playerHP.value - dmg);
    showDamage(playerDamageText, dmg);
    enemyAttackAnim.value = false;
    await new Promise(r => setTimeout(r, 200));
    if (playerHP.value <= 0) {
        battleEnded.value = true;
        isAnimating.value = false;
        return;
    }
    turn.value = "player";
    isAnimating.value = false;
};

const router = useRouter();

async function abort() {
    playerSprite.value = playerHero.damage_received_sprite;
    await new Promise(r => setTimeout(r, 1500));
    router.push("/lobby");
}
async function goToLobby() {
    await new Promise(r => setTimeout(r, 1500));
    router.push("/lobby");
}

watch(
    () => battleEnded.value,
    (ended) => {
        if (ended) {
            if (playerHP.value > 0) {
                // Player wins
                playerSprite.value = playerHero.celebration_sprite;
                enemySprite.value = enemyHero.damage_received_sprite;
            } else {
                // Enemy wins
                playerSprite.value = playerHero.damage_received_sprite;
                enemySprite.value = enemyHero.celebration_sprite;
            }
        }
    }
);
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
    align-items: center;
    /* Center vertically */
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
    position: relative;
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
    width: 400px;
    height: 400px;
    object-fit: contain;
    transition: transform 0.2s;
    display: block;
    margin-bottom: 0;
    margin-top: 90px !important;
}

.slime-img.animate {
    animation: attackAnim 0.9s;
}

.slime-img-enemy {
    /* Always flip horizontally for all enemy sprites, including during animation */
    transform: scaleX(-1);
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
    border: none;
    padding: 18px 40px;
    border-radius: 14px;
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: bold;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    color: white;
    outline: none;
}

/* Attack: orange/red */
.battle-joystick button:not(.defend-btn):not(.abort-btn) {
    background: linear-gradient(145deg, #ff7f50, #ff4500);
}

.battle-joystick button:not(.defend-btn):not(.abort-btn):hover {
    background: linear-gradient(145deg, #ffa07a, #ff6347);
}

/* Defend: green */
.battle-joystick .defend-btn {
    background: linear-gradient(145deg, #43e643, #228B22);
    color: #fff;
}

.battle-joystick .defend-btn:hover {
    background: linear-gradient(145deg, #32cd32, #228B22);
    color: #fff;
}

/* Abort: blue */
.battle-joystick .abort-btn {
    background: linear-gradient(145deg, #7fdfff, #3a8dde);
    color: #fff;
}

.battle-joystick .abort-btn:hover {
    background: linear-gradient(145deg, #b3e6ff, #5faaff);
    color: #fff;
}

.battle-joystick button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

.battle-end-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
}

.battle-end-modal-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.65);
    z-index: 101;
}

.battle-end-btn {
    position: relative;
    z-index: 102;
    background: linear-gradient(145deg, #32cd32, #228B22);
    color: white;
    border: 4px solid #fff;
    padding: 32px 80px;
    border-radius: 24px;
    font-size: 2rem;
    font-weight: bold;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, border 0.2s;
    outline: none;
    text-align: center;
    display: block;
}

.battle-end-btn:hover {
    background: linear-gradient(145deg, #43e643, #228B22);
    transform: scale(1.05);
    border: 4px solid #fffc;
}

.battle-end-btn.lose {
    background: linear-gradient(145deg, #ff7f50, #ff4500);
    border: 4px solid #fff3;
}

.battle-end-btn.lose:hover {
    background: linear-gradient(145deg, #ffa07a, #ff6347);
}

.damage-float {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2.5rem;
    font-weight: bold;
    color: #ffcd44;
    text-shadow: 0 2px 8px #000, 0 0 2px #fff;
    pointer-events: none;
    animation: damageFloatAnim 0.9s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 20;
    user-select: none;
    white-space: nowrap;
}

.player-damage {
    top: 30px;
}

.enemy-damage {
    top: 30px;
}

.slime-side {
    position: relative;
}

@keyframes damageFloatAnim {
    0% {
        opacity: 0;
        transform: translateX(-50%) translateY(30px) scale(1.2);
    }
    10% {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1.1);
    }
    80% {
        opacity: 1;
        transform: translateX(-50%) translateY(-30px) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateX(-50%) translateY(-50px) scale(0.95);
    }
}
</style>
