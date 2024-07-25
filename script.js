let firstNumber;
let operator;
let secondNumber;

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a = 0, b = a, operator) {
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

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener('mousedown', (event) => {
        button.classList.toggle("flash");
    });

    button.addEventListener('mouseup', (event) => {
        button.classList.remove("flash");
    });

    button.addEventListener('mouseleave', (event) => {
        button.classList.remove("flash");
    });

    button.addEventListener('click', (event) => {
        const display = document.querySelector(".display");

        if (event.target.classList.contains("operand") && display.textContent.length < 10) {
            if (display.textContent === "0") display.textContent = "";
            display.textContent += event.target.textContent;

            if (operator === undefined) {
                firstNumber = display.textContent;
            } else {
                secondNumber = display.textContent;
            }
        }

        if (event.target.classList.contains("operator")) {
            operator = event.target.textContent;
            display.textContent = 0;
        }

        if (event.target.getAttribute("id") === "equal" && operator) {
            display.textContent = operate(firstNumber, secondNumber, operator);
        }
    });
});