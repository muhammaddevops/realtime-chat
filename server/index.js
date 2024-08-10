const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors()); // applying the middleware is fine for most projects to avoid connection errors.

const server = http.createServer(app);
// we use "new" because Server is a class
const io = new Server(server, {
  // io will be the variable we use to do anything with socket.io. We pass in our http "server".
  cors: {
    // people have issues usually with cors
    origin: "http://localhost:3000", // this is the origin for our frontend and React runs on localhost:3000,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // To broadcast a message to everyone listening to "receive_message" on the frontend use the below:
  // socket.on("send_message", (data) => {
  //   socket.broadcast.emit("receive_message", data);
  // });

  // socket.join we specify a value (a room id as a number for us), we create an event called join_room and we are listening then joining the room id sent from the frontend
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    // the "to" is specifying where to broadcast the message
    socket.to(data.room).emit("receive_message", data);
  });
});

const SERVER_PORT = 3001;
server.listen(SERVER_PORT, () => {
  console.log(`server is running on port ${SERVER_PORT}`);
});
