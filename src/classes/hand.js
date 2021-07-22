"use strict";

const { PLAYERS } = require("../constants");

class Hand {
  constructor(name, cards, hit) {
    this.player = name;
    this.cards = cards;
    this.hit = hit;

    this.setValue();
  }

  addCard(card) {
    this.cards.push(card);
    this.setValue();
  }

  setHit(bool) {
    this.hit = bool;
  }

  getValue() {
    return this.value;
  }

  setValue() {
    let value = 0;
    let aceCount = 0;

    for (const card of this.cards) {
      if (card.value === 1) {
        aceCount++;
      } else {
        value += card.value;
      }
    }

    if (aceCount > 0) {
      value += aceCount;
      if (value < 12) {
        value += 10;
      }
    }
    this.value = value;
  }

  printCards() {
    const isPlayerHand = this.player === PLAYERS[0];
    let i = 0;

    console.log("___________________");
    if (isPlayerHand) {
      console.log("Your Cards:");
    } else {
      console.log(`${this.player}'s Cards:`);
      console.log("1 face down card");
      i = 1;
    }

    for (i; i < this.cards.length; i++) {
      this.cards[i].printCard();
    }

    if (isPlayerHand) {
      // console.log("-------------------");
      console.log("Your hand value:", this.value);
    }
    console.log("===================");
  }
}

module.exports = Hand;
