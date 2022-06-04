class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 3;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {
        this.getNewCoordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell && this.multiply >= 10) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 5
            let bomb = new Bomb(newX, newY)
            BombArr.push(bomb)
        }
    }

    eat(){
        let emptyCells = this.chooseCell(1)
        let newCell = random(emptyCells)
        if(newCell){
            this.energy++
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    
                }
            }
            for(var j in GrassEaterArr){
                if(newX == GrassEaterArr[i].x && newY == GrassEaterArr[i].y){
                    GrassEaterArr.splice(i,1);
                    break;
                }
            }
            if(this.energy >= 13){
                this.mul()
            }
            
        }else{
            this.move()
        }
    }

    move() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
}