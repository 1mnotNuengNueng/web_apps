const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoute = require('./routes/userRoute'); // 1. นำเข้า userRoute

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 2. ใช้งาน route ที่ /api/user
app.use('/api/user', userRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
