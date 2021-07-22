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

    let i = 0;
    if (this.name === "Dealer") {
      console.log("1 face down card");
      i = 1;
    }

    for (i; i < this.cards.length; i++) {
      this.cards[i].printCard();
    }
  }
}

module.exports = Hand;
