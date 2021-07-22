const inquirer = require("inquirer");

const getPlayAgain = async () => {
  const results = await inquirer.prompt([
    {
      type: "list",
      name: "playAgain",
      message: "Would you like to play again?",
      choices: ["Yes", "No"],
    },
  ]);

  return results.playAgain === "Yes" ? true : false;
};

const getHitOrStay = async () => {
  const results = await inquirer.prompt([
    {
      type: "list",
      name: "hitOrStay",
      message: "Do you want to hit (draw a card) or stay (don't draw)?",
      choices: ["Hit", "Stay"],
    },
  ]);

  return results.hitOrStay === "Hit" ? true : false;
};

const getYesOrNo = async (message) => {
  const results = await inquirer.prompt([
    {
      type: "list",
      name: "yesOrNo",
      // IF THE KEY AND VALUE HAVE THE SAME VARIABLE NAME,
      // THEN WE DON'T HAVE TO TYPE OUT THE VALUE:
      // message: message
      message,
      choices: ["Yes", "No"],
    },
  ]);

  return results.yesOrNo === "Yes" ? true : false;
};

module.exports = { getHitOrStay, getPlayAgain, getYesOrNo };
