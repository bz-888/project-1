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
let clickCount;



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
boardEl.addEventListener("click", selectPiece);

// click on a destination to move to
boardEl.addEventListener("click", selectDestination);



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
    
    clickCount = 0;
    turn = "black";
    turnIndicatorEl.innerText = "Black side's turn!"
    messageEl.innerText = "New game! Good luck!"
    winner = null;

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
            cellEl.style.color = "transparent";
        });
    });
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
        messageEl.innerText = `${winner} side is the winner!`
    } else if (redCount === 0) {
        winner = "Black";
        messageEl.innerText = `${winner} side is the winner!`
    }
    
}

function selectPiece(event) {
    // the below only activiates when clickCount is at 1
    clickCount++;
    if (clickCount === 1) {

        // only permits a black piece to be selected if it's black side's turn
        if (turn === "black" && event.target.innerText === "-1") {
            // unselects a selected piece by removing yellow border and by emptying selectedPieceId variable
            if (event.target.style.border === "3px solid yellow") {
                event.target.style.border = "";
                selectedPieceId = "";
                // print message
                messageEl.innerText = "Black piece unselected!";
                // reset clickCount
                clickCount == 0;
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
                messageEl.innerText = "Red piece unselected!";
                // reset clickCount = 0;
                clickCount = 0;
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
        
        // when it's black side's turn and the user attempts to click a red piece, show the following message and reset clickCount
        } else if (turn === "black" && event.target.innerText === "1") {
            messageEl.innerText = "It's not Red side's turn!";
            clickCount = 0;
        
        // when it's red side's turn and the user attempts to click a black piece, show the message and reset clickCount
        } else if (turn === "red" && event.target.innerText === "-1") {
            messageEl.innerText = "It's not Black side's turn!";
            clickCount = 0;
        }
    }
}

function selectDestination(event) {
    // the below only activates is clickCount is at two;
    if (clickCount === 2) {

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
            // if you click on the corner of an empty space, it will register with a class of either brownSpace or whiteSpace
            // an error will occur as the code for moving piece below only work when click a destination which is an invisble game piece
            // once a valid destination is placed, the original game piece is made transparent
            // the invisible game piece at the destination space is revealed
            
            // this if statement handles the situation when the space under the gamepiece is clicked as a destination
            if (event.target.className === "brownSpace") {
                messageEl.innerText = "Please click in the center of the destination space rather than a corner. Try again.";
                selectedPieceEl.style.border = "";
                clickCount = 0;
                return;
            // this else if statement handles a situation when a player tries to move to an invalid space, play should be kept on brown spaces
            } else if (event.target.className === "whiteSpace" || event.target.className === "invalidSpace") {
                messageEl.innerText = "This is an invalid space to move to. Please move diagonally on brown spaces."
                selectedPieceEl.style.border = "";
                clickCount = 0;
                return;
            }
            // if we are skipping over a piece, then do the following
            if (parseInt(selectedDestinationRow) - parseInt(selectedPieceRow) === 2) {
                // define the target piece column and row, using parse int to convert string to number
                const targetPieceCol = parseInt(selectedPieceCol) + (parseInt(selectedDestinationCol) - parseInt(selectedPieceCol))/2;
                // target will always be one row below the selected piece
                const targetPieceRow = parseInt(selectedPieceRow) + 1;
                // define a spring as the ID of the target piece element
                const targetPieceId = `gpc${targetPieceCol}r${targetPieceRow}`;
                // grab the element using the ID
                const targetPieceEl = document.getElementById(targetPieceId);
        
                // if the target piece is red when the selected piece is black, remove the red target piece from the board
                if (targetPieceEl.innerText === "1") {
                    targetPieceEl.innerText = "0";
                    board[targetPieceRow][targetPieceCol] = 0;
                }
            // this prevent illegal backwards moves given that the game currently only allows for pawns and does not create queens yet
            } else if (parseInt(selectedDestinationRow) - parseInt(selectedPieceRow) < 0) {
                messageEl.innerText = "This is an illegal move. Please move your piece forward. It is unable to move backwards at this time.";
                selectedPieceEl.style.border = "";
                clickCount = 0;
                return;
            }
            // update innerText to accomodate for future peice selection
            selectedPieceEl.innerText = "0";
            selectedDestinationEl.innerText = "-1";
            // update the value of the board so the piece reappears in the new location visually
            board[selectedPieceRow][selectedPieceCol] = 0;
            board[selectedDestinationRow][selectedDestinationCol] = -1;
            render();
            messageEl.innerText = "Black piece moved!"
    
        } else if (selectedPieceEl.innerText === "1") {

            // this if statement handles the situation when the space under the gamepiece is clicked as a destination
            if (event.target.className === "brownSpace") {
                messageEl.innerText = "Please click in the center of the destination space rather than a corner. Try again.";
                selectedPieceEl.style.border = "";
                clickCount = 0;
                return;
            // this else if statement handles a situation when a player tries to move to an invalid space, play should be kept on brown spaces
            } else if (event.target.className === "whiteSpace" || event.target.className === "invalidSpace") {
                messageEl.innerText = "This is an invalid space to move to. Please move diagonally on brown spaces."
                selectedPieceEl.style.border = "";
                clickCount = 0;
                return;
            }

            // if we are skipping over a piece, then do the following
            if (parseInt(selectedDestinationRow) - parseInt(selectedPieceRow) === -2) {
                // define the target piece column and row, using parse int to convert string to number
                const targetPieceCol = parseInt(selectedPieceCol) + (parseInt(selectedDestinationCol) - parseInt(selectedPieceCol))/2;
                // target will always be one row above the selected piece
                const targetPieceRow = parseInt(selectedPieceRow) - 1;
                // define a spring as the ID of the target piece element
                const targetPieceId = `gpc${targetPieceCol}r${targetPieceRow}`;
                // grab the element using the ID
                const targetPieceEl = document.getElementById(targetPieceId);
        
                // if the target piece is red when the selected piece is black, remove the red target piece from the board
                if (targetPieceEl.innerText === "-1") {
                    targetPieceEl.innerText = "0";
                    board[targetPieceRow][targetPieceCol] = 0;
                }

             // this prevent illegal backwards moves given that the game currently only allows for pawns and does not create queens yet
            } else if (parseInt(selectedDestinationRow) - parseInt(selectedPieceRow) > 0) {
                messageEl.innerText = "This is an illegal move. Please move your piece forward. It is unable to move backwards at this time.";
                selectedPieceEl.style.border = "";
                clickCount = 0;
                return;
            }

            // update innerText to accomodate for future peice selection
            selectedPieceEl.innerText = "0";
            selectedDestinationEl.innerText = "1";
            // update the value of the board so the piece reappears in the new location visually
            board[selectedPieceRow][selectedPieceCol] = 0;
            board[selectedDestinationRow][selectedDestinationCol] = 1;
            render();
            messageEl.innerText = "Red piece moved!"
        }
        
        // reset clickCount
        clickCount = 0;
    }
}

function endTurn() {
    // check if someone won with the end of this turn
    if (winner === null) {
        // if turn is black when End Turn is clicked, then turn becomes Red
        if (turn === "black") {
            turn = "red";
            turnIndicatorEl.innerText = "Red side's turn!"
            messageEl.innerText = "Red side's turn!"
        // if turn is red when End Turn is clicked, then turn becomes Black
        } else {
            turn = "black";
            turnIndicatorEl.innerText = "Black side's turn!"
            messageEl.innerText = "Black side's turn!"
        }
    } else {
        renderWinner()
    }
    const selectedPieceEl = document.getElementById(selectedPieceId);
    selectedPieceEl.style.border = "";
};