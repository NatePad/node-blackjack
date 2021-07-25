"use strict";

const inquirer = require("inquirer");

module.exports = {
  getHitOrStand: async () => {
    const choices = ["Hit", "Stand"];
    const results = await inquirer.prompt([
      {
        type: "list",
        name: "hitOrStand",
        message: "Do you want to hit or stand?",
        choices,
      },
    ]);
    return results.hitOrStand === choices[0];
  },

  getPlayAgain: async () => {
    const choices = ["Yes", "No"];
    const results = await inquirer.prompt([
      {
        type: "list",
        name: "playAgain",
        message: "Do you want to play another round?",
        choices,
      },
    ]);
    return results.playAgain === choices[0];
  },

  lowCardNotification: async (deckCount, remainingCards, playerCount) => {
    const choices = ["Reshuffle now.", "I'll take my chances."];
    const results = await inquirer.prompt([
      {
        type: "list",
        name: "shuffleNow",
        message: `There are ${playerCount} players in the game, ${remainingCards} cards left in the shoe, and ${deckCount} decks shuffled in.\nIt's possible for the shoe to run out of cards during this next round. Do you want to reshuffle now or keep going?\nIf the dealer runs out of cards in the middle of a round, that round will be forefit\nand the dealer will reshuffle at that time.`,
        choices,
      },
    ]);
    return results.shuffleNow === choices[0];
  },

  outOfCardsNotification: async () => {
    await inquirer.prompt([
      {
        type: "list",
        name: "outOfCards",
        message:
          "The dealer is out of cards. All hands will now be emptied,\nthe deck will be shuffled, and the round will restart.\nPress enter to continue.",
        choices: ["OK"],
      },
    ]);
  },
};
