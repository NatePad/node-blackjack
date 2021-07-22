"use strict";

const Deck = require("./src/classes/deck");
const Hand = require("./src/classes/hand");
const { getPlayAgain, getHitOrStand } = require("./src/inquirerQuestions");
const { BLACKJACK, LOGO, PLAYERS } = require("./src/constants");

const hands = [];

let dealerWins = 0;
let playerWins = 0;
let ties = 0;
let playAgain = true;

const getWinner = () => {
  const playerScore = hands[0].getValue();
  const dealerScore = hands[1].getValue();

  if (playerScore > BLACKJACK) {
    if (dealerScore > BLACKJACK) {
      ties++;
      console.log("You both bust! It's a draw!");
    } else {
      dealerWins++;
      console.log("You bust. The dealer wins");
    }
  } else if (dealerScore > BLACKJACK) {
    playerWins++;
    console.log("The dealer bust! You win!");
  } else if (playerScore > dealerScore) {
    playerWins++;
    console.log("You win!");
  } else if (playerScore < dealerScore) {
    dealerWins++;
    console.log("The dealer wins.");
  } else {
    if (
      playerScore !== BLACKJACK ||
      (hands[0].cards.length > 2 && hands[1].cards.length > 2)
    ) {
      ties++;
      console.log("It's a tie!");
    } else {
      if (hands[0].cards.length === 2) {
        if (hands[1].cards.length === 2) {
          ties++;
          console.log("You both got Blackjack! It's a draw!");
        } else {
          playerWins++;
          console.log("You break the tie with a Blackjack! Congratulations!");
        }
      } else {
        dealerWins++;
        console.log("The dealer breaks the tie with a Blackjack!");
      }
    }
  }
};

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
            printHands();
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

    getWinner();

    playAgain = await getPlayAgain();
  }
};

init();
