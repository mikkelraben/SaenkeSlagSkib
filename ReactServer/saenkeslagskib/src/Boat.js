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
        canDrag: () => props.draggable,
        
    }),[props.draggable])

    

    var style = { //style the boat
        cursor: props.draggable===true ?"move":"default", //if the boat is draggable
        display: isDragging&&props.index!==-1 ? "none":"block", //if the boat is being dragged
        position: "absolute",  //position the boat
        top: props.top,//props.y*BoardSize,
        left: props.left, //props.x*BoardSize,
        zIndex: 1, //set the z-index
        userSelect: "none", //disable selection
        width: props.direction===true ? props.length*32+"px" : "32px", //set the width
        height:  props.direction===true ? "32px" : props.length*32+"px", //set the height
        draggable: false //disable dragging
    }
    
    return( //render the boat
        <div ref={dragRef} style={style}>
            <img alt="boat" draggable={false} src={process.env.PUBLIC_URL + '/Bot'+(props.length-1)+'.png'} style={props.direction===false ? {transform:"rotate(90deg)", transformOrigin:"16px 16px", }:{}}/>
        </div>
    )
}