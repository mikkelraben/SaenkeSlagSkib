import Square from "./Square";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Boat} from './Boat';
import { BoardSize } from "./Constants";

export default function Board(props){
    //states for board
    const [boats, setBoats] = useState([]);
    const [squares, setState] = useState(Array(BoardSize*BoardSize).fill(0));
    const [isDonePlacing, setIsDonePlacing] = useState(false);

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

    // when boats updates update state
    useEffect(() => {
        const squares = Array(BoardSize*BoardSize).fill(0);
        console.log(boats);
        for(let i = 0; i < boats.length; i++){
            const boat = boats[i];
            for(let j = 0; j < boat.length; j++){
                const x = boat.x + (boat.direction ? j : 0);
                const y = boat.y + (boat.direction ? 0 : j);
                squares[x+y*BoardSize] = i+1;
            }
        }
        //console.log(squares);
        setState(squares);
    }, [boats]);

    // move or create a boat
    const handleBoatMove = (index, x, y,direction, length) => {
        //if the index is -1 then the boat is new
        if(index === -1){
            //copy the boats array
            const newBoats = [...boats];
            //add the new boat
            newBoats.push({x, y, direction, length});
            //update the state
            setBoats(newBoats);
        }else{
            //copy the boats array
            const newBoats = [...boats];
            //update the boats position
            newBoats[index].x = x;
            newBoats[index].y = y;
            //update the state
            setBoats(newBoats);
        }
    }

    function isBoatOnSquare(index){
        //check if boat is on square and return index
        for(let i = 0; i < boats.length; i++){
            if((boats[i].x === (index % BoardSize)) && (boats[i].y === (Math.floor(index / BoardSize)))){
                return i;
            }
        }
        return -1;
    }

    return (
        <div style={{display: "inline-grid"}}>
            <DndProvider backend={HTML5Backend}>
                <div className="board" style={ boardStyle }>
                    {squares.map((square, index) => {
                        return <Square key={index} index={index} handleBoatMove={handleBoatMove} BoardPlacable={isDonePlacing||props.isRecieving} state={squares} children={
                            isBoatOnSquare(index) !== -1 ? <Boat index={isBoatOnSquare(index)} length={boats[isBoatOnSquare(index)].length} direction={boats[isBoatOnSquare(index)].direction}/> : null }/>
                    })}
                </div>
                {!props.isRecieving&&
                    <div style={{position: "relative", top: 10, left:"25%"}}>
                        <button onClick={() => {setBoats([]);setIsDonePlacing(false)}}>Reset</button>
                        <button onClick={() => setIsDonePlacing(true)}>Done Placing</button>
                    </div>
                }
                
                {!isDonePlacing&&!props.isRecieving&&
                <div style={{position: "relative", top: 30}}>
                    <Boat index={-1} length={2} left={50} direction={false}/>
                    <Boat index={-1} length={3} left={90} direction={false}/>
                    <Boat index={-1} length={4} left={130} direction={false}/>
                    <Boat index={-1} length={2} left={10} top={80} direction={true}/>
                    <Boat index={-1} length={3} left={10} top={120} direction={true}/>
                    <Boat index={-1} length={4} left={10} top={160} direction={true}/>
                </div>}


            </DndProvider>
        </div>

    );
}