//Defenition of what a boat is, andt it's parameters.

class Boat {  
    constructor(x,y,length,orientation){ //Constructor for the boat.
        this.x = x;
        this.y = y;
        this.length = length;
        this.orientation = orientation;  
    }


    SetShipLength() { //Sets the length of the boat.
        const minBoatLength = 2;
        const maxBoatLength = parseInt(this.size / 2); //The max length of the boat is half the size of the board.

        for (let i = 0; i < this.size; i++) {
            const boatLength = this.GetRandomNumber(minBoatLength, maxBoatLength); //Gets a random number between the min and max boat length.
            const orientation = this.GetRandomNumber(0, 1);
            const x = this.GetRandomNumber(0, this.size - 1); //Gets a random x coordinate.
            const y = this.GetRandomNumber(0, this.size - 1); //Gets a random y coordinate.

            this.boats.push(new Boat(x, y, boatLength, orientation)); //Adds the boat to the array.
        }
    }

    SetAllBoats() { //Sets all the boats on the board.
        for (let i = 0; i < this.boats.length; i++) {
            this.SetBoat(this.boats[i]);
        }

        this.SetShipLength();
    }


    BuildBoats() { //Builds the boats on the board.
        let boardCopy = Boat.CopyArrayOfObjects(this.board); 
        let direction = this.GetDirections();
        let BoatCoordinates = [];
        let startPoint = {
            x: this.GetRandomNumber(0, this.size - 1),
            y: this.GetRandomNumber(0, this.size - 1)
        };

        let curentPoint;

        for (let i = 0; i < this.boats.length; i++) { //Loops through all the boats.
            
            let nextPoint = {
                x: startPoint.x,
                y: startPoint.y
            };

            if (this.IsValidPoint(nextPoint)) { //Checks if the next point is valid.
                curentPoint = nextPoint;
                startPoint = nextPoint;
                BoatCoordinates.push(curentPoint);
            } else { //If the next point is not valid, it will try to find a new point.
                i--;
            }

            if(!this.IsValidPoint(boardCopy,nextPoint)){ //If the boat is not valid, it will be removed from the array.
                this.invalidAttempts += 1;
                this.BuildBoats(Boat);
                return;
            }
            curentPoint = nextPoint;
            BoatCoordinates.push(curentPoint);
            this.SetBoat(this.boats[i], boardCopy, curentPoint);  

            if (this.boats[i].orientation === 0) { //If the boat is horizontal.
                direction = this.GetDirections();
            }

            nextPoint = this.GetNextPoint(curentPoint, direction); //Gets the next point.

            if (this.IsValidPoint(nextPoint)) { 
                curentPoint = nextPoint;
                startPoint = nextPoint;
                BoatCoordinates.push(curentPoint); 
            } else {
                i--;
            }
        }

    }

    

       
} export default Boat; //Exports the class.


