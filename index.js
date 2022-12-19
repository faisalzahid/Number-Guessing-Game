#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
// Declaring Game Chances
let gameChances = 3;
// Generating Random Number
// sleep function for welcome msg
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
// welcome message
async function welcomeMsg() {
    const welcomeTitle = chalkAnimation.rainbow("Welcome to Faisal Number Guessing Game");
    await sleep();
    welcomeTitle.stop();
}
// userInput 
async function UserInput() {
    let randomnum = (Math.random() * 10).toFixed();
    do {
        console.log(chalk.yellow(`You have ${gameChances} Chances`));
        gameChances--;
        var question = await inquirer
            .prompt([
            {
                name: "userInputValue",
                type: "number",
                message: "Please Enter Number from 1 to 10:",
                validate: (answers) => {
                    if (isNaN(answers)) {
                        console.log("Please Enter Valid Number");
                    }
                    else
                        return true;
                }
            }
        ]);
        var userNum = question.userInputValue;
        console.log(`Number Entered By User is ${userNum}`);
        console.log(`Random Number By System is ${randomnum}`);
        // comparing user Number with Random Number
        if (userNum == randomnum) {
            console.log(chalk.green("Congratulations! You Win the Game"));
        }
        else {
            console.log(chalk.red("Sorry You Lost"));
        }
    } while (gameChances > 0 && userNum != randomnum);
}
// Reuseability
async function reUse() {
    do {
        await welcomeMsg();
        await UserInput();
        var again = await inquirer.prompt([
            {
                name: "confirmation",
                message: "Do you want to Play Game Again, Type Yes to pay Again:",
                type: "input",
            }
        ]);
        var confirm = again.confirmation.toUpperCase();
        gameChances = 3;
    } while (confirm == "Y" || confirm == "YES");
}
// calling of function
reUse();
