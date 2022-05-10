import Board from "./board";
import {io} from "socket.io-client";
import React from "react";
import { useEffect, useState } from "react";

 
function App() {
  const [boats, setBoats] = useState([]);
  const [enemyBoats, setEnemyBoats] = useState([]);
  const [isDonePlacing, setIsDonePlacing] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    setSocket(socket);
    socket.on("Init", data => {
      //parse data from json to list of boats
      try {
        const boats = data;
        console.log(boats);
        setEnemyBoats(boats);
      } catch (error) {
        console.log(error);
        console.log(data);
        setEnemyBoats([]);
      }
    });

    return () => socket.close();
  }, []);


  
  const DonePlacing = () => {
    setIsDonePlacing(true);
    socket.emit("Init", JSON.stringify(boats));
    //console.log(boats);
  }



  return (
    <div className="App">
      <h1>BattleShip Game 0.1</h1> 
      {socket && 
        <div style={{width:"100%", height:"100%", margin:"auto"}}>
        <div style={{      
          margin: "auto",
          display: "grid",
          width: "542px",
          gridTemplateColumns: "256px 256px",
          columnGap: "20px",}}>
            <Board isRecieving={false} boats={boats} setBoats={setBoats} isDonePlacing={isDonePlacing}/>
            <Board isRecieving={true} boats={enemyBoats} setBoats={setEnemyBoats}/>
            <div style={{position:"relative",top:10}}>
              <button onClick={() => {setBoats([]);setIsDonePlacing(false)}}>Reset</button>
              <button onClick={() => DonePlacing()}>Done Placing</button>
            </div>
        </div>
      </div>
      }




    </div>
  );
}

export default App;
