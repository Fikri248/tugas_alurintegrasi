let currentInput = '';
let expression = '';
let result = '0';

function updateDisplay() {
    document.getElementById('expression').textContent = expression;
    document.getElementById('result').textContent = result;
}

function appendNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    expression = currentInput;
    result = currentInput;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput !== '') {
        currentInput += op;
        expression = currentInput;
        updateDisplay();
    }
}

function calculate() {
    try {
        let evalExpression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        let calculatedResult = eval(evalExpression);
        result = calculatedResult.toString();
        expression = currentInput;
        currentInput = result;
        updateDisplay();
    } catch (error) {
        result = 'Error';
        updateDisplay();
    }
}

function clearAll() {
    currentInput = '';
    expression = '';
    result = '0';
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        result = '0';
        expression = '';
    } else {
        result = currentInput;
        expression = currentInput;
    }
    updateDisplay();
}

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});

updateDisplay();
