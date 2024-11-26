// input-handler.ts
import * as readline from 'readline';

export interface IInputHandler {
    promptUser(): Promise<{ num1: number; num2: number; operation: string }>;
    close(): void;
}

export class InputHandler implements IInputHandler {
    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    public async question(query: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(query, resolve);
        });
    }

    private isValidNumber(value: string): boolean {
        return !isNaN(parseFloat(value)) && isFinite(Number(value));
    }

    private isValidOperation(operation: string): boolean {
        return ['+', '-', '*', '/'].includes(operation);
    }

    async promptUser(): Promise<{ num1: number; num2: number; operation: string }> {
        try {
            // Prompt user for the first number
            let num1 = await this.question("Enter first number: ");
            console.log(`Received input for num1: ${num1}`);  // Debugging log
            while (!this.isValidNumber(num1)) {
                console.log("Invalid input. Please enter a valid number.");
                num1 = await this.question("Enter first number: ");
                console.log(`Received input for num1: ${num1}`);  // Debugging log
            }

            // Prompt user for the second number
            let num2 = await this.question("Enter second number: ");
            console.log(`Received input for num2: ${num2}`);  // Debugging log
            while (!this.isValidNumber(num2)) {
                console.log("Invalid input. Please enter a valid number.");
                num2 = await this.question("Enter second number: ");
                console.log(`Received input for num2: ${num2}`);  // Debugging log
            }

            // Prompt user for the operation
            let operation = await this.question("Choose operation (+, -, *, /): ");
            console.log(`Received operation: ${operation}`);  // Debugging log
            while (!this.isValidOperation(operation)) {
                console.log("Invalid operation. Please use +, -, *, or /");
                operation = await this.question("Choose operation (+, -, *, /): ");
                console.log(`Received operation: ${operation}`);  // Debugging log
            }

            return {
                num1: parseFloat(num1),
                num2: parseFloat(num2),
                operation
            };
        } catch (error) {
            console.error("Input error:", error);
            throw error;
        }
    }

    close(): void {
        this.rl.close();
    }
}

