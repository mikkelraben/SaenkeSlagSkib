import Board from "./board";
import {io} from "socket.io-client";
import React from "react";

 
function App() {
  const socket = io("http://localhost:3000");
  socket.on("connect", () => {
    console.log(socket.id); //Prints the socket id.
  });

  const boardposition={
      //center of the page
      margin: "auto",
      display: "grid",
      width: "542px",
      gridTemplateColumns: "256px 256px",
      columnGap: "20px",
  }

  return (
    <div className="App">
      <h1>BattleShip Game 0.1</h1> 
      <div style={{width:"100%", height:"100%", margin:"auto"}}>
        <div style={boardposition}>
          <Board isRecieving={false}/>
          <Board isRecieving={true}/>
        </div>
      </div>



    </div>
  );
}

export default App;
