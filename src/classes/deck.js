"use strict";

const Card = require("./card");
const { FRESH_SHUFFLE } = require("../art");
const { OUT_OF_CARDS } = require("../errors");
const { lowCardNotification } = require("../inquirer-questions");

const SUITS = ["♠", "♥", "♦", "♣"];
const FACES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

class Deck {
  constructor(DECK_COUNT, RESHUFFLE_AT) {
    this.deckCount = DECK_COUNT;
    this.reshuffleAt = RESHUFFLE_AT;
    this.build();
  }

  build() {
    this.cards = [];

    for (let i = 0; i < this.deckCount; i++) {
      for (const suit of SUITS) {
        for (const face of FACES) {
          this.cards.push(new Card(suit, face));
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

  async checkLength(playerCount) {
    if (
      this.cards.length < this.reshuffleAt ||
      this.cards.length < playerCount * 2
    )
      this.build();

    if (this.cards.length < playerCount * this.deckCount * 9) {
      if (
        await lowCardNotification(
          this.deckCount,
          this.cards.length,
          playerCount
        )
      ) {
        this.build();
      }
    }
  }

  deal(count) {
    if (count > this.cards.length) {
      throw new Error(OUT_OF_CARDS);
    }
    const cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(this.cards.pop());
    }
    return cards;
  }
}

module.exports = Deck;
