const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');

dotenv.config();

dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();
const server = http.createServer(app);

// Configurar Socket.io
const io = require('socket.io')(server, {
  cors: {
    origin: '*', // Ajusta esto según tus necesidades de seguridad
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Middleware para pasar io a las rutas
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API de Gestión de Coworking');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));