# PROJECT 1 PROPOSAL RUBRIC:

## Game you want to do:
Checkers (player vs. player, no AI)

## Wireframe of your game:
[Figma wireframe](https://www.figma.com/file/X6TPI7B6WfPM88ueXNryOd/Untitled?type=design&node-id=0%3A1&mode=design&t=srduHdn1zlyYr3LF-1)


## Brief psuedocode for gameplay:
### index.html
1. set up boilerplater
2. connect style.css and app.js to index.html
3. create two divs for the two sides of the board, name the first one panelSide
    1. create a static info div for the title, description, and dedication


3. create element for board, div
4. create element for game spaces, c1 through c8 and r1 through r8, set class for whiteSpace and brownSpace, divs within board div
5. create element for each game piece within each game space, divs with game space divs
6. create element for title, h1
7. create element for turn indicator, h2
create element for restart, likely button
create element for winner notification, likely div with h2 and p
    -style.css
        -set global styles, font and margin
        -set board as display: grid
        -set board to have 8 columns and 8 rows using repeat(8, 1fr)
        -set board size
        -center and position h1 (title), h2 (turn indicator), button (restart), div (winner notification)
    -app.js
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