"use strict";

const Deck = require("./src/classes/deck");
const Hand = require("./src/classes/hand");
const { getPlayAgain, getHitOrStand } = require("./src/inquirerQuestions");
const { HIT_OR_STAND, LOGO, PLAY_AGAIN, PLAYERS } = require("./src/constants");

const hands = [];

let dealerWins = 0;
let playerWins = 0;
let ties = 0;
let playAgain = true;

const printHands = () => {
  // PRINT THE DEALER'S CARDS FIRST
  for (let i = hands.length - 1; i >= 0; i--) {
    hands[i].printCards();
  }
};

const init = async () => {
  const deck = new Deck();

  while (playAgain) {
    console.clear();
    console.log(LOGO);
    // EMPTY THE HANDS ARRAY
    // FOR A NEW GAME
    hands.splice(0, hands.length);
    // HANDS NOW EQUALS [];

    for (const player of PLAYERS) {
      const cards = deck.deal(2);
      const hand = new Hand(player, cards, true);
      hands.push(hand);
    }

    printHands();

    for (const hand of hands) {
      while (hand.hit) {
        if (hand.player === PLAYERS[0]) {
          // PLAYER HIT/STAY OPERATIONS
          if (await getHitOrStand()) {
            hand.addCards(deck.deal(1));
            hand.printCards();
          } else {
            hand.setHit(false);
          }
        } else {
          // DEALER HIT/STAY OPERATIONS
          console.log("dealer stands");
          hand.setHit(false);
        }
      }
    }

    playAgain = await getPlayAgain();
  }
};

init();
