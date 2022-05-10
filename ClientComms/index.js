const { Server } = require("socket.io");

const io = new Server({cors: { //allow cross origin requests
    origin: "*",
}});

io.on("connection", (socket) => { //when a client connects
    socket.on("Init", data => {
        //parse data from json to list of boats
        try {
            const boats = JSON.parse(data);
            const squares = [];
            for (let i = 0; i < (10*10); i++) { //create a list of squares
                squares.push(-1); 
            }
            console.log(boats);
            socket.broadcast.emit("Init", boats);
        } catch (error) { //if the data is not valid
            console.err(error);
            console.log(data);
            socket.broadcast.emit("Init", {boats: []}); //send an empty list
        }
        //create list of squares
        console.log("Data");
        console.log(data);
        console.log("Data parsed");
    });
    //console.log("a user connected");
});

io.listen(3001); //start listening on port 3001