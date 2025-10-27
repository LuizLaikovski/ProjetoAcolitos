import express from "express";
import cors from "cors";
import acolitosRoutes from './routes/acolitos.js';

const app = express();

const port = 8800;

app.use(express.json());
app.use(cors());

app.use('/', acolitosRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});