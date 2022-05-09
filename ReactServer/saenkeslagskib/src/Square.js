//import "./square.css";
import { useDrop } from 'react-dnd';
import { DraggableItems, BoardSize }from './Constants';
import React from 'react';

const CanDropOnSquare = (item, index, state, isDonePlacing) => {
    if(isDonePlacing){
        return false;
    }
    const x = index % BoardSize;
    const y = Math.floor(index / BoardSize);
    const boatlength = item.length;
    const boatdirection = item.direction;
    if(boatdirection === true){
        if(x + boatlength <= BoardSize){
            for(let i = 0; i < boatlength; i++){
                if(state[x+i+y*BoardSize] !== 0 && state[x+i+y*BoardSize] !== (item.index+1)){
                    return false;
                }
            }
            return true;
        }
    }else{
        if(y + boatlength <= BoardSize){
            for(let i = 0; i < boatlength; i++){
                if(state[x+y*BoardSize+i*BoardSize] !== 0 && state[x+y*BoardSize+i*BoardSize] !== (item.index+1)){
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}

export default function Square(props){
    const x = props.index % BoardSize;
    const y = Math.floor(props.index / BoardSize);

    const [{isOver, canDrop}, dropRef] = useDrop({
        accept: DraggableItems.BOAT,
        drop: (item) => {
            props.handleBoatMove(item.index, x, y, item.direction, item.length);
        },
        canDrop: (item) => {
            return CanDropOnSquare(item, props.index, props.state, props.isDonePlacing);
        },
        isOver: (monitor) => {
            return monitor.isOver();
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()

        }),
    });

    return (
        <div>
            <div ref={dropRef} className="square" style={{
                height:32,
                width:32,
                border:"0.1px solid black",
                background: isOver&&canDrop  ?"yellow":"white",
                position: 'relative'}}>
                {props.children}
            </div>
            
        </div>

    );
}

