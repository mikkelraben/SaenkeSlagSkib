import Board from "./board";
import {io} from "socket.io-client";
import React from "react";
import { useEffect, useState } from "react";
import {BoardSize} from "./Constants";
 
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
      const crosses = [...ownX];
      //console.log(crosses);
      crosses.push(data);
      //console.log(crosses);
      setOwnX(crosses);
      console.log(data);
    });
  }, [socket, ownX]);

  useEffect(() => { //when the game starts
    if (!socket) return;
    socket.on("Hit", data => {
      //set the enemy x
      const crosses = [...enemyX];
      //console.log(crosses);
      crosses.push(data);
      //console.log(crosses);
      setEnemyX(crosses);
      console.log(data);
    });
  }, [socket,enemyX]);

  const setCross = (index) => { //set the cross on the square
    const crosses = [...enemyX];
    crosses.push(index);
    setEnemyX(crosses);
    socket.emit("Attack", {index: index});
  }

  const isBoatSunk = (boat) => { //check if the boat is sunk
    let isSunk = true;
    if (boat.direction === false){ //if the boat is vertical
      for (let i = boat.y; i < boat.y + boat.length; i++){ //for each square in the boat
        //Er der et kryds eller ikke!
        var result = isThereX(boat.x+(boat.y+i)*BoardSize);
        //Returner false hvis der ikke er et kryds
        if (result === false){
          isSunk = false;
        }
      }


    }
    else { //if the boat is horizontal
      for (let i = boat.x; i < boat.x + boat.length; i++){ //for each square in the boat
        //Er der et kryds eller ikke!
        var result = isThereX((boat.x+i)+boat.y*BoardSize);
        //Returner false hvis der ikke er et kryds
        if (result === false){
          isSunk = false;
        }
      }
    }
    console.log(isSunk);
  }

  const isThereX = (index) => { //check if there is a x on the square
    if(ownX){
      for(let i = 0; i < ownX.length; i++){ //for each cross
          if(ownX[i].index===index){ //if the cross is on the square
              return ownX[i];
          }
      }
      return false; //if the cross is not on the square
    }
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
            <button onClick={()=>{isBoatSunk(boats[0])}}>Sunk?</button>
          </div>
        </div>
      } 

    </div> 
  );
}

export default App;
