"use strict";

const { PLAYERS } = require("../constants");

class Hand {
  constructor(name, cards) {
    this.player = name;
    this.cards = cards;
    this.hit = true;

    this.setValue();
  }

  addCards(cards) {
    // ADD CARDS IS PASSED AN ARRAY
    // IF WE DON'T USE THE SPREAD OPERATOR
    // HERE, WE'LL CREATE A 2D ARRAY
    // INSTEAD OF ADDING CARDS TO THE
    // CURRENT ARRAY
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
    const isPlayerHand = this.player === PLAYERS[0];
    // IF IT'S THE DEALER'S HAND, WE SET i TO 1
    // SO THAT WE DON'T SHOW THE DEALER'S FIRST CARD
    // IN THE FOR LOOP BELOW
    let i = 0;

    console.log("_______________________");
    if (isPlayerHand) {
      console.log("Your Cards:");
    } else {
      console.log(`${this.player}'s Cards:`);
    }

    if (!revealDealer && !isPlayerHand) {
      i = 1;
      console.log("1 face down card");
    }

    for (i; i < this.cards.length; i++) {
      this.cards[i].printCard();
    }

    if (isPlayerHand || revealDealer) {
      console.log("Hand value is:", this.value);
    }
    console.log("=======================");
  }
}

module.exports = Hand;
