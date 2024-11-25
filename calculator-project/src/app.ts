import { Calculator } from './models/Calculator';
import { InputHandler } from './utils/input-handler';

// Main program logic
async function main() {
    const calculator = new Calculator();
    const inputHandler = new InputHandler(); // Create instance of InputHandler

    console.log("Welcome to the Calculator with History!");

    let continueCalculating = true;

    while (continueCalculating) {
        try {
            // Get user input using InputHandler
            const { num1, num2, operation } = await inputHandler.promptUser(); 

            let result: number;
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
        } catch (error) {
            // @ts-ignore
            console.error(`Error: ${error.message}`);
        }

        calculator.showHistory(); // Show the calculation history

        // Use the inputHandler to ask for continuation
        const answer = await inputHandler.question("\nWould you like to perform another calculation? (y/n): ");
        continueCalculating = answer.toLowerCase() === "y";
    }

    console.log("\nThank you for using the Calculator!");
    inputHandler.close(); // Close the readline interface properly
}

// Run the program
main().catch((error) => {
    console.error("An error occurred:", error);
});
