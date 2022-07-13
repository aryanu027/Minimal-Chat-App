const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.roomId).emit("recieved_message", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
server.listen(3001, () => {
  console.log("Listening on Port 3001...");
});
