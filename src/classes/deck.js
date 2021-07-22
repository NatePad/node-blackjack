const Card = require("./card");
const { SUITS, FACES } = require("./constants");

class Deck {
  build() {
    this.cards = [];

    for (const suit of SUITS) {
      for (const face of FACES) {
        const card = new Card(suit, face);
        this.cards.push(card);
      }
    }
  }

  shuffle() {
    this.cards;
    let currentIndex = 0;
    while (index < this.cards.length) {
      currentIndex++;
      const randomIndex = Math.floor(Math.random() * currentIndex);
      
    }
  }
}

module.exports = Deck;
