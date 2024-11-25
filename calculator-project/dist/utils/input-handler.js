"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.InputHandler = void 0;
// input-handler.ts
const readline = __importStar(require("readline"));
class InputHandler {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    question(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.rl.question(query, resolve);
            });
        });
    }
    isValidNumber(value) {
        const isValid = !isNaN(parseFloat(value)) && isFinite(Number(value));
        console.log(`Validating number: "${value}" -> ${isValid}`);
        return isValid;
    }
    isValidOperation(operation) {
        return ['+', '-', '*', '/'].includes(operation);
    }
    promptUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Prompt user for the first number
                let num1 = yield this.question("Enter first number: ").then(input => input.trim());
                console.log(`Raw input for num1: ${num1}`);
                while (!this.isValidNumber(num1)) {
                    console.log("Invalid input. Please enter a valid number.");
                    num1 = yield this.question("Enter first number: ").then(input => input.trim());
                }
                // Prompt user for the second number
                let num2 = yield this.question("Enter second number: ").then(input => input.trim());
                console.log(`Raw input for num2: ${num2}`);
                while (!this.isValidNumber(num2)) {
                    console.log("Invalid input. Please enter a valid number.");
                    num2 = yield this.question("Enter second number: ").then(input => input.trim());
                }
                // Parse and log converted numbers
                const parsedNum1 = parseFloat(num1);
                const parsedNum2 = parseFloat(num2);
                console.log(`Parsed input for num1: ${parsedNum1}`);
                console.log(`Parsed input for num2: ${parsedNum2}`);
                // Prompt user for the operation
                let operation = yield this.question("Choose operation (+, -, *, /): ").then(input => input.trim());
                console.log(`Raw operation input: ${operation}`);
                while (!this.isValidOperation(operation)) {
                    console.log("Invalid operation. Please use +, -, *, or /");
                    operation = yield this.question("Choose operation (+, -, *, /): ").then(input => input.trim());
                }
                return {
                    num1: parsedNum1,
                    num2: parsedNum2,
                    operation
                };
            }
            catch (error) {
                console.error("Input error:", error);
                throw error;
            }
        });
    }
    close() {
        this.rl.close();
    }
}
exports.InputHandler = InputHandler;
