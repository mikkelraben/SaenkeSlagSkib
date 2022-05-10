class board{ //move or create a boat
    squares = [];
    boats = [];
    constructor(squares, boats){ //squares is an array of squares, boats is an array of boats
        this.squares = squares;
        this.boats = boats;
    }
    getSquares(){ //returns an array of squares the boat is on
        return this.squares;
    }
    getBoats(){ //returns an array of boats
        return this.boats;
    }
    setSquares(squares){ //sets the squares
        this.squares = squares;
    }
    setBoats(boats){ //sets the boats
        this.boats = boats;
        for(let i = 0; i < this.boats.length; i++){ //for each boat
            //set squares to boats
            this.boats[i].getSquares();
        }
    }
}