"use strict";

const inquirer = require("inquirer");

const getPlayAgain = async () => {
  const results = await inquirer.prompt([
    {
      type: "list",
      name: "playAgain",
      message: "Do you want to play another round?",
      choices: ["Yes", "No"],
    },
  ]);
  return results.playAgain === "Yes";
};

const getHitOrStand = async () => {
  const results = await inquirer.prompt([
    {
      type: "list",
      name: "hitOrStand",
      message: "Do you want to hit or stand?",
      choices: ["Hit", "Stand"],
    },
  ]);
  return results.hitOrStand === "Hit";
};

module.exports = { getPlayAgain, getHitOrStand };
