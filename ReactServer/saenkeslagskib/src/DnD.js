//Make it possible to drag an item.

import React from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import Square from './Square'


const Boat = ({ boat, size, onClick }) => {
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

    const style = {
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
    }

    return (
        <div ref={drag} style={style}>
            <div className="boat" onClick={onClick}>
                {boat.position.map((position, i) => (
                    <Square
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
