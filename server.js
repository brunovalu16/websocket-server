import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

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

server.listen(4000, "0.0.0.0", () => {
  console.log("🚀 Servidor WebSocket rodando na porta 4000!");
});
