# Snake Game
## Game Description:
 A snake is moving inside the game board. Every time the user pushes any of the arrow keys on the keyboard, its direction changes. The snake will grow a unit every n seconds. The game is over as soon as the snake collides with itself or walls.
## Implementation:

1.	The game board is discretized into n by m cells. Each cell is a div consisting of s-by-s pixels. Actually, a cell is a div element.
2.	Snake is an object with these fields:
    1.	Length (number of cells)
    2.	Head direction
    3.	Array of Cells
    4.	Array of turn points
3. And these methods:
    1.	Increase length
    2.	Move forward
    3.	Check for collision
    4.	Change head direction
    5.	Set turn points
    6.	Change cell direction at turn points
4.	Cell is an object with these fields:
    1.	Position (X,Y)
    2.	Direction

## Procedure:
1.	At start a snake object is created with ncell cells and a random head direction.
2.	At each time step the following actions will take place:
    1.	Move forward
    2.	Increase length (if enough time is passed)
    3.	Check for collision
3.	Whenever user press and arrow key:
    1.	The head direction will be updated 
    2.	A turn point will be added

4. The Move forward method consists of these actions:
    1. For each cell of the snake
        1. check if it is on a turn point, then change the direction toward the turn point direction
        2. change the position toward its direction
    2. For the last cell
        1. check if it is on a turn point
            1. then change the direction toward the turn point direction
            2. Remove this point from turn points array
            3. change the position toward its direction
5. Increase Length:
    1. A new cell will be added to the snake
    2. Its direction will be the same as the last cell
    3. Its position will be calculated by moving the last cell toward opposite to its current direction
    4. The snake length will be increased by 1

6. Check for collision:
    1. For each cell in snake cells array (except its head cell):
    2. If position of snake head is the same as this cell return true
    3. Return false



 
