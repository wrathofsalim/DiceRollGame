document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('roll-dice').addEventListener('click', rollDice);
document.getElementById('restart-game').addEventListener('click', restartGame);

let players = [];
let currentPlayerIndex = 0;
let currentMaxRoll = 100;
let rollingInterval;

function startGame() {
    const player1Name = document.getElementById('player1-name').value;
    const player2Name = document.getElementById('player2-name').value;

    if (player1Name && player2Name) {
        players = [
            { name: player1Name },
            { name: player2Name }
        ];
        currentPlayerIndex = Math.floor(Math.random() * 2);
        currentMaxRoll = 100;

        document.getElementById('player1-info').textContent = players[0].name;
        document.getElementById('player2-info').textContent = players[1].name;

        document.querySelector('.input-section').classList.add('hidden');
        document.querySelector('.game-section').classList.remove('hidden');
        document.getElementById('restart-game').classList.add('hidden');
        document.getElementById('roll-dice').disabled = false;

        updateGameStatus();
    } else {
        alert('Please enter valid names for both players.');
    }
}

function rollDice() {
    const currentPlayer = players[currentPlayerIndex];
    const diceRollDiv = document.getElementById('dice-roll');
    diceRollDiv.textContent = 'Rolling...';

    clearInterval(rollingInterval);
    rollingInterval = setInterval(() => {
        const randomRoll = Math.floor(Math.random() * currentMaxRoll) + 1;
        diceRollDiv.textContent = randomRoll;
    }, 100);

    setTimeout(() => {
        clearInterval(rollingInterval);
        const roll = Math.floor(Math.random() * currentMaxRoll) + 1;
        diceRollDiv.textContent = `${currentPlayer.name} rolled a ${roll}`;

        if (roll === 1) {
            const winner = players[(currentPlayerIndex + 1) % 2];
            document.getElementById('game-status').textContent = `${winner.name} wins!`;
            document.getElementById('roll-dice').disabled = true;
            document.getElementById('restart-game').classList.remove('hidden');
        } else {
            currentMaxRoll = roll;
            currentPlayerIndex = (currentPlayerIndex + 1) % 2;
            updateGameStatus();
        }
    }, 2000);
}

function restartGame() {
    currentMaxRoll = 100;
    currentPlayerIndex = Math.floor(Math.random() * 2);

    document.querySelector('.input-section').classList.remove('hidden');
    document.querySelector('.game-section').classList.add('hidden');
    document.getElementById('player1-name').value = players[0].name;
    document.getElementById('player2-name').value = players[1].name;
}

function updateGameStatus() {
    document.getElementById('game-status').textContent = `Current Player: ${players[currentPlayerIndex].name}, Roll between 1 and ${currentMaxRoll}`;
}
