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
            <title>Item Detail - ${name}</title>
            <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="/public/css/style.css">
        </head>
        <body>
            <div style="max-width: 600px; margin: 50px auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center;">
                <h1 style="color: var(--primary-color);">ชื่อเมนู: ${name}</h1>
                <h2>ราคา: ${price} บาท</h2>
                <div class="nav-links">
                    <a href="/menu">กลับหน้าเมนู</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
