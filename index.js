"use strict";

const Deck = require("./src/classes/deck");
const Hand = require("./src/classes/hand");
const { getHitOrStay, getPlayAgain } = require("./src/inquirerQuestions");

const players = ["Dealer", "Player"];
const hands = [];

let dealerWins = 0;
let playerWins = 0;
let ties = 0;
let playAgain = true;

const init = async () => {
  console.log("WELCOME TO BLACKJACK!");
  const deck = new Deck();

  while (playAgain) {
    // EMPTY THE HANDS ARRAY
    hands.splice(0, hands.length);
    // HANDS NOW EQUALS [];
    // console.log("logging hands", hands);

    for (const player of players) {
      const cards = deck.draw(2);
      // console.log("logging cards", cards);
      const hand = new Hand(player, cards);
      hands.push(hand);
    }

    for (const hand of hands) {
      hand.printCards();
    }

    const hitOrStay = await getHitOrStay();

    playAgain = await getPlayAgain();
  }
};

init();
