import express from "express";
import cors from "cors";
import acolitosRoutes from './routes/acolitos.js';

const app = express();

const port = 8800;

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/', acolitosRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});