import express from "express";
import cors from "cors";
import acolitosRoutes from "./routes/acolitos.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", acolitosRoutes);

export default app;

if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 8800;
    app.listen(port, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
}