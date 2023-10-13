# PROJECT 1:

## Game you want to do:
Checkers (player vs. player, no AI)

## Wireframe of your game:
[Figma wireframe](https://www.figma.com/file/X6TPI7B6WfPM88ueXNryOd/Untitled?type=design&node-id=0%3A1&mode=design&t=srduHdn1zlyYr3LF-1)


## Brief psuedocode for gameplay:
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
        * example image: ![init function result image](https://imgur.com/a/VndqyHU "init function result")


        - set up frame work (constants, state variables, cached elements, event listeners, functions (init and render))
        - state variables
            -board is 8 arrays, each with 8 zeros (1 for black, -1 for red)
        - set up init: how should the game look in the beginning of a match, remember to render
        - set up render
        - add constants, state variables, and cached elements as you go
        - event listeners
            - select which piece to move
            - pieces can only move diagonally (hint: +/-1 cr +/-1 r)
            - pawns should only move towards the opposite side of the board, cannot move backwards
            - pawns can either move one diagonal space or jump as many times as desired and possible
            - click for movement to valid destination
            - jumps should remove opponent pieces from the board
            - not MVP: can add removed pieces to removed pieces section of the webpage
            - queens move diagonally but in any direction that's available
            - pawns who reach the last row of the opposite side become queens
            - check for pieces left on each side after jump, if no pieces left, then game over - side with pieces remaining is the winner
        - init
            - show determining number of starting pieces
            - tracking who's turn is it to start with, can start with just player 1
        - render
            - which pieces were capture from the board and remove those pieces from the board
            - where living pieces were moved to

===========================