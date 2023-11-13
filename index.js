let first_num = 0;
let second_num = 0;
let opertor = '';      let result;
let prev;           //keep previous operator to operate when people press operator instead of =
let flag = false;
let mode = 0;       //0 for int mode 1 for float 

function removeLastCharacter() {
    const t = document.querySelector('.curr');
    t.textContent = t.textContent.slice(0, -1);
    if (t.textContent == '') {
        t.textContent = '0';
    }
}
const delet = document.querySelector('#delete');
delet.addEventListener('click', removeLastCharacter());
function reset() {
    const t = document.querySelector('.curr');
    t.textContent = '0';
    const hist = document.querySelector('.previous');
    hist.textContent = '';
    mode = 0;
    first_num = 0; second_num = 0;
    opertor = '';
    prev = '';
    result = '';
    flag = 0;
}
const clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
    reset();
});

const buttons = document.querySelectorAll('.buttons');

buttons.forEach((butt) => {
    butt.addEventListener('click', () => {
        calcing(butt.id);
    });
});

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}


function evaluation(operand1, operatori, operand2) {
    console.log(operand1, operatori, operand2);
    let a, b;
    if (mode = 0) {
        a = parseInt(operand1);
        b = parseInt(operand2);
    }
    else {
        a = parseFloat(operand1);
        b = parseFloat(operand2);
    }
    mode = 0;
    switch (operatori) {
        case "+":
            return (roundResult(a + b)).toString();
            break;
        case "-":
            return (roundResult(a - b)).toString();
            break;
        case "/":
            if (b == 0) {
                alert("You can't divide by 0");
                return '0';
            }
            return (roundResult(a / b)).toString();

            break;
        case "*":
            return (roundResult(a * b)).toString();
            break;
        case '':
            const hist = document.querySelector('.previous');
            hist.textContent=b.toString()+'=';
            return b;
        default:
            console.log(operatori);
            break;
    }
}

function calcing(x) {
    const t = document.querySelector('.curr');
    const hist = document.querySelector('.previous');
    console.log(x);
    if (x in ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']) {
        const text = t.textContent;
        if (mode == 0) {
            if (text == '0' || !flag) {
                t.textContent = x;
            }
            else {
                t.textContent = text + x;
            }
        }
        else {
            t.textContent = text + x;
        }
        flag = true;
    }
    else if (x == '*' || x == '/' || x == '-' || x == '+') {
        mode = 0;
        prev = opertor;
        opertor = x;
        const text = t.textContent;
        if (!flag) {
            hist.textContent = first_num + x;
        }
        if (first_num == 0 && flag) {
            first_num = text;
            hist.textContent = first_num + x;
            t.textContent = '0';

        }
        else {
            if (flag) {
                result = evaluation(first_num, prev, text);
                first_num = result
                t.textContent = result;
                hist.textContent = result + opertor;
                flag = false;
            }
        }

    }
    else if (x == "=") {
        if (flag) {
            const text = t.textContent;
            second_num = text;
            hist.textContent = hist.textContent + second_num + '=';
            result = evaluation(first_num, opertor, second_num);
            first_num = result;
            second_num = 0;
            t.textContent = result;
            flag = false;
        }
    }
    else if (x == ".") {
        if (mode == 0) {
            t.textContent = t.textContent + '.';
        }
        mode = 1;

    }
}

document.addEventListener('keydown', function (event) {

    const key = event.key;
    if (key >= '0' && key <= '9') {
        calcing(key);
    } else if (key === '/' || key === '*' || key === '-' || key === '+') {
        calcing(key);
    } else if (key === 'Enter') {
        calcing('=');
    } else if (key === 'Escape') {
        reset();
    } else if (key === 'Backspace') {
        // Handle Backspace key press
        removeLastCharacter();
    }
});