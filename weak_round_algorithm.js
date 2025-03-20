'use strict';

const generateRandomCol = (dir) => {
    const colResult = Math.random();
    let col;
    console.log(colResult);
    if (dir === 'ver') {
        if (colResult > 0.75) {
            col = 3;
        }else if (colResult > 0.5) {
            col = 2;
        }else if (colResult > 0.25) {
            col = 1;
        }else {
            col = 0;        }
    }else if (dir === 'hor') {
        if (colResult > 0.66) {
            col = 2;
        }else if (colResult > 0.33) {
            col = 1;
        }else {
            col = 0;
        }
    }
    return col;
}