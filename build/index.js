const cellWSize = 10;
const cellHSize = 10;


$(document).keydown(function(event){
    var keyCode = event.which;
    if (keyCode === 38)
    {
        snake0.changeDirection('up');
    }
    else if (keyCode === 40)
    {
        snake0.changeDirection('down');
    }
    else if (keyCode === 37)
    {
        snake0.changeDirection('left');
    }
    else if (keyCode === 39)
    {
        snake0.changeDirection('right');
    }
})

function nextCell(x0,y0,direction0,currentCell){
    if (direction0 == 'up'){
        x1 = x0;
        y1 = y0 + cellHSize;
    }
    else if (direction0 == 'down'){
        x1 = x0;
        y1 = y1 - cellHSize;
    } 
    else if (direction0 == 'left'){
        x1 = x0 + cellWSize;
        y1 = y1;
    }
    else if (direction0 == 'right'){
        x1 = x0 - cellWSize;
        y1 = y1;
    }
    else{
        x1 = x0;
        y1 = y1 - cellHSize;
        console.log('No direction specified. it is assumed to be up');
    }
    return new Cell(x1,y1,direction0,currentCell);
}

class Snake{
    constructor(x0,y0,initialLength,initialDirection){
        this.x0 = x0;
        this.y0 = y0;
        this.snakeLength = 0;
        this.initialDirection = initialDirection;     
        this.cells = [];
        this.turnPoints = [];
        this.increaseLengthIntervals = 3;
        this.timeStep = 0;
        let currentCell = -1
        this.cells.push(new Cell(x0,y0,initialDirection,currentCell));
        this.snakeLength += 1
        for (let i=0;i<initialLength-1;i++){            
            this.addCell();            
        }   
    }
    runSnake(){
        this.moveForward().then(this.increaseLength(this.timeStep));
        this.checkCollision();
        this.timeStep += 1;        
    }
    addCell(){
        let xLastCell = this.cells[this.snakeLength-1].x0
        let yLastCell = this.cells[this.snakeLength-1].y0
        let direction0 = this.cells[this.snakeLength-1].direction0
        let currentCell = this.snakeLength-1;
        this.cells.push(nextCell(xLastCell,yLastCell,direction0,currentCell));
        this.snakeLength += 1        
    }
    moveForward(){
        return new Promise((resolve,reject) => {
            let i = 0;
            let direction0 = this.cells[i].direction0
            let dx;
            let dy;
            if (direction0 === 'up'){
                dx = 0;
                dy = -cellHSize;
            }else if (direction0 === 'down'){
                dx = 0;
                dy = cellHSize;
            }
            else if (direction0 === 'left'){
            dx = -cellWSize;
            dy = 0;
            }
            else if (direction0 === 'right'){
                dx = cellWSize;
                dy = 0;
            }
            this.cells[i].x0 += dx
            this.cells[i].y0 += dy;
            $(`#cell-${i}`).animate({left: this.cells[i].x0},'fast')
            $(`#cell-${i}`).animate({top: this.cells[i].y0},'fast')
    
            for(let i=1;i<this.snakeLength-1;i++){
                this.turnPoints.forEach(element => {
                    if (this.cells[i].x0 === element[0] && this.cells[i].y0 === element[1]){
                        this.cells[i].direction0 = element[2];                    
                    }
                });
                let direction0 = this.cells[i].direction0
                let dx;
                let dy;
                if (direction0 === 'up'){
                    dx = 0;
                    dy = -cellHSize;
                }else if (direction0 === 'down'){
                    dx = 0;
                    dy = cellHSize;
                }
                else if (direction0 === 'left'){
                dx = -cellWSize;
                dy = 0;
                }
                else if (direction0 === 'right'){
                    dx = cellWSize;
                    dy = 0;
                }            
                this.cells[i].x0 += dx
                this.cells[i].y0 += dy;
                $(`#cell-${i}`).animate({left: this.cells[i].x0},'fast')
                $(`#cell-${i}`).animate({top: this.cells[i].y0},'fast')
            }
            i = this.snakeLength - 1;
            for (let j=0;j<this.turnPoints.length;j++){
                if (this.cells[i].x0 === this.turnPoints[j][0] && this.cells[i].y0 === this.turnPoints[j][1]){
                    this.cells[i].direction0 = this.turnPoints[j][2];
                    this.turnPoints.splice(i,1);
                }
            }
            direction0 = this.cells[i].direction0;
            if (direction0 === 'up'){
                dx = 0;
                dy = -cellHSize;
            }else if (direction0 === 'down'){
                dx = 0;
                dy = cellHSize;
            }
            else if (direction0 === 'left'){
            dx = -cellWSize;
            dy = 0;
            }
            else if (direction0 === 'right'){
                dx = cellWSize;
                dy = 0;
            }        
            this.cells[i].x0 += dx
            this.cells[i].y0 += dy;
            $(`#cell-${i}`).animate({left: this.cells[i].x0},'fast')
            $(`#cell-${i}`).animate({top: this.cells[i].y0},'fast')
        })
    }

    changeDirection(newDirection){
        let active = true;
        if (newDirection === 'up' && this.cells[0].direction0 === 'down'){
            active = false;
        }
        if (newDirection === 'down' && this.cells[0].direction0 === 'up'){
            active = false;
        }
        if (newDirection === 'left' && this.cells[0].direction0 === 'rigth'){
            active = false;
        }
        if (newDirection === 'right' && this.cells[0].direction0 === 'left'){
            active = false;
        }   
        if (active){
            this.cells[0].direction0 = newDirection;
            this.turnPoints.push([this.cells[0].x0,this.cells[0].y0,newDirection])
        }
    }

    increaseLength(timeStep){
        if (timeStep % this.increaseLengthIntervals === 0){
            this.addCell()
        }
    }

    checkCollision(){
        if ((this.cells[0].x0 === 0 || this.cells[0].x0 >= 384 - cellWSize) || (this.cells[0].y0 === 0 || this.cells[0].y0 === 384 - cellHSize)) {
            this.collide();
        }else
        {
            for (let i=1;i<this.snakeLength;i++){
                if (this.cells[i].x0 === this.cells[0].x0 && this.cells[i].y0 === this.cells[0].y0){
                    this.collide()
                }        
            }
        }    
    }
    collide(){
        clearInterval(snakeRunIntervalOBJ);
        $('#game-board').css('background-color','#f27777');
        alert('You lose the game.')
    }
}
class Cell{
    constructor(x0,y0,direction0,currentCell){
        this.x0 = x0;
        this.y0 = y0;
        this.direction0 = direction0;
        $('#game-board').append(`<div id=cell-${currentCell+1} class="cell"></div>`);
        $(`#cell-${currentCell+1}`).addClass('.cell');
        $(`#cell-${currentCell+1}`).css('left',`${x0}px`);
        $(`#cell-${currentCell+1}`).css('top',`${y0}px`);
    } 
}



snake0 = new Snake(150,150,10,'up');

function start(){
    snakeRunIntervalOBJ = setInterval("snake0.runSnake()",1000)
}

function restart(){
    console.log('restarted')
    $('#game-board').css('background-color','rgb(231 229 228)')
    clearInterval(snakeRunIntervalOBJ);
    for(let i=0;i<snake0.snakeLength;i++){
        $(`#cell-${i}`).remove()
        delete snake0.cells[i];
    }
    delete snake0;
    var idsArray = $("[id]").map(function() {
        return this.id;
      }).get();
    console.log(idsArray)
    snake0 = new Snake(150,150,10,'up');
    start()    
}