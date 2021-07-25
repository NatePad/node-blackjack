"use strict";

const { PLAYER_NAMES } = require("../game-settings/settings.json");

class Hand {
  constructor(name, cards) {
    this.player = name;
    this.cards = cards;
    this.hit = true;

    this.setValue();
  }

  addCards(cards) {
    this.cards.push(...cards);
    this.setValue();
  }

  setHit(bool) {
    this.hit = bool;
  }

  getHit() {
    return this.hit;
  }

  setValue() {
    let value = 0;
    let aceCount = 0;

    for (const card of this.cards) {
      if (card.getValue() === 1) {
        aceCount++;
      } else {
        value += card.getValue();
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

  getValue() {
    return this.value;
  }

  getPlayer() {
    return this.player;
  }

  getCardCount() {
    return this.cards.length;
  }

  printCards(revealDealer) {
    const isDealerHand = this.player === PLAYER_NAMES[PLAYER_NAMES.length - 1];

    console.log("_______________________");
    if (this.player === PLAYER_NAMES[0]) {
      console.log("Your Cards:");
    } else {
      console.log(`${this.player}'s Cards:`);
    }

    let i = 0;
    if (!revealDealer && isDealerHand) {
      i = 1;
      console.log("1 face down card");
    }

    for (i; i < this.cards.length; i++) {
      this.cards[i].printCard();
    }

    if (!isDealerHand || revealDealer) {
      console.log("Hand value is:", this.value);
    }
    console.log("=======================");
  }
}

module.exports = Hand;
