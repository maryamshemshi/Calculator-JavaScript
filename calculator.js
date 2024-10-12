let input = document.getElementById('input');
let numbers = document.querySelectorAll('button.numbers');
let operators = document.querySelectorAll('button.operators');
let result = document.getElementById('result');
let clear = document.getElementById('clear');
let decimal = document.getElementById('decimal');
let integer = [];

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function () {
        input.value += this.value;
        integer.push({
            value: this.value,
            type: 'integer'
        })

    });
}

for (let j = 0; j < operators.length; j++) {
    operators[j].addEventListener("click", function () {
        input.value += this.value
        integer.push({
            value: this.value,
            type: 'operator'
        })
    });
}

function calculate(operator, argument1, argument2, lastOperation) {
    switch (operator) {
        case '+':
            argument1 += argument2;
            break;
        case '-':
            argument1 = (argument1 ===0 ? argument2 : argument1 -= argument2 );
            break;
        case '*':
            argument1 = (argument1 || 1) * argument2;
            break;
        case '/':
            argument1 = argument1 === 0 ? argument2 : argument1 / argument2;
            break;
        case '=':
            argument1 = calculate(lastOperation, argument1, argument2);
            break;
        default:
            console.count()
    }

    return argument1;
}


result.addEventListener("click", function (e) {
    integer.push({
        value: '=',
        type: 'operator'
    });

    let argument1 = 0;
    let lastOperation = null;
    let argument2 = null;
    let temp = '';

    for (let i = 0; i < integer.length; i++) {
        const currentInput = integer[i];

        if (currentInput.type === 'operator') {
            argument2 = Number(temp);
            temp = '';
        } else {
            temp += currentInput.value;
        }

        if (argument2 !== null) {
            argument1 = calculate(currentInput.value, argument1, argument2, lastOperation);
            argument2 = null;
            lastOperation = currentInput.value;
        }
    }

    input.value += ' =' + argument1;
});

clear.addEventListener("click", function () {
    integer = []
    input.value = []
})

decimal.addEventListener("click", function () {
    if (integer[integer.length - 1].type === 'decimal')
        return;

    input.value += this.value;
    integer.push({
        type: 'decimal',
        value: '.'
    })
})
