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

module.exports = getPlayAgain;
