"use strict";

const inquirer = require("inquirer");

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

  return results.yesOrNo === "Yes";
};

module.exports = getYesOrNo;
