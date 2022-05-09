import { DraggableItems } from "./Constants"
import { useDrag } from "react-dnd"

export function Boat(props){
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

    const GenerateBoat = () => {
        let boat = "";
        for (let i = 0; i < props.length; i++) {
            boat += "🚤";
        }
        return boat;
    }

    const style = {
        cursor: "move",
        // Janky way to get the boat to be centered
        height: props.direction===false ? (33*props.length)-5+"px" : 28+"px",
        width: props.direction===true ? (33*props.length)-5+"px" : 28+"px",
        border: "2px solid black",
        background: "transparent",
        display: isDragging&&props.index!==-1 ? "none":"block",
        position: "absolute",
        top: props.top,
        left: props.left,
        zIndex: 1,
        fontSize: "1.3rem",
        lineHeight: "2rem",
    }
    
    return(
        <div ref={dragRef} style={style}>
            {GenerateBoat()}
        </div>
    )
}