const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const expression = {
    firstNumber: null,
    secondNumber: null,
    operator: null
}

function getFirstNumber() {
    return expression.firstNumber;
}

function setFirstNumber(value) {
    expression.firstNumber = value;
}

function getSecondNumber() {
    return expression.secondNumber;
}

function setSecondNumber(value) {
    expression.secondNumber = value;
}

function getOperator() {
    return expression.operator;
}

function setOperator(value) {
    expression.operator = value;
}

function resetExpression() {
    for (key in expression) {
        expression[key] = null;
    }
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
        (getFirstNumber() !== null && 
        getOperator() !== null && 
        getSecondNumber() === null)
    ) { 
        display.textContent = ""; 
    }
    display.textContent += target.textContent;
    if (getOperator() !== null) {
        setSecondNumber(display.textContent);
    } else {
        setFirstNumber(display.textContent);
    }
}

function calculateResult() {
    let result = operate(getFirstNumber(), getSecondNumber(), 
        getOperator());
    display.textContent = (result > 9_999_999) ? result.toExponential(2) :
        result;
    resetExpression();
    setFirstNumber(display.textContent);
}

function clearDisplay() {
    display.textContent = 0;
    resetExpression();
}

function negateNumber() {
    if (getSecondNumber() !== null) {
        setSecondNumber( -(getSecondNumber()) );
        display.textContent = getSecondNumber();
    } else {
        setFirstNumber( -(getFirstNumber()) );
        display.textContent = getFirstNumber();
    }
}

function convertToDecimal() {
    if (getOperator() !== null) {
        expression.secondNumber = (getSecondNumber() === null) ?
            "0." : getSecondNumber() + ".";
        display.textContent = getSecondNumber();
    } else {
        expression.firstNumber = (getFirstNumber() === null) ?
            "0." : getFirstNumber() + ".";
        display.textContent = getFirstNumber();
    }
}

function convertToPercentage() {
    if (getSecondNumber() !== null) {
        setSecondNumber(getSecondNumber() / 100);
        display.textContent = getSecondNumber();
    } else {
        setFirstNumber(getFirstNumber() / 100);
        display.textContent = getFirstNumber();
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
            target.classList.contains("operand") && 
            display.textContent.length < 10
        ) {
            displayNumbers(target);
        } 
        
        else if (target.classList.contains("operator")) {
            setOperator(target.textContent);
        } 
        
        else if (
            target.getAttribute("id") === "equal" && 
            getOperator() !== null
        ) {
            calculateResult();
        }

        else if (target.getAttribute("id") === "clear") {
            clearDisplay();
        }

        else if (
            target.getAttribute("id") === "negate" && 
            display.textContent !== "0"
        ) {
            negateNumber();
        }

        else if (
            target.getAttribute("id") === "decimal" &&
            (getOperator() === null && !display.textContent.includes(".")) ||
            (getOperator() !== null && (getSecondNumber() === null ||
            !getSecondNumber().includes(".")))
        ) {
            convertToDecimal();
        }

        else if (
            target.getAttribute("id") === "percent" && 
            display.textContent !== "0"
        ) {
            convertToPercentage();
        }
    });
});