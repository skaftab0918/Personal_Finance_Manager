const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

// Attach Socket.IO to the Express app
app.set('io', io);

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Add a root route
app.get('/', (req, res) => {
  res.send('Welcome to the Expense Tracker API');
});

// Socket.IO authentication
io.use((socket, next) => {
  const token = socket.handshake.auth?.token || socket.handshake.query.token;
  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    return next(new Error("Authentication error: Invalid token"));
  }
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.user.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.user.id);
    socket.disconnect(true);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));