"use strict";

const Card = require("./card");
const { SUITS, FACES, FRESH_SHUFFLE } = require("../constants");

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
    console.log(FRESH_SHUFFLE);
  }

  checkLength(rebuildAt) {
    if (this.cards.length < rebuildAt) this.build();
  }

  deal(count) {
    const cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(this.cards.pop());
    }
    return cards;
  }
}

module.exports = Deck;
