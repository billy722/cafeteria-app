const express = require('express');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('Hellos World desde el Backend!');
});

app.listen(PORT, () => {
    console.log(`Servidor escuando en htttp://localhost:${PORT}`);
})