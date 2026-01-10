// server.js
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Servir los archivos de la carpeta public/
app.use(express.static("public"));

// Cada vez que un usuario se conecta
io.on("connection", (socket) => {
  console.log("Usuario conectado");

  // Cuando alguien envía un mensaje, lo enviamos a todos
  socket.on("mensaje", (msg) => {
    io.emit("mensaje", msg);
  });

  // Cuando alguien se desconecta
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

// Puerto 3000 (o el que el host asigne)
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
