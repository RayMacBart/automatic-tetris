'use strict';

let roundCount = 0;
let gameOver = false;
let occupation = [
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
];
let nextDir;

const loop = (choice) => {
    setInterval(() => {
        if (roundCount <= 20 && !gameOver) {
            roundCount++;
            if (roundCount > 1) {
                const dir = nextDir;
                let col;
                (choice === 'intelligent') ? col = calcRound(dir) : col = generateRandomCol(dir);
                const row = checkRow(col, dir);
                occupy(dir, col, row);
                renderStone(dir, col, row);
            }
            nextDir = (Math.random() >= 0.5) ? 'ver' : 'hor';
            renderNextStone();
        }
        if (roundCount == 21 && !gameOver) {
            nextDisplay.removeChild(nextDisplay.firstElementChild);
            nextDisplay.textContent = 'END!';
            roundCount++;
        }
    }, 1000);
}

const makeGameOver = () => {
    if (!gameOver) {
        nextDisplay.removeChild(nextDisplay.firstElementChild);
        nextDisplay.style.paddingTop = '10px';
        nextDisplay.style.lineHeight = '35px';
        nextDisplay.textContent = 'Game over!';
    }
    gameOver = true;
}

const checkRow = (col, dir) => {
    let choosenRow = 14;
    for (const field of occupation[col]) {
        if ((dir === 'ver' && field) || dir === 'hor' && 
            (field || occupation[col+1][Math.abs(choosenRow-14)])) {
            break;
        }else if (choosenRow === 0) {
            return choosenRow;
        }else {
            choosenRow--;
        }
    }
    if (dir === 'hor' && choosenRow < 14 || dir === 'ver' && choosenRow < 13) {
        return choosenRow+1;
    }else {
        makeGameOver();
        return choosenRow+1;
    }
}

const occupy = (dir, col, row) => {
    row = Math.abs(row-14);
    let colField2;
    let rowField2;
    if (dir === 'hor') {
        colField2 = col+1;
        rowField2 = row;
    }else if (dir === 'ver') {
        colField2 = col;
        rowField2 = row-1;
    }
        try {
            if (occupation[col][row] || occupation[colField2][rowField2]) {
                throw new Error('field already occupied!');
            }
            occupation[col][row] = true;
            occupation[colField2][rowField2] = true;
        }catch (error) {
            if (error.constructor == TypeError) {
                makeGameOver();
            }
        }
}