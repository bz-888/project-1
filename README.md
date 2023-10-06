===========================
PROJECT 1 PROPOSAL RUBRIC:
Game you want to do:
    Checkers (player vs. player)

Wireframe of your game:


Brief psuedocode for gameplay:
    -index.html
        -set up boilerplater
        -connect style.ss and app.js to index.html
        -find/create and input black pawn, black queen, red pawn, and red queen as html elements
        -create element for board, likely div
        -create element for each board cell, c1 through c8 and r1 through r8, set class for redSpace and blackSpace, likely divs
        -create element for title, likely h1
        -create element for turn, likely h2
        -create element for captured peices for each side like div - not for MVP
        -create element for restart, likely button
        -create element for winner notification, likely div with h2 and p
    -style.css
        -set global styles, font and margin
        -set board as display: grid
        -set board to have 8 columns and 8 rows using repeat(8, 1fr)
        -set board size
        -center and position h1 (title), h2 (turn indicator), button (restart), div (winner notification)
    -app.js
        - set up frame work (constants, state variables, cached elements, event listeners, functions (init and render))
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
            - 
===========================