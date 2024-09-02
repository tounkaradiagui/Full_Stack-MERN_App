import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
dotenv.config();
import productRoutes from './routes/product.js'

// console.log(process.env.MONGO_URI);

const app = express();
app.use(express.json()); //Allows us to accept JSON data in the req.body
// const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Backend is working as expected!'); // Send a response back to the client
});

app.use("/api/products", productRoutes);


// Start the server on port 3000
app.listen(5000, () => {
    connectDB();
    console.log("Server is running on http://localhost:5000");
});