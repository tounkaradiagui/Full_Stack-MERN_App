import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import path from 'path';
dotenv.config();
import productRoutes from './routes/product.js'

// console.log(process.env.MONGO_URI);

const app = express();
app.use(express.json()); //Allows us to accept JSON data in the req.body
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Backend is working as expected!'); // Send a response back to the client
});

app.use("/api/products", productRoutes);

const __dirname = path.resolve();

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
    
}

// Start the server on port 3000
app.listen(port, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${port}`);
});