'use strict';

// Selecting Elements
const player0E1 = document.querySelector('.player--0');
const player1E1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Condition

let score, currentScore, activePlayer, playing;

const init = function (){
    score = [0, 0];
    // Using score array to save current Score and two players score.
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0E1.classList.remove('player--winner');
    player1E1.classList.remove('player--winner');
    player0E1.classList.add('player--active');
    player1E1.classList.remove('player--active');
}
init();

const switchPlayer = function(){
 // Switch to next player
 document.getElementById(`current--${activePlayer}`).textContent = 0;
 activePlayer = activePlayer === 0 ? 1 : 0;    // If active player is 0 switch to next player or else active player is 0
 currentScore = 0;
 player0E1.classList.toggle('player--active');
 player1E1.classList.toggle('player--active');
}

// Rolling Dice Functionality
btnRoll.addEventListener('click', function(){
    if (playing){
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player.
    if(dice !== 1){
        // Add dice to current score.
        currentScore += dice;
        document.getElementById(
        `current--${activePlayer}`
        ).textContent = currentScore; // Select the score element dynamically based on which is the active player. 
    } else {
       switchPlayer();
    }
}
});

btnHold.addEventListener('click', function(){
    if (playing){
    //1. Add current score to active player's score.
    score[activePlayer] += currentScore;
    console.log(score[activePlayer]);
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

    // 2. Check if player score is >=100
    if ( score[activePlayer] >= 100 ){
    console.log('You win');
    // Finish the game.
    playing = false;
    diceEl.classList.add('hidden');
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    else{
        switchPlayer();
    }

    // 3. Switch to the next player.
    switchPlayer();
}
});

btnNew.addEventListener('click', init);


