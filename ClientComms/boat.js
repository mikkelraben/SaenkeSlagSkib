class boat { 
    boat_id;
    x;
    y;
    length;
    orientation;

    constructor(boat_id, x, y, shape) { //shape is an array of objects with x and y properties
        this.boat_id = boat_id;
        this.x = x;
        this.y = y;
        this.shape = shape;
    }
    
    getSquares() { //returns an array of squares the boat is on
        var squares = [];
        for (var i = 0; i < this.shape.length; i++) { //for each shape
            var square = this.shape[i];
            var x = this.x + square.x;
            var y = this.y + square.y;
            squares.push({x: x, y: y});
        }
        return squares; //returns an array of squares the boat is on
    }
}