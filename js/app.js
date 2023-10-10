// constants

const COLORS = {
    "-1": "black",
    "0": 'transparent',
    "1": "red",
}

// state variables

// declaring state variables that will change as the game progresses
let board;
let turn;
let winner;



// cached elements

// caching elements by class
const turnIndicatorEl = document.querySelector(".turnIndicator");
const endTurnButtonEl = document.querySelector(".endTurnButton");
const restartButtonEl = document.querySelector(".restartButton");
const resultEl = document.querySelector(".result");


// event listeners

// end your turn
endTurnButtonEl.addEventListener("click", endTurn());

// restarts the game using init
restartButtonEl.addEventListener("click", init());

// functions

init();

function init() {
    // starts the game with a 8 arrays representing each row and 8 values in each array representing each column within each row
    board = [
        [-1, 0, -1, 0, -1, 0, -1, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1]
    ];
    

    turn = -1;
    winner = null;

    render();
}

function render() {
    renderBoard();
    renderWinner();
}

function renderBoard() {
    board.forEach(function(rowArr, rowIdx) {
        rowArr.forEach(function(cellValue, colIdx) {
            const cellID = `gpc${colIdx + 1}r${rowIdx + 1}`
            const cellEl = document.getElementById(cellID);
            cellEl.style.backgroundColor = COLORS[cellValue];
        });
    });
};

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

function endTurn() {
    if (turn === -1) {
        turn = turn + 2;
    } else {
        turn = turn - 2;
    }
};