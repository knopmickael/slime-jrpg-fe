const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let currentScreen = 'menu'; // Define a variável para controlar a tela atual
const menuOptions = ['Novo Jogo', 'Carregar Jogo', 'Sair'];
let selectedOption = 0;

function drawTitle() {
    ctx.fillStyle = 'white';
    ctx.font = '32px monospace';
    ctx.fillText('Slime RPG Arcade', 250, 300);
}

function drawMenu() {
    ctx.fillStyle = 'white';
    ctx.font = '32px monospace';
    ctx.fillText('Slime RPG', 300, 200);

    menuOptions.forEach((option, index) => {
        ctx.fillStyle = index === selectedOption ? 'yellow' : 'white';
        ctx.fillText(option, 350, 300 + index * 40);
    });
}

function updateMenuVisibility() {
    const menuOverlay = document.getElementById('menuOverlay');
    if (currentScreen === 'menu') {
        menuOverlay.style.display = 'flex';
    } else {
        menuOverlay.style.display = 'none';
    }
}

function handleMenuInput(event) {
    if (event.key === 'ArrowUp') {
        selectedOption = (selectedOption - 1 + menuOptions.length) % menuOptions.length;
    } else if (event.key === 'ArrowDown') {
        selectedOption = (selectedOption + 1) % menuOptions.length;
    } else if (event.key === 'Enter') {
        if (menuOptions[selectedOption] === 'Novo Jogo') {
            currentScreen = 'game';
        } else if (menuOptions[selectedOption] === 'Sair') {
            alert('Obrigado por jogar!');
        }
    }
    updateMenuVisibility(); // Atualiza a visibilidade do menu
}

const backgroundImage = new Image();
backgroundImage.src = 'assets/menu-bg.jpg'; // Substitua pelo nome correto da imagem

let cameraX = 0; // Posição horizontal da câmera
let cameraY = 0; // Posição vertical da câmera
const zoomLevel = 1.2; // Nível fixo de zoom
const cameraSpeed = 1; // Velocidade de movimento da câmera
let directionX = 1; // Direção do movimento no eixo X (1 para direita, -1 para esquerda)
let directionY = 1; // Direção do movimento no eixo Y (1 para baixo, -1 para cima)

function drawBackground() {
    if (backgroundImage.complete) {
        // Atualiza a posição da câmera
        cameraX += directionX * cameraSpeed;
        cameraY += directionY * cameraSpeed;

        // Inverte a direção se atingir as bordas da imagem
        if (cameraX <= 0 || cameraX + canvas.width / zoomLevel >= backgroundImage.width) {
            directionX *= -1;
        }
        if (cameraY <= 0 || cameraY + canvas.height / zoomLevel >= backgroundImage.height) {
            directionY *= -1;
        }

        // Desenha a parte visível da imagem com zoom
        ctx.drawImage(
            backgroundImage,
            cameraX, cameraY, // Coordenadas de recorte
            canvas.width / zoomLevel, canvas.height / zoomLevel, // Tamanho do recorte
            0, 0, // Coordenadas de destino
            canvas.width, canvas.height // Tamanho de destino
        );
    } else {
        backgroundImage.onload = () => {
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        };
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground(); // Desenha o fundo

    if (currentScreen === 'game') {
        drawTitle();
    }

    requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => {
    resizeCanvas();
    // Redesenha a tela atual após o redimensionamento
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (currentScreen === 'menu') {
        drawMenu();
    } else if (currentScreen === 'game') {
        drawTitle();
    }
});

// Inicializa o canvas com o tamanho da janela
resizeCanvas();

// Inicializa a visibilidade do menu
updateMenuVisibility();

window.addEventListener('keydown', handleMenuInput);
gameLoop();
