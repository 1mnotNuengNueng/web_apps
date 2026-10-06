const express = require('express');
const cors = require('cors');
const typeRoutes = require('./routes/typeRoutes');
const menuRoutes = require('./routes/menuRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/type', typeRoutes);
app.use('/api/menu', menuRoutes);

// Health check
app.get('/api/check', (req, res) => {
  res.json({ message: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
