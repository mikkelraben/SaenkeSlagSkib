import Board from "./board";
import io from "socket.io-client";
 
function App() {
  const socket = io("http://localhost:3001");
  socket.on("connect", () => {
    console.log(socket.id);
  });

  return (
    <div className="App">
      <h1>BattleShip Game 0.1</h1> 
        <Board/>
        

    </div>
  );
}

export default App;
