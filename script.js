const buttons = document.querySelectorAll("button");
let firstNumber;
let operator;
let secondNumber;

function add(a, b) {
    return a + b;
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
        const display = document.querySelector(".display");
        let target = event.target;

        if (target.classList.contains("operand") && display.textContent.length < 10) {
            if (display.textContent === "0") {
                display.textContent = "";
            }
            display.textContent += target.textContent;

            if (operator) {
                secondNumber = display.textContent;
            } else {
                firstNumber = display.textContent;
            }
        }

        if (target.classList.contains("operator")) {
            operator = target.textContent;
            display.textContent = 0;
        }

        if (target.getAttribute("id") === "equal" && operator) {
            display.textContent = operate(Number(firstNumber), Number(secondNumber), operator);
        }

        if (target.getAttribute("id") === "clear") {
            display.textContent = 0;
            firstNumber = null;
            secondNumber = null;
            operator = null;
        }
    });
});