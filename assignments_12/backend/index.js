const express = require('express');
const cors = require('cors');
const typeRoutes = require('./routes/typeRoutes');
const menuRoutes = require('./routes/menuRoutes');
const { loadUser } = require('./auth');
const { router: authRoutes } = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(loadUser);

// Routes
app.use('/api/type', typeRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/check', (req, res) => {
  res.json({ message: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
