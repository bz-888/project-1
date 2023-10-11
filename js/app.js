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
let selectedDestinationId;



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
    turnIndicatorEl.innerText = "Black side's turn!"
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
    selectPiece(event);
    selectDestination(event);
};

function selectPiece(event) {
    if (turn === "black" && event.target.innerText === "-1") {
        // unselects a selected piece by removing yellow border and by emptying selectedPieceId variable
        if (event.target.style.border === "3px solid yellow") {
            event.target.style.border = "";
            selectedPieceId = "";
            // print message
            messageEl.innerText = "Black piece unselected!"
        } else {
            // removes highlight from all pieces
            board.forEach(function(rowArr, rowIdx) {
                rowArr.forEach(function(cellValue, colIdx) {
                    const cellID = `gpc${colIdx}r${rowIdx}`;
                    const cellEl = document.getElementById(cellID);
                    cellEl.style.border = "";
                })
            })
            // highlights selected piece
            event.target.style.border = "3px solid yellow";
            // identify selected piece
            selectedPieceId = event.target.getAttribute("id");
            // print message
            messageEl.innerText = "Black piece selected!"
        }
    } else if (turn === "red" && event.target.innerText === "1") {
        // unselects a selected piece by removing yellow border and by emptying selectedPieceId variable
        if (event.target.style.border === "3px solid yellow") {
            event.target.style.border = "";
            // print message
            messageEl.innerText = "Red piece unselected!"
        } else {
            // removes highlight from all pieces
            board.forEach(function(rowArr, rowIdx) {
                rowArr.forEach(function(cellValue, colIdx) {
                    const cellID = `gpc${colIdx}r${rowIdx}`;
                    const cellEl = document.getElementById(cellID);
                    cellEl.style.border = "";
                })
            })
            // highlights selected piece
            event.target.style.border = "3px solid yellow";
            // identify selected piece
            selectedPieceId = event.target.getAttribute("id");
            // print message
            messageEl.innerText = "Red piece selected!"
        }
    } else if (turn === "black" && event.target.innerText === "1") {
        messageEl.innerText = "It's not Red side's turn!";
    } else if (turn === "red" && event.target.innerText === "-1") {
        messageEl.innerText = "It's not Black side's turn!";
    }
}

function selectDestination(event) {
    // grab the element of the selected piece based on the ID gathered in the selectPiece function
    const selectedPieceEl = document.getElementById(selectedPieceId);
    // grab the column and row numbers of the selected piece, this will be used to update the values in the board array
    const selectedPieceCol = selectedPieceId[3];
    const selectedPieceRow = selectedPieceId[5];
    // grab the id of the clicked target destination
    const selectedDestinationId = event.target.getAttribute("id");
    // grab the element of the selected destination based on the ID gathered in the line above
    const selectedDestinationEl = document.getElementById(selectedDestinationId);
    // grab the column and row numbers of the selected piece, this will be used to update the values in the board array
    const selectedDestinationCol = selectedDestinationId[3];
    const selectedDestinationRow = selectedDestinationId[5];
    
    
    if (selectedPieceEl.innerText === "-1") {
        // update innerText to accomodate for future peice selection
        selectedPieceEl.innerText = "0";
        selectedDestinationEl.innerText = "-1";
        // update the value of the board so the piece reappears in the new location visually
        board[selectedPieceRow][selectedPieceCol] = 0;
        board[selectedDestinationRow][selectedDestinationCol] = -1;
        render();
    }
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
        console.log(`Winner is ${winner}!`)
    } else if (redCount === 0) {
        winner = "Black";
        console.log(`Winner is ${winner}!`)
    }
    
}

function endTurn() {
    if (turn === "black") {
        turn = "red";
        turnIndicatorEl.innerText = "Red side's turn!"
    } else {
        turn = "black";
        turnIndicatorEl.innerText = "Black side's turn!"
    }
};