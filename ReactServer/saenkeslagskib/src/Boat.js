

class Boat {
    constructor(x,y,length,orientation){
        this.x = x;
        this.y = y;
        this.length = length;
        this.orientation = orientation;
    }


    SetShipLength() {
        const minBoat = 3;
        const maxBoat = parseInt(this.size / 2) +1;
        const numberOfBoats = this.GetRandomNumber(minBoat, maxBoat);

        const minBoatLength = 2;
        const maxBoatLength = parseInt(this.size / 2);

        for (let i = 0; i < numberOfBoats; i++) {
            const boatLength = this.GetRandomNumber(minBoatLength, maxBoatLength);
            const orientation = this.GetRandomNumber(0, 1);
            const x = this.GetRandomNumber(0, this.size - 1);
            const y = this.GetRandomNumber(0, this.size - 1);

            this.boats.push(new Boat(x, y, boatLength, orientation));
        }
    }

    SetAllBoats() {
        for (let i = 0; i < this.boats.length; i++) {
            this.SetBoat(this.boats[i]);
        }

        this.SetShipLength();
    }


    BuildBoats() {
        let boardCopy = Boat.CopyArrayOfObjects(this.board);
        let direction = this.GetDirections();
        let BoatCoordinates = [];
        let startPoint = {
            x: this.GetRandomNumber(0, this.size - 1),
            y: this.GetRandomNumber(0, this.size - 1)
        };

        for (let i = 0; i < this.boats.length; i++) {

        }
    }    
}
