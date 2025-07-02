const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://echovault-frontend.netlify.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const capsuleRoutes = require('./routes/capsuleRoutes');
app.use('/api/capsules', capsuleRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const startScheduler = require('./utils/cronScheduler')
startScheduler();

app.get('/', (req, res) => {
  res.send('EchoVault API is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
