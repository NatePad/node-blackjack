const Card = require("./card");
const { SUITS, FACES } = require("../constants");

class Deck {
  constructor() {
    this.build();
  }

  build() {
    this.cards = [];

    for (const suit of SUITS) {
      for (const face of FACES) {
        const card = new Card(suit, face);
        this.cards.push(card);
      }
    }

    this.shuffle();
  }

  shuffle() {
    let currentIndex = this.cards.length;

    while (currentIndex > 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      const tempCard = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = tempCard;
    }
  }

  dealCard() {
    return this.cards.pop();
  }
}

module.exports = Deck;
