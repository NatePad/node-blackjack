const Deck = require("./src/classes/deck");
const getPlayAgain = require("./src/inquirer");

let dealerWins = 0;
let playerWins = 0;
let ties = 0;
let playAgain = true;

const init = async () => {
  while (playAgain) {
    const myDeck = new Deck();
    myDeck.build();
    console.log(myDeck);
    console.log(myDeck.cards.length);
    playAgain = await getPlayAgain();
  }
};

init();
