import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 4000;  // Tente também mudar para 443

const io = new Server(server, { 
  cors: { 
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ["websocket"],  // 🔹 Força WebSocket puro
  allowEIO3: true
});

app.get("/", (req, res) => {
  res.send("🚀 Servidor WebSocket rodando!");
});

io.on("connection", (socket) => {
  console.log(`🟢 Novo cliente conectado! ID: ${socket.id}`);

  socket.on("update-location", (data) => {
    console.log(`📡 Localização recebida do usuário ${data.userId}:`, data);
    io.emit("location-update", data);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Cliente desconectado: ID ${socket.id}`);
  });
});

// 🔹 Alterado para usar qualquer IP disponível
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor WebSocket rodando na porta ${PORT}!`);
});
