import React, { useState } from "react";
import Display from "./Display";
import Button from "./Button";
import "./finalecalc.css";

const FinalCalc = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [isWaitingForSecondOperand, setIsWaitingForSecondOperand] = useState(false);

  const handleButtonClick = (label) => {
    if (["+", "-", "*", "÷"].includes(label)) { 
      handleOperatorClick(label);
      return;
    }

    switch (label) {
      case "C":
        clearDisplay();
        break;
      case "=":
        handleEqualClick();
        break;
      case "+/-":
        toggleSign();
        break;
      case ".":
        appendDecimal();
        break;
      case "x!":
        handleFactorial();
        break;
      case "sin":
      case "cos":
      case "tan":
      case "sinh":
      case "cosh":
      case "tanh":
      case "ln":
      case "log10":
      case "x^2":
      case "x^3":
      case "x^y":
      case "e^x":
      case "10^x":
      case "2√x":
      case "3√x":
      case "y√x":
      case "π":
        handleSpecialFunctionClick(label);
        break;
      default:
        appendDigitOrSymbol(label);
        break;
    }
  };

  const handleOperatorClick = (nextOperator) => {
    const currentInput = parseFloat(displayValue);

    switch (nextOperator) {
      case "+":
      case "-":
      case "*":
        if (operator && isWaitingForSecondOperand) {
          setOperator(nextOperator);
          return;
        }

        if (firstOperand === null) {
          setFirstOperand(currentInput);
        } else if (operator) {
          const result = performCalculation(operator, firstOperand, currentInput);
          setDisplayValue(result.toString());
          setFirstOperand(result);
        }

        setOperator(nextOperator);
        setIsWaitingForSecondOperand(true);
        break;

      case "÷": 
        handleDivideClick();
        break;

      default:
        break;
    }
  };

  const handleEqualClick = () => {
    if (operator && firstOperand !== null) {
      const secondOperand = parseFloat(displayValue);
      const result = performCalculation(operator, firstOperand, secondOperand);
      setDisplayValue(result.toString());
      setFirstOperand(result);
      setOperator(null);
      setIsWaitingForSecondOperand(false);
    }
  };

  const performCalculation = (op, num1, num2) => {
    switch (op) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "÷":
        return num1 / num2;
      default:
        return num2;
    }
  };

  const clearDisplay = () => {
    setDisplayValue("0");
    setOperator(null);
    setFirstOperand(null);
    setIsWaitingForSecondOperand(false);
  };

  const toggleSign = () => {
    setDisplayValue((prev) => (prev.charAt(0) === "-" ? prev.slice(1) : `-${prev}`));
  };

  const appendDecimal = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const handleFactorial = () => {
    const number = parseFloat(displayValue);
    if (number < 0) {
      setDisplayValue("Error");
      return;
    }
    let result = 1;
    for (let i = 2; i <= number; i++) {
      result *= i;
    }
    setDisplayValue(result.toString());
    setIsWaitingForSecondOperand(true);
  };

  const handleSpecialFunctionClick = (label) => {
    const currentInput = parseFloat(displayValue);

    switch (label) {
      case "sin":
        setDisplayValue(Math.sin((currentInput * Math.PI) / 180).toFixed(8)); 
        break;
      case "cos":
        setDisplayValue(Math.cos((currentInput * Math.PI) / 180).toFixed(8)); 
        break;
      case "tan":
        setDisplayValue(Math.tan((currentInput * Math.PI) / 180).toFixed(8)); 
        break;
      case "sinh":
        setDisplayValue(Math.sinh(currentInput).toString()); 
        break;
      case "cosh":
        setDisplayValue(Math.cosh(currentInput).toString()); 
        break;
      case "tanh":
        setDisplayValue(Math.tanh(currentInput).toString()); 
        break;
      case "ln":
        setDisplayValue(Math.log(currentInput).toString()); 
        break;
      case "log10":
        setDisplayValue(Math.log10(currentInput).toString()); 
        break;
      case "x^2":
        setDisplayValue(Math.pow(currentInput, 2).toString()); 
        break;
      case "x^3":
        setDisplayValue(Math.pow(currentInput, 3).toString()); 
        break;
      case "x^y":

        break;
      case "e^x":
        setDisplayValue(Math.exp(currentInput).toString()); 
        break;
      case "10^x":
        setDisplayValue(Math.pow(10, currentInput).toString()); 
        break;
      case "2√x":
        setDisplayValue(Math.sqrt(currentInput).toString()); 
        break;
      case "3√x":
        setDisplayValue(Math.cbrt(currentInput).toString()); 
        break;
      case "y√x":
        break;
      case "π":
        setDisplayValue(Math.PI.toString()); 
        break;
      default:
        break;
    }

    setIsWaitingForSecondOperand(true); 
  };

  const appendDigitOrSymbol = (label) => {
    if (isWaitingForSecondOperand) {
      setDisplayValue(label);
      setIsWaitingForSecondOperand(false);
    } else {
      setDisplayValue((prev) => (prev === "0" ? label : prev + label));
    }
  };

  const handleDivideClick = () => {
    const currentInput = parseFloat(displayValue);

    if (operator && isWaitingForSecondOperand) {
      setOperator("÷");
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(currentInput);
    } else if (operator) {
      const result = performCalculation(operator, firstOperand, currentInput);
      setDisplayValue(result.toString());
      setFirstOperand(result);
    }

    setOperator("÷");
    setIsWaitingForSecondOperand(true);
  };

  const buttons = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '÷', 
    '2nd', 'x^2', 'x^3', 'x^y', 'e^x', '10^x', '7', '8', '9', '*',
    '1/x', '2√x', '3√x', 'y√x', 'ln', 'log10', '4', '5', '6', '-',
    'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+',
    'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '='
  ];

  const getButtonClassName = (label) => {
    switch (label) {
      case "C":
        return "clear";
      case "+/-":
        return "plus-minus";
      case "0":
        return "zero number";
      case "Rad":
        return "rad-btm-lgt";
      case "=":
        return "eql-btm-rgt yellow operator";
      case "+":
      case "-":
      case "*":
      case "÷": 
        return "yellow operator";
      default:
        return !isNaN(label) || label === "." ? "number" : "";
    }
  };
  

  return (
    <div className="calculator">
      <div className="dots">
        <div className="dot red"></div>
        <div className="dot yellow"></div>
        <div className="dot green"></div>
      </div>
      <Display value={displayValue} />
      <div className="buttons">
        {buttons.map((label, index) => (
          <Button
            key={index}
            label={label}
            className={getButtonClassName(label)}
            onClick={() => handleButtonClick(label)}
          />
        ))}
      </div>
    </div>
  );
};

export default FinalCalc;