import * as readline from "readline";

// Calculator class
class Calculator {
    private history: string[] = []; // Array to store calculation history

    add(a: number, b: number): number {
        const result = a + b;
        this.history.push(`${a} + ${b} = ${result}`);
        return result;
    }

    subtract(a: number, b: number): number {
        const result = a - b;
        this.history.push(`${a} - ${b} = ${result}`);
        return result;
    }

    multiply(a: number, b: number): number {
        const result = a * b;
        this.history.push(`${a} * ${b} = ${result}`);
        return result;
    }

    divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        const result = a / b;
        this.history.push(`${a} / ${b} = ${result}`);
        return result;
    }

    showHistory(): void {
        console.log("\nCalculation History:");
        if (this.history.length === 0) {
            console.log("No calculations yet.");
        } else {
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
function question(query: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(query, (input) => {
            resolve(input.trim());
        });
    });
}

// Helper function to get a valid number
async function getNumber(prompt: string): Promise<number> {
    const input = await question(prompt);
    const num = parseFloat(input);
    if (!isNaN(num)) {
        return num;
    } else {
        console.log("Invalid input. Please enter a valid number.");
        return getNumber(prompt);
    }
}

// Helper function to get a valid operation
async function getOperation(): Promise<string> {
    const input = await question("Choose an operation (+, -, *, /): ");
    if (input === "+" || input === "-" || input === "*" || input === "/") {
        return input;
    } else {
        console.log("Invalid operation. Please choose +, -, *, or /.");
        return getOperation();
    }
}

// Main program logic
async function main() {
    const calculator = new Calculator();

    console.log("Welcome to the Calculator with History!");

    let continueCalculating = true;

    while (continueCalculating) {
        try {
            const num1 = await getNumber("Enter the first number: ");
            const num2 = await getNumber("Enter the second number: ");
            const operation = await getOperation();

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

        const answer = await question("\nWould you like to perform another calculation? (y/n): ");
        continueCalculating = answer.toLowerCase() === "y";
    }

    console.log("\nThank you for using the Calculator!");
    rl.close();
}

// Run the program
main().catch((error) => {
    console.error("An error occurred:", error);
    rl.close();
});
