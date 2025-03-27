const { Server } = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0';
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (for dev)
  },
});



io.on("connection", (socket) => {
  console.log("🤖 Robot connected via Socket.IO");

  // Handle captions sent by robot
  socket.on("caption", (data) => {
    console.log("📝 Caption:", data);
    io.emit("caption", data); // Forward to all frontends
  });

  // Handle control commands sent by robot
  socket.on("control", (data) => {
    console.log("🎮 Control:", data);
    io.emit("control", data); // Broadcast to React
  });
});

server.listen(PORT, HOST, () => {
    console.log(`✅ Socket.IO server running on http://${HOST}:${PORT}`);
  });