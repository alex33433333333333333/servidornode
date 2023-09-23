const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configura CORS para permitir el acceso desde tu red local
app.use(cors({
  origin: 'https://proyect0012.000webhostapp.com/server', // Reemplaza con la dirección IP y puerto de tu servidor
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });

  socket.on('enviar_mensaje', (mensaje) => {
    console.log('Mensaje recibido:', mensaje);
    
    // Envia el mensaje a todos los clientes conectados
    io.emit('mensaje_recibido', mensaje);
  });
});

const port = process.env.POT || 3000;
server.listen(port, () => {
  console.log(`Servidor Socket.io escuchando en el puerto ${port}`);
});