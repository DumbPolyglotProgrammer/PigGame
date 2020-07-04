/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var globalScores, activePlayer, roundScore;
var isGameOver;

var globalScoreToWin = 50;

initializeGame();

document.querySelector('.btn-new').addEventListener('click', function () {

    initializeGame();
    playNewGameAudio();

});

function initializeGame() {

    globalScores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    isGameOver = false;

    document.querySelector('.player-0-panel').classList.remove('active', 'winner');
    document.querySelector('.player-1-panel').classList.remove('active', 'winner');

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';

    document.querySelector('.player-0-panel').classList.add('active');

}

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (isGameOver) return;

    var diceNumber = rollDice();

    playRollDiceAudio();

    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice').src = getDiceImageSrc(diceNumber);

    if (diceNumber !== 1) {
        roundScore += diceNumber;

        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
        playNextPlayerAudio();
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (isGameOver) return;

    globalScores[activePlayer] += roundScore;

    document.getElementById('score-' + activePlayer).textContent = globalScores[activePlayer];

    if (globalScores[activePlayer] >= globalScoreToWin) {

        isGameOver = true;

        playWinningAudio();

        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        document.getElementById('name-' + activePlayer).textContent = 'Winner!';

        document.querySelector('.dice').style.display = 'none';

        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    } else {
        nextPlayer();
        playNextPlayerAudio();
    }

});

function nextPlayer() {

    activePlayer ^= 1;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

}


// Utility Functions

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function getDiceImageSrc(diceNumber) {
    switch (diceNumber) {
        case 1: return 'images/dice-1.png';
        case 2: return 'images/dice-2.png';
        case 3: return 'images/dice-3.png';
        case 4: return 'images/dice-4.png';
        case 5: return 'images/dice-5.png';
        case 6: return 'images/dice-6.png';
    }
}

function playNewGameAudio() {
    new Audio('sounds/new-game.wav').play();
}

function playRollDiceAudio() {
    new Audio('sounds/dice-roll.wav').play();
}

function playNextPlayerAudio() {
    new Audio('sounds/hold-score.wav').play();
}

function playWinningAudio() {
    new Audio('sounds/winner.wav').play();
}
