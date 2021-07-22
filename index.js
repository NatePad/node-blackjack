const Deck = require("./src/classes/deck");
const getPlayAgain = require("./src/inquirer");

let dealerWins = 0;
let playerWins = 0;
let ties = 0;
let playAgain = true;

const init = async () => {
  const deck = new Deck();
  while (playAgain) {
    console.log(deck);
    console.log(deck.cards.length);
    playAgain = await getPlayAgain();
  }
};

init();
