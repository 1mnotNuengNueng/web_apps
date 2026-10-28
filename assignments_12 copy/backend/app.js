
const userRoutes = require('../routes/userRoute');


app.use('../users', userRoutes);

module.exports = app;
