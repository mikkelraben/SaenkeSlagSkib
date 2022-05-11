const { Server } = require("socket.io");

const io = new Server({cors: { //allow cross origin requests
    origin: "*",
}});

var player1 = null;
var player2 = null;
var player1Boats = [];
var player2Boats = [];
var player1crosses = [];
var player2crosses = [];
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
    if(player1 && player2 && player1Boats.length > 0 && player2Boats.length > 0){
        startGame();
    }
}

const startGame = () => {
    console.log("game started");
    player1Turn = false;
    var player1crosses = [];
    var player2crosses = [];
    //for each player send the boats
    player1.emit("Init", {boats: player2Boats, player1: true} );
    player2.emit("Init", {boats: player1Boats, player1: false});
    gameRunning = true;

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
    }
    if(player2){
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
        if(player2 !== null){
            player2.emit("GameOver", null);
            player2 = null;
            var player1crosses = [];
            var player2crosses = [];
        }
        checkifReady();
    } else if(player === player2){
        player2 = null;
        if(player1 !== null){
            player1.emit("GameOver", null);
            player1 = null;
            var player1crosses = [];
            var player2crosses = [];
        }
        checkifReady();
    }
    
    if(player1 === null || player2 === null){
        player1Turn = true;
        gameRunning = false;
        player1Boats = [];
        player2Boats = [];

    }
}

const handleAttack = (player, data) => {
    if(player1Turn){ //if player1's turn
        if(player1){ //if player1 is still connected
            if(player.id == player1.id){ //if player1 is attacking
                const hit = CheckifBoatOnTile(player1, data.index); //check if tile is a boat
                if(player2){ //if player2 is still connected
                    player2.emit("Attack", {index: data.index, hit: hit}); //send attack to player2
                }
                player1.emit("Hit", {index: data.index, hit: hit}); //send hit to player1
                console.log("player1 attacked"); //log attack
                console.log({index: data.index, hit: hit});//log hit
                console.log(data);//log data
                changeTurn();
            }
        }

    } else {
        if(player2){
            if(player.id == player2.id){
                const hit = CheckifBoatOnTile(player2, data.index);
                player2crosses = [...player2crosses, {index:data.index, hit: hit}];
                if(player1){
                    player1.emit("Attack", player2crosses);
                }
                player2.emit("Hit", player2crosses);
                console.log("player2 attacked");
                console.log({index: data.index, hit: hit});
                console.log(data);
                changeTurn();
            }
        }
    }
}

const checkiftilehasboat = (boats, squareIndex) => { //check if tile has a boat
    const x = squareIndex % 8;//get x
    const y = Math.floor(squareIndex / 8); //get y

    console.log(boats); //log boats
    console.log(x); //log x
    console.log(y); //log y

    for(let i = 0; i < boats.length; i++){ //for each boat
        if(boats[i].direction === false){ //if boat is vertical
            for(let j = 0; j < boats[i].length; j++){ //for each tile in boat
                if(boats[i].x === x && boats[i].y+j === y){ //if tile is in boat
                    return true;
                }
            }
        } else { //if boat is horizontal
            for(let j = 0; j < boats[i].length; j++){ //for each tile in boat
                if(boats[i].x+j === x && boats[i].y === y){ //if tile is in boat
                    return true;
                }
            }
        }
    }
    return false;
}

const CheckifBoatOnTile = (player, squareIndex) => { //check if tile has a boat
    if(player === player1){ //if player1
        console.log("player1");
        if(checkiftilehasboat(player2Boats, squareIndex)){ //if tile has a boat
            return true;
        }
    }
    if(player === player2){ //if player2
        console.log("player2");
        if(checkiftilehasboat(player1Boats, squareIndex)){ //if tile has a boat
            return true;
        }
    }
    console.log("no boat");//if no boat
    return false;
}


io.on("connection", (socket) => { //when a player connects
    socket.on("Init", data => { //when a player sends init
        //parse data from json to list of boats
        try { //try to parse data
            if(!gameRunning){ //if game is not running
                const boats = JSON.parse(data); //parse data
                const squares = []; //create list of squares
                for (let i = 0; i < (10*10); i++) { //create a list of squares
                    squares.push(-1); //add -1 to list
                }
                console.log(boats); //print boats
                //socket.broadcast.emit("Init", boats);
                InitPlayers(socket, boats); //send boats to other player
            }else{
                console.log("game already running");
            }

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
    //called when player attacks a tile
    socket.on("Attack", data => {
        handleAttack(socket, data);
    });
    //when player disconnects
    socket.on("disconnect", () => {
        console.log("Disconnected");
        removePlayer(socket);
    });
    //console.log("a user connected");
});

io.listen(3001); //start listening on port 3001