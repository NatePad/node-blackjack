"use strict";

const Deck = require("./src/classes/deck");
const Hand = require("./src/classes/hand");
const { getPlayAgain, getHitOrStand } = require("./src/inquirer-questions");
const { BLACKJACK, FINAL_HANDS, LOGO, PLAYERS } = require("./src/constants");

// **********************************************************
// Hands are created from the PLAYERS names in the constants
// file, making hands[PLAYERS.length] the dealer hand.
// The dealer is last in the array becaujse all players finish their
// hands before the dealer in casino Blackjack.
// **********************************************************
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
      (hands[0].getCardCount() > 2 && hands[1].getCardCount() > 2)
    ) {
      ties++;
      console.log("It's a tie!");
    } else {
      if (hands[0].getCardCount() === 2) {
        if (hands[1].getCardCount() === 2) {
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

const printHands = (revealDealerCard) => {
  if (revealDealerCard) console.log(FINAL_HANDS);

  // PRINT THE DEALER'S CARDS FIRST
  for (let i = hands.length - 1; i >= 0; i--) {
    hands[i].printCards(revealDealerCard);
  }
};

const printScore = () => {
  console.log(`
***********************
**  Player Wins: ${playerWins}
**  Dealer Wins: ${dealerWins}
**  Ties: ${ties}
***********************
`);
};

const init = async () => {
  const deck = new Deck();

  while (playAgain) {
    console.clear();
    console.log(LOGO);
    // EMPTY THE HANDS ARRAY FOR A NEW GAME
    hands.splice(0, hands.length);

    deck.checkLength();

    for (const player of PLAYERS) {
      const cards = deck.deal(2);
      const hand = new Hand(player, cards);
      hands.push(hand);
    }

    printHands();

    for (const hand of hands) {
      while (hand.getHit()) {
        if (hand.getPlayer() !== PLAYERS[PLAYERS.length - 1]) {
          // START PLAYER HIT/STAY OPERATIONS
          if (await getHitOrStand()) {
            hand.addCards(deck.deal(1));
            printHands();
            if (hand.getValue() > BLACKJACK) {
              // PLAYER IS BUST
              hand.setHit(false);
            }
          } else {
            hand.setHit(false);
          }
          // END PLAYER HIT/STAY OPERATIONS
        } else {
          // START DEALER HIT/STAY OPERATIONS
          if (hand.getValue() < 17 && hands[0].getValue() <= BLACKJACK) {
            console.log("The dealer hits.");
            hand.addCards(deck.deal(1));
            hand.printCards();
          } else {
            console.log("The dealer stands.");
            hand.setHit(false);
          }
          // END DEALER HIT/STAY OPERATIONS
        }
      }
    }

    printHands(true);
    getWinner();
    printScore();

    playAgain = await getPlayAgain();
  }
};

init();
