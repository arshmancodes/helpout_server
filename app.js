const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use(cors(), (req, res, next) => {
    next()
})


app.use(express.json({ limit: '1000mb' }));

app.use('/auth', authRoutes);

app.listen(3000, () => {
    console.log("Server running at 3000");
});