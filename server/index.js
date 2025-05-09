const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log("MongoDB Connected"))
    .catch( err => console.error(err) );

const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuando en htttp://localhost:${PORT}`);
});