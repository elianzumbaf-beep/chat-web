// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Carpeta pública donde está tu index.html y estilos
app.use(express.static('public'));

// Cuando un usuario se conecta
io.on('connection', (socket) => {
  console.log('Un usuario se conectó');

  // Escuchar mensajes del cliente
  socket.on('chat message', (msg) => {
    // Enviar mensaje a todos los usuarios conectados
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Un usuario se desconectó');
  });
});

// Puerto para Render o local
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
