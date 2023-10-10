// constants


// state variables

let board;
let turn;
let winner;



// cached elements
const turnIndicatorEl = document.querySelector(".turnIndicator");
const startButtonEl = document.querySelector(".startButton");
const restartButtonEl = document.querySelector(".restartButton");
const resultEl = document.querySelector(".result");


// event listeners

startButtonEl.addEventListener("click", start());

// functions

init();

function init() {
    board = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    
    turn = null;
    winner = null;

    render();
}

function start() {
    board = [
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ]

    render()
}

function render() {
    renderBoard();
    renderTurn();
    renderWinner();
    renderMove();
}

function renderBoard() {
    
}

function renderWinner() {
    let blackCount = 0;
    let redCount = 0;
    board.forEach((row) => {
        row.forEach((space) => {
            if (space === -1) {
                blackCount ++;
            } else if (space === 1) {
                redCount ++;
            }
        })    
    })

    if (blackCount === 0 && redCount === 0) {
        winner = null;
    } else if (blackCount === 0) {
        winner = "Red";
    } else if (redCount === 0) {
        winner = "Black";
    }
}