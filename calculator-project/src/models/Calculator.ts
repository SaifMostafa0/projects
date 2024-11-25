import * as readline from "node:readline";

// Calculator.ts
export interface ICalculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): string | number;
}

// Calculator class
export class Calculator implements ICalculator {
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
        rl.question(query, (input: string) => {
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
