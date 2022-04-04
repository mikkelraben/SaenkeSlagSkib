

import React from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import Square from './Square'


const Boat = ({ boat, size, onClick }) => { //Drag and drop
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemTypes.BOAT,
            id: boat.id,
            position: boat.position
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    const style = { //Denne kode kan laves til en 1 linje.
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
    }

    return (
        <div ref={drag} style={style}>
            <div className="boat" onClick={onClick}>
                {boat.position.map((position, i) => (
                    <Square //Position is an array of objects with x and y coordinates.
                        key={i}
                        value={boat.id}
                        x={position.x}
                        y={position.y}
                    />
                ))}
            </div>
        </div>
    )
}


export default Boat
