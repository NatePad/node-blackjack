"use strict";

const Card = require("./card");
const {
  DECK_COUNT,
  FACES,
  FRESH_SHUFFLE,
  SUITS,
  RESHUFFLE_AT,
} = require("../constants");

class Deck {
  constructor() {
    this.build();
  }

  build() {
    this.cards = [];

    for (let i = 0; i < DECK_COUNT; i++) {
      for (const suit of SUITS) {
        for (const face of FACES) {
          const card = new Card(suit, face);
          this.cards.push(card);
        }
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

  checkLength() {
    if (this.cards.length < RESHUFFLE_AT) this.build();
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
