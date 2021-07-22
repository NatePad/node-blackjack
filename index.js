"use strict";

const Deck = require("./src/classes/deck");
const Hand = require("./src/classes/hand");
const getYesOrNo = require("./src/inquirerQuestions");
const { HIT_OR_STAND, PLAY_AGAIN } = require("./src/constants");

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

    const hitOrStay = await getYesOrNo(HIT_OR_STAND);
    playAgain = await getYesOrNo(PLAY_AGAIN);
  }
};

init();
