# PROJECT 1:

## Game:
Checkers (player versus player, no AI available at this time)

## Screenshot:

![init function result image](https://i.imgur.com/7EtiMFt.png "init function result")


## Technologies Used:
* HTML
* CSS
* JavaScript


## Getting Started:
1. Black always goes first according to Wikipedia.
2. Make your move as black. You must move forward and diagonally onto a brown space.
3. When you have made your move, please click the End Turn button.
4. Red player may now move. When a move has been made, please click end turn.
5. The objective is to eliminate all of your opponent's pieces by jumping over them diagonally.
6. If you need to reset the game, use the Restart button or refresh your browser.


## Next Steps/Future Enhancements:
* Further limit the moves available, e.g. not allowing a black piece to move forward to a brown space that is too far away
* Limit the amount of legal moves per turn
* Allow for piece upgrades into a piece that can move forwards and backwards
* Produce an undo feature that is available only before end turn button is clicked
* Highlight available immediate moves for the selected piece
* Develop a player naming feature
* Develop a scoreboard of win records for the browser session based on the player names
* Develop an all-time scoreboard
* Develop an AI
* Improve quality of visual aesthetics


=========================================


## Wireframe of your game:
[Figma wireframe](https://www.figma.com/file/X6TPI7B6WfPM88ueXNryOd/Untitled?type=design&node-id=0%3A1&mode=design&t=srduHdn1zlyYr3LF-1)

## Pseudocode:
### index.html
1. set up boilerplater
2. connect style.css and app.js to index.html
3. create two divs for the two sides of the board, name the first one panelSide
    1. create a static info div for the title (h1), description (h3), and dedication (p)
    2. create a controls div for end turn button and restart button, both are button elements
    3. create a notification div for turn indicator and message
        * turn indicator should have a heading (h3) for as a label and an empty div to serve as a placeholder where text can be inserted
        * likewise, message should have a h3 as a label and an empty div to serve as a placeholder where text can be inserted

4. name the second div, boardSide
    1. create element for board, div
    2. create element for game spaces, c1 through c8 and r1 through r8, set class for whiteSpace and brownSpace, divs within board div
    3. create element for each game piece within each game space, divs with game space divs, label them with an id in the same structure as the game spaces so you know where each game piece belongs to (I used "gpc#r#")

### style.css
1. set global styles, font and margin
2. set up body
    * set body as flexbox, it defaults to row orientation which we want, panelSide div on the left side and boardSide div on the right side
    * set desired background
    * set a gap so the panelSide and boardSide have a slight gap to separate them clearly
    * align items based on your preference, I chose center alignment
3. set up panel
    * set as flexbox
    * set column for `flex-direction`
    * set a static width so the changing message lengths don't expand and contract the overall panel width and board position
4. set up board
    * set board as `display: grid`
    * set a border
    * set up 8 columns and 8 rows of equal width for our game spaces
    * set a width and height that are each divisible by 8
    * set dark spaces class properties
        * choose color
        * height and width should be 1/8 of the height and width of the entire board
        * set as flexbox so you can center the game piece vertically and horizontally
        * set contents of dark game space as vertically and horizontally centered using `justify-content` and `align-items`
    * repeat what you did for dark spaces but with the light colored spaces class

### app.js
1. set up framework (constants, state variables, cached elements, event listeners, functions)
2. define state variables
    * `let board;`: this sets a reusable placeholder for the values on the board
    * `let turn;`: this sets a reusable placeholder for who's turn it is
    * `let winner;`: this sets a reusable placeholder for who the winner is
    * `let selectedPieceId;`: this sets a reusable placeholder for what the selected piece is
    * `let selectedDestinationId;`: this sets a resusable placeholder for where we want the selected piece to go
    * `let clickCount;`: this keeps track of what number click it is (1st click for selecting a piece and 2nd click for moving a piece to a destination)
3. define constants: set up an object where -1 is black, 0 is transparent, and 1 is red
4. define cached elements
    * `const turnIndicatorEl = document.querySelector(".turnIndicator");`: selects the empty div element under the turn indicator label
    * `const endTurnButtonEl = document.querySelector(".endTurnButton");`: selects the end turn button element
    * `const restartButtonEl = document.querySelector(".restartButton");`: selects the restart button element
    * `const messageEl = document.querySelector(".message");`: selects the empty div element under the message label
    * `const boardEl = document.querySelector(".board");`: selects the element representing the board
5. set up event listeners
    * `endTurnButtonEl.addEventListener("click", endTurn);`: set up an event listener to listen for a click on the endTurn button, when it is clicked, run the endTurn function
    * `restartButtonEl.addEventListener("click", init);`: set up an event listener to listen for a click on the restart button, when it is clicked, run the init function to set the webpage to how it is upon start up
    * `boardEl.addEventListener("click", selectPiece);`: set up an event listener to listen for a click on the board, when a click on the board happens, run the selectPiece function
    * `boardEl.addEventListener("click", selectDestination);`: set up an event listener to listen for a click on the board, when a click on the board happens, run the selectDestination function
6. set up functions
    * call the init function
    * set up init function
        * set up an array with 8 sub-arrays, with each sub-array having 8 values: with -1 indicating black pieces, 0 indicating a transparent pice (AKA empty space), and 1 indicating red pieces
        * set clickCount as zero in anticipation of the first click on the board
        * set turn to "black" as according to Wikipedia's description of checkers rules, which state that black goes first
        * set a starting message
        * set winner to null
        * call the render function to populate the webpage with the correct visuals
        * example image: 
        
        ![init function result image](https://i.imgur.com/7EtiMFt.png "init function result")
    
    * set up the render function
        * call the renderBoard function
            * set up the renderBoard function as such...
            * iterate through each sub-array in the board element array, calling each sub-array "rowArr" which represents an array that represents a row, keep track of the index of each sub-Array with a variable named rowIdx
            * iterate through each value in the sub-Array which we can call using rowArr, hold the value of each number in the array using a variable such as cellValue and hold the index/position of each number using colIdx
            * rowIdx represents the row number and colIdx represents the column number, this gives us a coordinate from which we can pull our DOM element from above from our HTML, let's all the concatenated string selectedPieceId
            * we can now grab an element, call it cellEL, using the coordinates our rowIdx and colIdx
            * depending on the value we pulled earlier, we can use our constant COLORS to determine the background color of our game piece element (black, transparent, or red)
            * add the cellValue as the innerText value of the cellEl, this way we can refer to the value later on to determine if the cell is black, empty, or red
            * we don't want the innerText showing, show we can make the innerText color property = "transparent"
        * call the renderWinner function
            * set up the renderWinner function as such...
            * use this logic
                * if there are no black pieces left, red wins
                * if there are no red pieces left, black wins
    
    * set up the selectPiece function
        * add `clickCount++`: this adds one to the clickCount every time the board is clicked
        * write all the following code under a conditional that only activates if the clickCount is 1
        * if the piece we clicked is black and the it's black side's turn and it already has a yellow border, remove the highlighting border from it, update message to say that a black piece is unselected, and reset clickCount to zero
        * if there wasn't a border there, remove borders from the rest of the board and add a border to the black piece that was clicked and update the message to say that a black piece was selected
        * repeat this logic for the red pieces on red's turn
        * if the turn (whether it's red's or black's) don't match the color of the piece selected, inform the user by printing a message in the messageEl and reset clickCount to zero

    * set up the selectDestination function
        * write all the following code under a conditional that only activates if the clickCount is two
        * define the selectedPieceEl using the selectedPieceId
        * define selectedPieceRow and selectedPieceCol using selectedPieceId's various index positions of the string
        * use `event.target.getAttribute("id")` to get the selectedDestinationId
        * define selectedDestinationEl using selectedDestinationId
        * define selectedDestinationRow and selectedDestinationCol using selectedDestinationId
        * if the selectedPieceEl is a black pieces (innerText = -1):
            * to deal with some potential errors and invalid moves:
                * if the event.target is a a brown space, meaning the space on the board behind/under the game piece rather than where the actual game piece will appear, print an error message in messageEl, remove the border from the selectedPieceEl, reset the clickCount to zero, then return out of the function
                * if the event.target is a white space (either the actual space behind the where the game piece would be or where the actual game piece would be), print out an error message in messageEl, remove the border from the selectedPieceEl, reset the clickCount to zero, then return out of the function
            * to handle when a black piece skips over a red piece:
                * we can recognize an attack/skip if the row of the destination space is two units greater than the row value of the selected space, we can right a conditional for this
                    * Note: we use `parseInt` because innerText is represented as a string, and we need it represented as an interger
                * because we know the origin of the selected piece and the destination space, we can use some math to figure out where the targeted piece is located
                    * if the target piece is red (innerText === 1), then make it transparent using
            * if the piece did not move two rows in distance, did it move less than 0 rows in distance? Meaning, did the black piece move background?
                * a conditional is written here to prevent this from occurring
                * print an error message, remove the border from the selected piece and reset clickCount to zero
            * at line 228 in the code, the piece either successufully skipped over a red piece or simply moved to an empty space
                * make the origin piece / selected piece transparent and make the destination piece black by updating both the values in the array (for DOM color update purposes) and update the innerText for (color identification purposes)
        * repeat these steps and this logic for if the piece selected is a red piece
        * after either a red piece or a black piece has moved successfully, reset the clickCount to zero
    * set up endTurn function
        * if the turn is currently black's turn, when the endTurn button is clicked, make it red's turn and display that in the turn indicator div element
        * if the turn is currently red's turn, when the endTurn button is click, make it black's turn and displate that in the turn indicator div element

=========================================