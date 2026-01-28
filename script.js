let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    if (display.value === '0' && num !== '00') {
        display.value = num;
    } else {
        display.value += num;
    }
    expression = display.value;
}

function appendOperator(operator) {
    if (display.value === '') return;
    
    // Prevent multiple consecutive operators
    if (['+', '-', '*', '/'].includes(display.value.slice(-1))) {
        return;
    }
    
    display.value += operator;
    expression = display.value;
}

function clearDisplay() {
    display.value = '0';
    expression = '';
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
    expression = display.value;
}

function calculate() {
    try {
        let result = evaluateExpression(display.value);
        display.value = result;
        expression = result;
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

function evaluateExpression(expr) {
    // Replace ÷ with / for calculation
    expr = expr.replace(/÷/g, '/');
    
    // Use Function constructor instead of eval for safety
    const result = Function('"use strict"; return (' + expr + ')')();
    
    // Round to avoid floating point errors
    return Math.round(result * 100000000) / 100000000;
}

function calculateSin() {
    try {
        let value = parseFloat(display.value);
        // Convert degrees to radians
        let result = Math.sin(value * Math.PI / 180);
        display.value = Math.round(result * 100000000) / 100000000;
        expression = display.value;
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateCos() {
    try {
        let value = parseFloat(display.value);
        // Convert degrees to radians
        let result = Math.cos(value * Math.PI / 180);
        display.value = Math.round(result * 100000000) / 100000000;
        expression = display.value;
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateTan() {
    try {
        let value = parseFloat(display.value);
        // Convert degrees to radians
        let result = Math.tan(value * Math.PI / 180);
        display.value = Math.round(result * 100000000) / 100000000;
        expression = display.value;
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateSqrt() {
    try {
        let value = parseFloat(display.value);
        if (value < 0) {
            display.value = 'Error';
            return;
        }
        let result = Math.sqrt(value);
        display.value = Math.round(result * 100000000) / 100000000;
        expression = display.value;
    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        appendOperator(key);
    } else if (key === '.') {
        event.preventDefault();
        appendOperator('.');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
