//import "./square.css";
import { useDrop } from 'react-dnd';
import { DraggableItems, BoardSize }from './Constants';
import React from 'react';

const CanDropOnSquare = (item, index, state, isDonePlacing) => { //check if the boat can be dropped on the square
    if(isDonePlacing){
        return false;
    }
    const x = index % BoardSize;
    const y = Math.floor(index / BoardSize);
    const boatlength = item.length;
    const boatdirection = item.direction;
    if(boatdirection === true){ //if the boat is vertical
        if(x + boatlength <= BoardSize){ //if the boat is not too long
            for(let i = 0; i < boatlength; i++){ //check if the boat is already on the board
                if(state[x+i+y*BoardSize] !== 0 && state[x+i+y*BoardSize] !== (item.index+1)){ 
                    return false;
                }
            }
            return true; //if the boat is not on the board and is not too long then it can be dropped
        }
    }else{ //if the boat is horizontal
        if(y + boatlength <= BoardSize){ //if the boat is not too long
            for(let i = 0; i < boatlength; i++){ //check if the boat is already on the board
                if(state[x+y*BoardSize+i*BoardSize] !== 0 && state[x+y*BoardSize+i*BoardSize] !== (item.index+1)){
                    return false; //if the boat is on the board then it can't be dropped
                }
            }
            return true; //if the boat is not on the board and is not too long then it can be dropped
        }
    }
    return false; 
}

export default function Square(props){ //square component
    const x = props.index % BoardSize;
    const y = Math.floor(props.index / BoardSize);

    const [{isOver, canDrop}, dropRef] = useDrop({
        accept: DraggableItems.BOAT, //accept boats
        drop: (item) => {
            props.handleBoatMove(item.index, x, y, item.direction, item.length);
        },
        canDrop: (item) => { //check if the boat can be dropped on the square
            return CanDropOnSquare(item, props.index, props.state, props.BoardPlacable);
        },
        isOver: (monitor) => { //check if the boat is over the square
            return monitor.isOver();
        },
        collect: (monitor) => ({ //collect the data from the monitor
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()

        }),
    });

    const handleSquareclick = () => { //click on the square
        props.setCross(props.index);
    }

    return ( //render the square
        <div>
            <div ref={dropRef} onClick={handleSquareclick} className="square" style={{ //style the square
                height:32,
                width:32,
                border:"0.1px solid black",
                background: isOver&&canDrop  ?"yellow":"white",
                position: 'relative',
                margin:"0px 0px -1px -1px"}}>
                {props.children}
                {props.cross?<div className="cross" style={{textAlign:"center",lineHeight:"32px",height:"100%"}}>X</div>:null}
            </div>
            
        </div>

    );
}

