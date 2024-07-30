const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
let firstNumber = null;
let secondNumber = null;
let operator = null;

function resetExpression() {
    firstNumber = null;
    secondNumber = null;
    operator = null;
}

function add(a, b) {
    return (a * 10 + b * 10) / 10;
}

function subtract(a, b) {
    return (a * 10 - b * 10) / 10;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return NaN;
    }
    return a / b;
}

function operate(a, b, operator) {
    a = (a === null) ? 0 : Number(a);
    b = (b === null) ? a : Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'X':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function displayNumbers(target) {
    if (
        display.textContent === "0" || 
        (firstNumber !== null && operator !== null && secondNumber === null)
    ) { 
        display.textContent = ""; 
    }
    display.textContent += target.textContent;
    if (operator !== null) {
        secondNumber = display.textContent;
    } else {
        firstNumber = display.textContent;
    }
}

function setOperator(target) {
    if (operator !== null) {
        calculateResult();
    }
    operator = target.textContent;
}

function calculateResult() {
    const result = operate(firstNumber, secondNumber, operator);
    display.textContent = 
        (result > 9_999_999) ? result.toExponential(2) : result;
    resetExpression();
    firstNumber = display.textContent;
}

function clearDisplay() {
    display.textContent = 0;
    resetExpression();
}

function negateNumber() {
    if (secondNumber !== null) {
        secondNumber = -(secondNumber);
        display.textContent = secondNumber;
    } else {
        firstNumber = -(firstNumber);
        display.textContent = firstNumber;
    }
}

function convertToDecimal() {
    if (operator !== null) {
        secondNumber = (secondNumber === null) ? "0." : secondNumber + ".";
        display.textContent = secondNumber;
    } else {
        firstNumber = (firstNumber === null) ? "0." : firstNumber + ".";
        display.textContent = firstNumber;
    }
}

function convertToPercentage() {
    if (secondNumber !== null) {
        secondNumber = (secondNumber / 100);
        display.textContent = secondNumber;
    } else {
        firstNumber = (firstNumber / 100);
        display.textContent = firstNumber;
    }
}

buttons.forEach((button) => {
    button.addEventListener('mousedown', () => {
        button.classList.toggle("flash");
    });

    button.addEventListener('mouseup', () => {
        button.classList.remove("flash");
    });

    button.addEventListener('mouseleave', () => {
        button.classList.remove("flash");
    });

    button.addEventListener('click', (event) => {
        const target = event.target;

        if (
            target.classList.contains("operand") && (
            (operator === null && display.textContent.length < 10) ||
            (operator !== null && secondNumber === null || 
            display.textContent.length < 10))
        ) {
            displayNumbers(target);
        } 
        
        if (target.classList.contains("operator")) {
            setOperator(target);
        } 
        
        if (
            target.getAttribute("id") === "equal" && operator !== null
        ) {
            calculateResult();
        }

        if (target.getAttribute("id") === "clear") {
            clearDisplay();
        }

        if (
            target.getAttribute("id") === "negate" && 
            display.textContent !== "0"
        ) {
            negateNumber();
        }

        if (
            target.getAttribute("id") === "decimal" && (
            (operator === null && !display.textContent.includes(".")) ||
            (operator !== null && (secondNumber === null ||
            !secondNumber.includes("."))))
        ) {
            convertToDecimal();
        }

        if (
            target.getAttribute("id") === "percent" && 
            display.textContent !== "0"
        ) {
            convertToPercentage();
        }

        if (display.textContent.length > 10) {
            display.textContent = display.textContent.slice(0, 11);
        }
    });
});
