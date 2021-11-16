const previousOperation = document.querySelector('.previous-operation');
const currentOperation = document.querySelector('.current-operation');

const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const clrscr = document.querySelector('.clrscr');
const deleteBtn = document.querySelector('.delete');
const equals = document.querySelector('.equals');

class Calculator {
    operation = '';

    constructor(previousOperation, currentOperation) {
        this.previousOperation = previousOperation;
        this.currentOperation = currentOperation;
    }
    appendNumber(number) {
        if (this.currentOperation.innerHTML.includes('.') && number === '.') return;
        this.currentOperation.innerHTML += number;
    }
    clrScr() {
        this.currentOperation.innerHTML = '';
        this.previousOperation.innerHTML = '';
        this.operation = '';
    }
    delete() {
        this.currentOperation.innerHTML = this.currentOperation.innerHTML.toString().slice(0, -1);
    }
    calculate() {
        let firstNumber = parseFloat(this.previousOperation.innerHTML.slice(0, -1));
        let secondNumber = parseFloat(this.currentOperation.innerHTML);

        console.log(firstNumber);
        console.log(secondNumber);
        
        if (this.operation === '+') {
            return firstNumber + secondNumber;
        } else if (this.operation === '-') {
            return firstNumber - secondNumber;
        } else if (this.operation === '*') {
            return firstNumber * secondNumber;
        } else if (this.operation === '/') {
            return firstNumber / secondNumber;
        }
    }
    updateDisplay(result) {
        if (this.currentOperation.innerHTML === '') {
            this.currentOperation.innerHTML = this.previousOperation.innerHTML.slice(0, -1);
            this.previousOperation.innerHTML = '';
        } else {
            this.clrScr();
            this.currentOperation.innerHTML = result;
        }
    }
    chooseOperation(operation) {
        if (this.operation !== '') {
            this.updateDisplay(this.calculate());
        }
        this.operation = operation;
        this.previousOperation.innerHTML = this.currentOperation.innerHTML + operation;
        this.currentOperation.innerHTML = '';
    }
}

const calculator = new Calculator(previousOperation, currentOperation);

// Add number buttons
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', () => {
        calculator.appendNumber(numbers[i].innerHTML);
    });
}

// Operation buttons
for (let i = 0; i < operations.length; i++) {
    operations[i].addEventListener('click', () => {
        calculator.chooseOperation(operations[i].innerHTML);
    });
}

// C button
clrscr.addEventListener('click', () => {
    calculator.clrScr();
});

// Delete button
deleteBtn.addEventListener('click', () => {
    calculator.delete();
});

// Equals button
equals.addEventListener('click', () => {
    calculator.updateDisplay(calculator.calculate());
});