"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Calculator_1 = require("./models/Calculator");
const input_handler_1 = require("./utils/input-handler");
// Main program logic
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const calculator = new Calculator_1.Calculator();
        const inputHandler = new input_handler_1.InputHandler(); // Create instance of InputHandler
        console.log("Welcome to the Calculator with History!");
        let continueCalculating = true;
        while (continueCalculating) {
            try {
                // Get user input using InputHandler
                const { num1, num2, operation } = yield inputHandler.promptUser();
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
            // Use the inputHandler to ask for continuation
            const answer = yield inputHandler.question("\nWould you like to perform another calculation? (y/n): ");
            continueCalculating = answer.toLowerCase() === "y";
        }
        console.log("\nThank you for using the Calculator!");
        inputHandler.close(); // Close the readline interface properly
    });
}
// Run the program
main().catch((error) => {
    console.error("An error occurred:", error);
});
