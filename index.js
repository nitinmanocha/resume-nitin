#!/usr/bin/env node
"use strict";

var inquirer = require("inquirer");
var chalk = require("chalk");

var response = chalk.bold.cyan;
var inverseColor = chalk.bold.green

var data = require("./data.json");

var resumePrompts = {
  type: "list",
  name: "resumeOptions",
  message: "What do you want to know about me?",
  choices: [...Object.keys(data), "Exit"]
};

function main() {
  console.log(inverseColor("Hi, I'm Nitin Manocha. Welcome to my Resume."));
  resumeHandler();
}

function resumeHandler() {
  inquirer.prompt(resumePrompts).then(answer => {
    if (answer.resumeOptions == "Exit") {
      return;
    }
    var option = answer.resumeOptions;
    console.log(response("--------------------------------------"));
    data[`${option}`].forEach(info => {
      console.log(response("|   => " + info));
    });
    console.log(response("--------------------------------------"));
    // console.log(data[`${option}`]);
    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Back", "Exit"]
      })
      .then(choice => {
        if (choice.exitBack == "Back") {
          resumeHandler();
        } else {
          return;
        }
      });
  });
}

main();