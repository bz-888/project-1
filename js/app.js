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
let selectedPieceId;



// cached elements

// caching elements by class
const turnIndicatorEl = document.querySelector(".turnIndicator");
const endTurnButtonEl = document.querySelector(".endTurnButton");
const restartButtonEl = document.querySelector(".restartButton");
const messageEl = document.querySelector(".message");
const boardEl = document.querySelector(".board");




// event listeners

// end your turn
endTurnButtonEl.addEventListener("click", endTurn);

// restarts the game using init
restartButtonEl.addEventListener("click", init);

// click on a game piece to move
boardEl.addEventListener("click", movePiece);



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
    

    turn = "black";
    winner = null;

    console.log(turn);
    render();
}

function render() {
    renderBoard();
    renderWinner();
}

// show the game pieces
function renderBoard() {
    // pull each array from the boards array and call each array rowArr and remember the index number of each sub-array
    board.forEach(function(rowArr, rowIdx) {
        // in each sub array, label the value as cellValue and lavel the index as colIdx, standing for column index
        rowArr.forEach(function(cellValue, colIdx) {
            // create a cellID variable to hold the id name of each game piece
            const cellID = `gpc${colIdx}r${rowIdx}`;
            // create an element variable for each cellID
            const cellEl = document.getElementById(cellID);
            // set the background color of cellEl by the value as defined in COLORS object
            cellEl.style.backgroundColor = COLORS[cellValue];
            cellEl.innerText = cellValue;
        });
    });
}

function movePiece(event) {
    validPiece(event);
};

function validPiece(event) {
    if (turn === "black" && event.target.innerText === "-1") {
        if (event.target.style.border === "3px solid yellow") {
            event.target.style.border = "";
        } else {
            event.target.style.border = "3px solid yellow";
            selectedPieceId = event.target.getAttribute("id");
        }
    } else if (turn === "red" && event.target.innerText === "1") {
        if (event.target.style.border === "3px solid yellow") {
            event.target.style.border = "";
        } else {
            event.target.style.border = "3px solid yellow";
            selectedPieceId = event.target.getAttribute("id");
        }
    } else {
        console.log("Not this side's turn!");
    }
}

function validDestination(event) {

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

    if (blackCount === 0) {
        winner = "Red";
    } else if (redCount === 0) {
        winner = "Black";
    }
}

function endTurn() {
    if (turn === "black") {
        turn = "red";
    } else {
        turn = "black";
    }
    console.log(turn);
};