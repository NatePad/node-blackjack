"use strict";

const Deck = require("./src/classes/deck");
const Hand = require("./src/classes/hand");
const getSettings = require("./src/game-settings");
const {
  getHitOrStand,
  getPlayAgain,
  outOfCardsNotification,
} = require("./src/inquirer-questions");
const { FINAL_HANDS, LOGO } = require("./src/art");
const { OUT_OF_CARDS } = require("./src/errors");

// **********************************************************
// The dealer goes last, so hands[PLAYERS.length - 1] is the dealer.
// The dealer is last in the array because all players finish their
// hands before the dealer in casino Blackjack.
// **********************************************************
const hands = [];
const BLACKJACK = 21;

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
  const { DECK_COUNT, RESHUFFLE_AT, PLAYER_NAMES } = await getSettings();

  const deck = new Deck(DECK_COUNT, RESHUFFLE_AT);

  while (playAgain) {
    console.clear();
    console.log(LOGO);
    // EMPTY THE HANDS ARRAY FOR A NEW GAME
    hands.splice(0, hands.length);

    await deck.checkLength(PLAYER_NAMES.length);

    try {
      for (const player of PLAYER_NAMES) {
        const cards = deck.deal(2);
        const hand = new Hand(player, cards);
        hands.push(hand);
      }

      printHands();

      for (const hand of hands) {
        let hit = true;
        while (hit) {
          if (hand.getPlayer() !== PLAYER_NAMES[PLAYER_NAMES.length - 1]) {
            // START PLAYER HIT/STAY OPERATIONS
            if (await getHitOrStand()) {
              hand.addCards(deck.deal(1));
              printHands();
              if (hand.getValue() > BLACKJACK) {
                // PLAYER IS BUST
                hit = false;
              }
            } else {
              hit = false;
            }
            // END PLAYER HIT/STAY OPERATIONS
          } else {
            // START DEALER HIT/STAY OPERATIONS
            if (hand.getValue() < 17 && hands[0].getValue() <= BLACKJACK) {
              console.log("The dealer hits.");
              hand.addCards(deck.deal(1));
              hand.printCards(true);
            } else {
              console.log("The dealer stands.");
              hit = false;
            }
            // END DEALER HIT/STAY OPERATIONS
          }
        }
      }

      printHands(true);
      getWinner();
      printScore();
    } catch (err) {
      switch (err.message) {
        case OUT_OF_CARDS:
          await outOfCardsNotification();
          break;
        default:
          console.error("UNKNOWN ERROR:", err);
      }
    }
    playAgain = await getPlayAgain();
  }
};

init();
