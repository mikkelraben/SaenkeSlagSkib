import Board from "./board";
import {io} from "socket.io-client";
import React from "react";
import { useEffect, useState } from "react";

 
function App() { //the main app
  const [boats, setBoats] = useState([]); //the boats
  const [isDonePlacing, setIsDonePlacing] = useState(false); //if the player has placed all boats
  const [socket, setSocket] = useState(null); //the socket
  const [enemyX, setEnemyX] = useState([]); //the enemy x
  const [ownX, setOwnX] = useState([]); //the own x
  const [CurrentTurn, setCurrentTurn] = useState(false); //if it is the players turn
  const [GameStarted, setGameStarted] = useState(false); //if the game has started

  useEffect(() => { //when the app loads
    const socket = io("http://localhost:3001");
    setSocket(socket);
    socket.on("Init", data => {
      //parse data from json to list of boats
      try { //try to parse the data
        const boats = data;
        console.log(boats);
        setGameStarted(true);
      } catch (error) { //if the data is not valid
        console.log(error);
        console.log(data);
      }
    });

    socket.on("Turn", data => {
      //set the current turn
      setCurrentTurn(data);
    });

    socket.on("GameOver", () => {
      //set the game to not running
      setGameStarted(false);
      setBoats([]);
      setEnemyX([]);
      setOwnX([]);
      setIsDonePlacing(false);
    });


    return () => socket.close(); //when the app unloads
  }, []);

  useEffect(() => { //when the game starts
    if (!socket) return;
    socket.on("Attack", data => {
      //set the enemy x
      const enemyX = data;
      const crosses = [...ownX];
      console.log(crosses);
      crosses.push(enemyX);
      console.log(crosses);
      setOwnX(crosses);
      console.log(data);
    });
  }, [ownX, socket]);

  const setCross = (index) => { //set the cross on the square
    socket.emit("Attack", index);
  }



  const DonePlacing = () => { //when the player has placed all boats
    if(boats.length !== 0){   
      setIsDonePlacing(true);
      socket.emit("Init", JSON.stringify(boats)); //send the boats to the enemy
    }
    //console.log(boats);
  }

  const turnText = () => { //return the text for the turn
    if(GameStarted){
      if(CurrentTurn){
        return<h2>Your turn</h2>;
      } else {
        return <h2>Enemy turn</h2>;
      }
    } else {
      return <h2>Game not started</h2>;
    }
  }

  return ( 
    <div className="App"> 
      <h1>BattleShip Game 0.3</h1> 
      {turnText()}
      {socket && 
        <div style={{width:"100%", height:"100%", margin:"auto"}}>
          <div style={{
            margin: "auto",
            display: "grid",
            width: "542px",
            gridTemplateColumns: "256px 256px",
            columnGap: "20px",}}>
            <Board isRecieving={false} boats={boats} setBoats={setBoats} setCross={() => {}} isDonePlacing={isDonePlacing} cross={ownX}/>
            <Board isRecieving={true} setCross={setCross} cross={enemyX}/>
            {!GameStarted&&
            <div style={{position:"relative",top:10}}>
              <button onClick={() => {setBoats([]);setIsDonePlacing(false)}}>Reset</button>
              <button onClick={() => DonePlacing()}>Done Placing</button>
            </div>}
          </div>
        </div>
      } 

    </div> 
  );
}

export default App;
