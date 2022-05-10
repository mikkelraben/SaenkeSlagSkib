const { Server } = require("socket.io");

const io = new Server({cors: { //allow cross origin requests
    origin: "*",
}});

var player1 = null;
var player2 = null;
var player1Boats = [];
var player2Boats = [];
var player1BoatsPlaced = false;
var player2BoatsPlaced = false;
var player1Turn = true;

const logPlayers = () => {
    if(player1){
        console.log("user1: "+player1.id);
    }
    if(player2){
        console.log("user2: "+player2.id);
    }
    console.log("\n");
}

const checkifReady = () => {
    //console.log(player1BoatsPlaced, player2BoatsPlaced);
    logPlayers();
    if(player1 && player2 && player1BoatsPlaced && player2BoatsPlaced){
        startGame();
    }
}

const startGame = () => {
    console.log("game started");
    player1Turn = true;
    //for each player send the boats
    player1.emit("Init", player2Boats);
    player2.emit("Init", player1Boats);
    //for each player send the turn
    player1.emit("Turn", true);
    player2.emit("Turn", false);
};
    

const addPlayer = (player, boats) => {
    if(player1 === null && player2 !== player){
        player1 = player;
        player1Boats = boats;
        player1BoatsPlaced = true;
        checkifReady();
    } else if(player2 === null && player1 !== player){
        player2 = player;
        player2Boats = boats;
        player2BoatsPlaced = true;
        checkifReady();
    }
}

const removePlayer = (player) => {
    if(player === player1){
        player1 = null;
        player1Boats = [];
        player1BoatsPlaced = false;
    } else if(player === player2){
        player2 = null;
        player2Boats = [];
        player2BoatsPlaced = false;
    }
    checkifReady();
    if(player1 === null && player2 === null){
        player1Turn = true;
    }

}

io.on("connection", (socket) => {
    socket.on("Init", data => {
        //parse data from json to list of boats
        try {
            const boats = JSON.parse(data);
            const squares = [];
            for (let i = 0; i < (10*10); i++) { //create a list of squares
                squares.push(-1); 
            }
            console.log(boats);
            //socket.broadcast.emit("Init", boats);
            addPlayer(socket, boats);
        } catch (error) { //if the data is not valid
            console.err(error);
            console.log(data);
            //socket.broadcast.emit("Init", {boats: []}); //send an empty list
        }
        //create list of squares
        console.log("Data");
        console.log(data);
        console.log("Data parsed");
    });
    //check if player is ready
    socket.on("Ready", data => {
        console.log("Ready");
        console.log(data);
        socket.broadcast.emit("Ready", data);
    });
    //called when player attacks a tile
    socket.on("Attack", data => {
        console.log("Attack");
        console.log(data);
        socket.broadcast.emit("Attack", data);
    });
    //when player disconnects
    socket.on("disconnect", () => {
        console.log("Disconnected");
        removePlayer(socket);
    });
    //console.log("a user connected");
});

io.listen(3001); //start listening on port 3001