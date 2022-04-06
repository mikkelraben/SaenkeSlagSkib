
import Square from "./Square";
import "./row.css";
import Boat from "./Boat";
import React from "react";

function renderSquare(i, [BoatX, BoatY]){
    const x = i % 8
    const y = Math.floor(i / 8)
    const isBoatHere = x === BoatX && y === BoatY
    const square = isBoatHere ? <Square value={i} /> : <Square value={-1} />
    const piece = isBoatHere ? <Boat/> : null

    return (
        <div key={i} style={{ width: "12.5%" , height: '12.5%'}}>
            {square}
            {piece}
        </div>
    )

}


function Board() {

    const size = 10;
        
    const rows = [];

    const boats = [
        {
            id: 0,
            position: [
                {
                    x: 8,
                    y: 2
                },
                {
                    x: 8,
                    y: 3
                }
            ]
        },
        {
            id: 1,
            position: [
                {
                    x: 6,
                    y: 2
                },
                {
                    x: 6,
                    y: 3
                }
            ]
        }];

    const squares = [];
    for (let i = 0; i < (size*size); i++) {
        squares.push(renderSquare(-1, [-1, -1]));

    }

    for (let i = 0; i < boats.length; i++) {
        const boat = boats[i];
        for (let j = 0; j < boat.position.length; j++) {
            const position = boat.position[j];
            squares[position.x + position.y * size] = boat.id;
        }
    }

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            if (squares[j + i * size] !== -1) {
                row.push(
                    <Square
                        key={j + i * size}
                        value={squares[j + i * size]}
                    />
                );
            } else {
                row.push(
                    <Square
                        key={j + i * size}
                        value={-1}
                    />
                );
            }
        }

        rows.push(<div key={i} className="board-row">{row}</div>);
    }

    return (
        <div className="board">
            {rows}
        </div>
    );

    


} export default Board;