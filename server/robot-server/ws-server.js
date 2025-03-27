const { Server } = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 4000; // Render will provide PORT
const HOST = "0.0.0.0"; // Listen on all interfaces (required by Render)

// Basic HTTP server to respond to Render's health checks
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("✅ Socket.IO server is running\n");
});

// Attach socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (adjust for prod)
    methods: ["GET", "POST"]
  }
});

// Socket.IO event handling
io.on("connection", (socket) => {
  console.log("🤖 Robot connected via Socket.IO");

  socket.on("caption", (data) => {
    console.log("📝 Caption:", data);
    io.emit("caption", data); // Send to all clients
  });

  socket.on("control", (data) => {
    console.log("🎮 Control:", data);
    io.emit("control", data); // Broadcast to frontend
  });
});

// Start the server
server.listen(PORT, HOST, () => {
  console.log(`✅ Socket.IO server running on http://${HOST}:${PORT}`);
});
