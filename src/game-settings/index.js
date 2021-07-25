"use strict";

const inquirer = require("inquirer");
const getUserSettings = require("./get-user-settings");
const defaultSettings = require("./settings");

const getUseDefaultSettings = async () => {
  const choices = [
    "Yes! Let's play some Blackjack!",
    "No. Let me configure some things.",
  ];

  const { useDefaultSettings } = await inquirer.prompt([
    {
      type: "list",
      name: "useDefaultSettings",
      message:
        "The default settings are 1 deck of cards and the dealer shuffles when there are fewer than 20 cards left.\nDo you want to use these default settings?",
      choices,
    },
  ]);

  return useDefaultSettings === choices[0];
};

const getSettings = async () => {
  if (await getUseDefaultSettings()) return defaultSettings;

  const userSettings = await getUserSettings();
  return { ...defaultSettings, ...userSettings };
};

module.exports = getSettings;
