const { Server } = require("socket.io");

const io = new Server({cors: { //allow cross origin requests
    origin: "*",
}});

var player1 = null;
var player2 = null;
var player1Boats = [];
var player2Boats = [];
var player1Turn = true;
var gameRunning = false;

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
    logPlayers();
    if(player1 && player2){
        startGame();
    }
}

const startGame = () => {
    console.log("game started");
    player1Turn = false;
    //for each player send the boats
    player1.emit("Init", player2Boats);
    player2.emit("Init", player1Boats);

    changeTurn();
};

const changeTurn = () => {
    if(player1Turn){
        player1.emit("Turn", false);
        player2.emit("Turn", true);
        player1Turn = false;
    }else{
        player1.emit("Turn", true);
        player2.emit("Turn", false);
        player1Turn = true;
    }
}

const addPlayer = (player) => {
    if(!player1){
        player1 = player;
        console.log("player1 added");
        checkifReady();
    }else if(!player2 && player1){
        player2 = player;
        console.log("player2 added");
        checkifReady();
    }else{
        console.log("no more players");
    }
}

const isPlayer = (player) => {
    if(player1){
        if(player.id === player1.id){
            return true;
        }
    }else if(player2){
        if(player.id === player2.id){
            return true;
        }
    }else{
        return false;
    }
}

const addBoats = (player, boats) => {
    if(player === player1){
        player1Boats = boats;
    }else{
        player2Boats = boats;
    }
}

const InitPlayers = (player, boats) => {
    if(isPlayer(player)){
        addBoats(player, boats);
    } else {
        addPlayer(player);
        addBoats(player, boats);
    }
    checkifReady();
}

const removePlayer = (player) => {
    if(player === player1){
        player1 = null;
        player1Boats = [];
        player2Boats = [];
        if(player2 !== null){
            player2.emit("GameOver", null);
        }
        gameRunning = false;
    } else if(player === player2){
        player2 = null;
        player1Boats = [];
        player2Boats = [];
        if(player1 !== null){
            player1.emit("GameOver", null);
        }
        gameRunning = false;
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
            InitPlayers(socket, boats);
        } catch (error) { //if the data is not valid
            console.log(error);
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