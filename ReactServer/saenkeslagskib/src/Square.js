function Square(props){
    return (
        <button className="square">
        <span>
                {props.value}
        </span>
        </button>
    );
}

export default Square;