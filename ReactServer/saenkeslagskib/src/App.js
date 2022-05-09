import Board from "./board";
import {io} from "socket.io-client";
import Ship from "./Ship";
import React from "react";

 
function App() {
  const socket = io("http://localhost:3000");
  socket.on("connect", () => {
    console.log(socket.id); //Prints the socket id.
  });

  return (
    <div className="App">
      <h1>BattleShip Game 0.1</h1> 
        <Board/>
    </div>
  );
}

export default App;
