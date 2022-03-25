import "./square.css";

function Square(props){
    const color = props.value === -1  ? "white" : "black";

    const btnStyle = {
        backgroundColor: color,
    }



    return (
        <button className="square" style={btnStyle}>

        </button>
    );
}

export default Square;

