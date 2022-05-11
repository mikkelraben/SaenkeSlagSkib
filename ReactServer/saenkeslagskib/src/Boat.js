import { DraggableItems } from "./Constants"
import { useDrag } from "react-dnd"

export function Boat(props){ //props: x, y, direction, length, index
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: DraggableItems.BOAT,
        item: {
            index: props.index,
            length: props.length,
            direction: props.direction
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    }));

    const style = { //style the boat
        cursor: "move",
        display: isDragging&&props.index!==-1 ? "none":"block",
        position: "absolute",
        top: props.top,
        left: props.left,
        zIndex: 1,
    }
    
    return( //render the boat
        <div ref={dragRef} style={style}>
            <img alt="boat" src={process.env.PUBLIC_URL + '/Bot'+(props.length-1)+'.png'} style={props.direction===false ? {transform:"rotate(90deg)", transformOrigin:"16px 16px"}:{}}/>
        </div>
    )
}