import Board from "./board";
import {io} from "socket.io-client";
import React from "react";
import { useEffect, useState } from "react";

 
function App() { //the main app
  const [boats, setBoats] = useState([]); //the boats
  const [enemyBoats, setEnemyBoats] = useState([]); //the enemy boats
  const [isDonePlacing, setIsDonePlacing] = useState(false); //if the player has placed all boats
  const [socket, setSocket] = useState(null); //the socket
  const [enemyX, setEnemyX] = useState([0,3,4]); //the enemy x
  const [ownX, setOwnX] = useState([1,2,5]); //the own x

  useEffect(() => { //when the app loads
    const socket = io("http://localhost:3001");
    setSocket(socket);
    socket.on("Init", data => {
      //parse data from json to list of boats
      try { //try to parse the data
        const boats = data;
        console.log(boats);
        setEnemyBoats(boats);
      } catch (error) { //if the data is not valid
        console.log(error);
        console.log(data);
        setEnemyBoats([]);
      }
    });

    return () => socket.close(); //when the app unloads
  }, []);


  
  const DonePlacing = () => { //when the player has placed all boats
    setIsDonePlacing(true);
    socket.emit("Init", JSON.stringify(boats)); //send the boats to the enemy
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
            <Board isRecieving={false} boats={boats} setBoats={setBoats} isDonePlacing={isDonePlacing} cross={ownX}/>
            <Board isRecieving={true} boats={enemyBoats} setBoats={setEnemyBoats} cross={enemyX}/>
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
