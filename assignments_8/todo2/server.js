const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.htm'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.htm'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'info', 'menu.htm'));
});

app.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, 'info', 'order.htm'));
});

// Route with parameters
app.get('/item/:name/price/:price', (req, res) => {
    const name = req.params.name;
    const price = req.params.price;
    res.send(`
        <!DOCTYPE html>
        <html lang="th">
        <head>
            <meta charset="UTF-8">
            <title>Item Detail</title>
        </head>
        <body>
            <h1>ชื่อเมนู: ${name}</h1>
            <h2>ราคา: ${price} บาท</h2>
            <br>
            <a href="/menu">กลับหน้าเมนู</a>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
