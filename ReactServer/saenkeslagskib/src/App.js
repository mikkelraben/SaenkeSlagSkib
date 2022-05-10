import Board from "./board";
import {io} from "socket.io-client";
import React from "react";
import { useEffect, useState } from "react";

 
function App() {
  const [boats, setBoats] = useState([]);
  const [isDonePlacing, setIsDonePlacing] = useState(false);

  const socket = io("http://localhost:3000");
  socket.on("connect", () => {
    console.log(socket.id); //Prints the socket id.
  });

  return (
    <div className="App">
      <h1>BattleShip Game 0.1</h1> 
      <div style={{width:"100%", height:"100%", margin:"auto"}}>
        <div style={{      
          margin: "auto",
          display: "grid",
          width: "542px",
          gridTemplateColumns: "256px 256px",
          columnGap: "20px",}}>
            <Board isRecieving={false} boats={boats} setBoats={setBoats} isDonePlacing={isDonePlacing}/>
            <Board isRecieving={true} boats={[]}/>
            <div style={{position:"relative",top:10}}>
              <button onClick={() => {setBoats([]);setIsDonePlacing(false)}}>Reset</button>
              <button onClick={() => setIsDonePlacing(true)}>Done Placing</button>
            </div>
        </div>
      </div>



    </div>
  );
}

export default App;
