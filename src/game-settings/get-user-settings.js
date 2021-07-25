const inquirer = require("inquirer");

const validateNumber = (value) => {
  return !isNaN(value) && value > 0;
};

const getUserSettings = async () => {
  const responses = await inquirer.prompt([
    {
      type: "input",
      name: "DECK_COUNT",
      message: "How many decks should be shuffled into the shoe?",
      default: 1,
      validate: (value) =>
        value === "" || !validateNumber(value) || value > 10
          ? "Please enter a number from 1 to 10."
          : true,
      filter: (value) =>
        !validateNumber(value) || value > 10 ? "" : Number(value),
    },
    {
      type: "input",
      name: "RESHUFFLE_AT",
      message:
        "Approximately how many cards should be remaining in the shoe before the dealer reshuffles all the cards?",
      default: 20,
      validate: (value) =>
        value === "" || !validateNumber(value)
          ? "Please enter a number greater than 0."
          : true,
      filter: (value) => (validateNumber(value) ? Number(value) : ""),
    },
  ]);
  return responses;
};

module.exports = getUserSettings;
