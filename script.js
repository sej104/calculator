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