var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as readline from "readline";
// Calculator class
class Calculator {
    constructor() {
        this.history = []; // Array to store calculation history
    }
    add(a, b) {
        const result = a + b;
        this.history.push(`${a} + ${b} = ${result}`);
        return result;
    }
    subtract(a, b) {
        const result = a - b;
        this.history.push(`${a} - ${b} = ${result}`);
        return result;
    }
    multiply(a, b) {
        const result = a * b;
        this.history.push(`${a} * ${b} = ${result}`);
        return result;
    }
    divide(a, b) {
        if (b === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        const result = a / b;
        this.history.push(`${a} / ${b} = ${result}`);
        return result;
    }
    showHistory() {
        console.log("\nCalculation History:");
        if (this.history.length === 0) {
            console.log("No calculations yet.");
        }
        else {
            for (let i = 0; i < this.history.length; i++) {
                console.log(this.history[i]);
            }
        }
    }
}
// Readline setup for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Helper function to prompt user input
function question(query) {
    return new Promise((resolve) => {
        rl.question(query, (input) => {
            resolve(input.trim());
        });
    });
}
// Helper function to get a valid number
function getNumber(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const input = yield question(prompt);
        const num = parseFloat(input);
        if (!isNaN(num)) {
            return num;
        }
        else {
            console.log("Invalid input. Please enter a valid number.");
            return getNumber(prompt);
        }
    });
}
// Helper function to get a valid operation
function getOperation() {
    return __awaiter(this, void 0, void 0, function* () {
        const input = yield question("Choose an operation (+, -, *, /): ");
        if (input === "+" || input === "-" || input === "*" || input === "/") {
            return input;
        }
        else {
            console.log("Invalid operation. Please choose +, -, *, or /.");
            return getOperation();
        }
    });
}
// Main program logic
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const calculator = new Calculator();
        console.log("Welcome to the Calculator with History!");
        let continueCalculating = true;
        while (continueCalculating) {
            try {
                const num1 = yield getNumber("Enter the first number: ");
                const num2 = yield getNumber("Enter the second number: ");
                const operation = yield getOperation();
                let result;
                switch (operation) {
                    case "+":
                        result = calculator.add(num1, num2);
                        break;
                    case "-":
                        result = calculator.subtract(num1, num2);
                        break;
                    case "*":
                        result = calculator.multiply(num1, num2);
                        break;
                    case "/":
                        result = calculator.divide(num1, num2);
                        break;
                    default:
                        throw new Error("Invalid operation.");
                }
                console.log(`Result: ${result}`);
            }
            catch (error) {
                // @ts-ignore
                console.error(`Error: ${error.message}`);
            }
            calculator.showHistory(); // Show the calculation history
            const answer = yield question("\nWould you like to perform another calculation? (y/n): ");
            continueCalculating = answer.toLowerCase() === "y";
        }
        console.log("\nThank you for using the Calculator!");
        rl.close();
    });
}
// Run the program
main().catch((error) => {
    console.error("An error occurred:", error);
    rl.close();
});