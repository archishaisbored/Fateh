const { Server } = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 4000; // Use Render-provided PORT or fallback to 4000
const HOST = '0.0.0.0'; // Bind to all interfaces

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Optional: Add a basic HTTP response for Render's port detection
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Socket.IO server is running");
});

// Attach Socket.IO to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (for dev)
  },
});

// Handle Socket.IO connections
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

// Start the server
server.listen(PORT, HOST, () => {
  console.log(`✅ Socket.IO server running on http://${HOST}:${PORT}`);
});