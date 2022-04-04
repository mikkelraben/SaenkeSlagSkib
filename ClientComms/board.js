class board{
    squares = [];
    boats = [];
    constructor(squares, boats){
        this.squares = squares;
        this.boats = boats;
    }
    getSquares(){
        return this.squares;
    }
    getBoats(){
        return this.boats;
    }
    setSquares(squares){
        this.squares = squares;
    }
    setBoats(boats){
        this.boats = boats;
        for(let i = 0; i < this.boats.length; i++){
            //set squares to boats
            this.boats[i].getSquares();
        }
    }
}