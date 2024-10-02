const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/auth');
const accessRoutes = require('./routes/access');
const personRoutes = require('./routes/person');
const roomRoutes = require('./routes/room');
const administrationRoutes = require('./routes/administration');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');

dotenv.config();

dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/accesses', accessRoutes);
app.use('/api/persons', personRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/administration', administrationRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API de Gestión de Coworking');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));