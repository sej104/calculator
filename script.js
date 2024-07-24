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

function operate(a, b, operator) {
    return operator(a, b);
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
});