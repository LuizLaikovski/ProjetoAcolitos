import express from "express";
import cors from "cors";
import acolitosRoutes from "./routes/acolitos.js"; // mesmo nome do arquivo!

const app = express();
const port = 8800;

app.use(cors());
app.use(express.json());

// Prefixo opcional
app.use("/", acolitosRoutes);

app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});