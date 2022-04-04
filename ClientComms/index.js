const { Server } = require("socket.io");

const io = new Server({cors: {
    origin: "*",
}});

io.on("connection", (socket) => {
    socket.on("Init", (data) => {
        console.log(data);
    });
    console.log("a user connected");
});

io.listen(3001);