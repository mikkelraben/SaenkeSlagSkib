import Square from "./Square";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Boat} from './Boat';
import { BoardSize } from "./Constants";

export default function Board(props) {
    //states for board
    const [squares, setState] = useState(Array(BoardSize*BoardSize).fill(0));

    //styling for the board
    const boardStyle = {
        width: 32*BoardSize+"px",
        height: 32*BoardSize+"px",
        display: "grid",
        gridTemplateColumns: "repeat("+BoardSize+", 1fr)",
        gridTemplateRows: "repeat("+BoardSize+", 1fr)",
        gridGap: "0px",
        gridAutoRows: "1fr",
        gridAutoColumns: "1fr"
    }

    const isCrossOnSquare = (index) => { //check if the cross is on the square
        if(props.cross){
            for(let i = 0; i < props.cross.length; i++){ //for each cross
                if(props.cross[i]===index){ //if the cross is on the square
                    return true;
                }
            }
            return false; //if the cross is not on the square
        }
    }

    // when boats updates update state
    useEffect(() => { 
        const squares = Array(BoardSize*BoardSize).fill(0); //create an array of squares
        //console.log(boats);
        if(props.boats){
            for(let i = 0; i < props.boats.length; i++){
                const boat = props.boats[i];
                for(let j = 0; j < boat.length; j++){
                    const x = boat.x + (boat.direction ? j : 0);
                    const y = boat.y + (boat.direction ? 0 : j);
                    squares[x+y*BoardSize] = i+1;
                }
            }
        }
        
        //console.log(squares);
        setState(squares);
    }, [props.boats]);

    // move or create a boat
    const handleBoatMove = (index, x, y,direction, length) => {
        //if the index is -1 then the boat is new
        if(index === -1){
            //copy the boats array
            //console.log(props.boats)
            const newBoats = [...props.boats];
            //add the new boat
            newBoats.push({x, y, direction, length});
            //update the state
            props.setBoats(newBoats);
        }else{
            //copy the boats array
            const newBoats = [...props.boats];
            //update the boats position
            newBoats[index].x = x;
            newBoats[index].y = y;
            //update the state
            props.setBoats(newBoats);
        }
    }
    
    function isBoatOnSquare(index){ //check if the boat is on the square
        //check if boat is on square and return index
        if(!props.boats){
            return -1;
        }
        for(let i = 0; i < props.boats.length; i++){
            if((props.boats[i].x === (index % BoardSize)) && (props.boats[i].y === (Math.floor(index / BoardSize)))){
                return i;
            }
        }
        return -1;
    }
    
    return ( //return the board
        <div style={{display: "inline-grid"}}>
            <DndProvider backend={HTML5Backend}>
                <div className="board" style={ boardStyle }>
                    {squares.map((square, index) => {
                        return <Square key={index} index={index} handleBoatMove={handleBoatMove} BoardPlacable={props.isDonePlacing||props.isRecieving} state={squares} children={
                            isBoatOnSquare(index) !== -1 ? <Boat index={isBoatOnSquare(index)} length={props.boats[isBoatOnSquare(index)].length} direction={props.boats[isBoatOnSquare(index)].direction} draggable={!props.isDonePlacing&&!props.isRecieving}/> : null }
                            cross={isCrossOnSquare(index)} setCross={props.setCross}/>
                    })}
                </div>                
                {!props.isDonePlacing&&!props.isRecieving&&
                <div style={{position: "relative", top: 50}}>
                    <Boat index={-1} length={2} left={50} direction={false} draggable={true}/>
                    <Boat index={-1} length={3} left={90} direction={false} draggable={true}/>
                    <Boat index={-1} length={4} left={130} direction={false} draggable={true}/>
                    <Boat index={-1} length={2} left={10} top={80} direction={true} draggable={true}/>
                    <Boat index={-1} length={3} left={10} top={120} direction={true} draggable={true}/>
                    <Boat index={-1} length={4} left={10} top={160} direction={true} draggable={true}/>
                </div>}


            </DndProvider>
        </div>

    );
}