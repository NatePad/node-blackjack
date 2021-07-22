const Deck = require("./src/classes/deck");

let dealerWins = 0;
let playerWins = 0;
let ties = 0;
let playAgain = true;

const init = () => {
  const myDeck = new Deck();
  myDeck.build();
  console.log(myDeck);
  console.log(myDeck.cards.length);
};

init();
