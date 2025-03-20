'use strict';

const nextDisplay = document.querySelector('section');
const playField = document.querySelector('fieldset');
const dialog = document.querySelector('dialog');
const weakBtn = document.getElementById('weak');
const strongBtn = document.getElementById('strong');

const setChoice = (choice) => {
    document.body.removeChild(dialog);
    loop(choice);
}

weakBtn.addEventListener('click', setChoice.bind(null, 'dumb'));
strongBtn.addEventListener('click', setChoice.bind(null, 'intelligent'));


const renderNextStone = () => {
    const nextStone = document.createElement('figure');
    nextStone.className = nextDir;
    nextDisplay.removeChild(nextDisplay.firstElementChild);
    nextDisplay.appendChild(nextStone);
}

const renderStone = (dir, col, row) => {
    const newStone = document.createElement('figure');
    newStone.className = dir;
    playField.appendChild(newStone);
    let bottomDist = 775;
    newStone.style.bottom = '775px';
    const fall = setInterval(() => {
        if (bottomDist >= 5+row*50) {
            newStone.style.bottom = bottomDist+'px';
            bottomDist -= 10;
        }else {
            clearInterval(fall);
        }
    }, 10);
    newStone.style.left = String(5+col*50)+'px';
}