const { Server } = require("socket.io");

const io = new Server({cors: {
    origin: "*",
}});

io.on("connection", (socket) => {
    socket.on("Init", data => {
        //parse data from json to list of boats
        try {
            const boats = JSON.parse(data);
            const squares = [];
            for (let i = 0; i < (10*10); i++) {
                squares.push(-1); 
            }
            console.log(boats);
            socket.broadcast.emit("Init", boats);
        } catch (error) {
            console.err(error);
            console.log(data);
            socket.broadcast.emit("Init", {boats: []});
        }
        //create list of squares
        console.log("Data");
        console.log(data);
        console.log("Data parsed");
    });
    //console.log("a user connected");
});

io.listen(3001);