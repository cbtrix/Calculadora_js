// Variáveis globais
let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

/**
 * Adiciona valores ao display da calculadora
 * @param {string} value - Valor a ser adicionado (número ou operador)
 */
function appendToDisplay(value) {
    if (['+', '-', '*', '/'].includes(value)) {
        handleOperator(value);
    } else {
        handleNumber(value);
    }
}

/**
 * Processa a entrada de operadores
 * @param {string} value - Operador matemático
 */
function handleOperator(value) {
    if (currentInput !== '') {
        if (previousInput !== '' && operator !== '') {
            calculate();
        }
        previousInput = currentInput;
        operator = value;
        currentInput = '';
        updateDisplay(previousInput + ' ' + value + ' ');
    }
}

/**
 * Processa a entrada de números e ponto decimal
 * @param {string} value - Número ou ponto decimal
 */
function handleNumber(value) {
    // Evita múltiplos pontos decimais
    if (value === '.' && currentInput.includes('.')) {
        return;
    }
    
    currentInput += value;
    
    if (previousInput !== '' && operator !== '') {
        updateDisplay(previousInput + ' ' + operator + ' ' + currentInput);
    } else {
        updateDisplay(currentInput);
    }
}

/**
 * Atualiza o conteúdo do display
 * @param {string} value - Valor a ser exibido
 */
function updateDisplay(value) {
    display.value = value;
}

/**
 * Realiza o cálculo baseado nos valores e operador atuais
 */
function calculate() {
    if (previousInput !== '' && currentInput !== '' && operator !== '') {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        // Validação de números válidos
        if (isNaN(prev) || isNaN(current)) {
            updateDisplay('Erro');
            resetCalculator();
            return;
        }

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    updateDisplay('Erro: Divisão por zero');
                    resetCalculator();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        // Formatar resultado para evitar números muito longos
        result = Math.round(result * 100000000) / 100000000;
        
        updateDisplay(result);
        currentInput = result.toString();
        previousInput = '';
        operator = '';
    }
}

/**
 * Limpa completamente o display e reseta a calculadora
 */
function clearDisplay() {
    resetCalculator();
    updateDisplay('');
}

/**
 * Reseta todas as variáveis da calculadora
 */
function resetCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
}

/**
 * Remove o último caractere digitado
 */
function deleteLast() {
    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
        
        if (previousInput !== '' && operator !== '') {
            updateDisplay(previousInput + ' ' + operator + ' ' + currentInput);
        } else {
            updateDisplay(currentInput);
        }
    } else if (operator !== '') {
        // Se não há input atual, remove o operador
        operator = '';
        currentInput = previousInput;
        previousInput = '';
        updateDisplay(currentInput);
    }
}

/**
 * Manipula eventos do teclado
 * @param {KeyboardEvent} event - Evento do teclado
 */
function handleKeyboard(event) {
    event.preventDefault();
    
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        deleteLast();
    }
}

// Event Listeners
document.addEventListener('keydown', handleKeyboard);

// Previne que o usuário digite diretamente no display
display.addEventListener('keydown', function(event) {
    event.preventDefault();
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay('');
    console.log('Calculadora carregada com sucesso!');
});