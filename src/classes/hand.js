const Card = require("./card");

class Hand {
  constructor(name, cards) {
    this.name = name;
    this.cards = cards;
  }

  printCards() {
    if (this.name === "Player") {
      console.log("Your Cards:");
    } else {
      console.log(`${this.name}'s Cards:`);
    }

    if (this.name === "Dealer") {
      console.log("1 face down card");
      for (let i = 1; i < this.cards.length; i++) {
        this.cards[i].printCard();
      }
    } else {
      for (const card of this.cards) {
        card.printCard();
      }
    }
  }
}

module.exports = Hand;
