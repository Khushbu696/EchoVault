const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

const capsuleRoutes = require('./routes/capsuleRoutes');
app.use('/api/capsules', capsuleRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const scheduleUnlocks = require('./utils/unlockScheduler');
scheduleUnlocks(); // Start the cron job


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('EchoVault API is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
