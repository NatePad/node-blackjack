class Card {
  constructor(suit, face) {
    this.suit = suit;
    this.face = face;

    // CONVERT THE FACE FROM
    // A STRING TO A NUMBER
    const faceInt = parseInt(face);

    if (face === "A") {
      this.value = 1;
    } else if (faceInt < 10) {
      this.value = faceInt;
    } else {
      this.value = 10;
    }
  }

  printCard() {
    console.log(`${this.face} of ${this.suit}s`);
  }
}

module.exports = Card;
