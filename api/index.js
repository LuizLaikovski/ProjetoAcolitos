import express from "express";
import cors from "cors";
import acolitosRoutes from "./routes/acolitos.js"; // mesmo nome do arquivo!

const app = express();

app.use(cors());
app.use(express.json());

// Prefixo opcional
app.use("/", acolitosRoutes);

// Exportar o app para Vercel
export default app;

// Iniciar servidor apenas em desenvolvimento local
if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 8800;
    app.listen(port, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
}