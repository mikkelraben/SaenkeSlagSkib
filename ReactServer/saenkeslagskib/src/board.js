import Square from "./Square";

function Board() {

    const size = 10;
        
    const rows = [];
    for (let i = 0; i < size; i++) {
        const squares = [];
        for (let j = 0; j < size; j++) {
            squares.push(<Square key={i * size + j} value={i*size+j} />);
        }
        rows.push(<div key={i} className="board-row">{squares}</div>);
    }

    return (
        <div className="board">
            {rows}
        </div>
    );


} export default Board;