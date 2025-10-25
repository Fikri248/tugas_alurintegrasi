let currentInput = '';
let expression = '';
let result = '0';

// Update display
function updateDisplay() {
    document.getElementById('expression').textContent = expression;
    document.getElementById('result').textContent = result;
}

// Append number
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

// Append operator
function appendOperator(op) {
    if (currentInput !== '') {
        currentInput += op;
        expression = currentInput;
        updateDisplay();
    }
}

// Calculate
function calculate() {
    try {
        // Replace × with * for evaluation
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

// Clear all
function clearAll() {
    currentInput = '';
    expression = '';
    result = '0';
    updateDisplay();
}

// Backspace
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

// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});

// Initialize display
updateDisplay();
