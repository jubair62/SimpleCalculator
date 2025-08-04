let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");
function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch (value) {
        case "C":
        buffer = "0";
        runningTotal = 0;
        previousOperator = null;
        break;
        case "=":
        if (previousOperator === null) {
            return; // No operation to perform
        }
        flushOperation(parseFloat(buffer));
        previousOperator = null;
        buffer = "" + runningTotal;
        break;
        case "←":
        if (buffer.length === 1 || buffer === "0") {
            buffer = "0";
        } else {
            buffer = buffer.slice(0, buffer.length -1);
        }
        break;
        case ".":
        if (buffer === "") {
            buffer = "0."; // start with 0. if buffer is empty
        } else if (!buffer.includes(".")) {
            buffer += ".";
        }
        break;
        case "+":
        case "-":
        case "×":
        case "÷":
        handleMath(value);
        break;
        default:
        handleMath(value);
    }
}

function handleMath(value) {
    if (buffer === "0" && value !== "C") {
        return; // Ignore operation if buffer is zero
    }
    const intBuffer = parseFloat(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else if (previousOperator === "÷") {
        runningTotal /= intBuffer;
    }
}

function init() {
    const buttons = document.querySelectorAll(".calc-buttons");
    for (let button of buttons) {
        button.addEventListener("click", function(event) {
            buttonClick(event.target.innerText);
        });
    }
}

init();