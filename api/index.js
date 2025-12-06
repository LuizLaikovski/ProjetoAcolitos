import express from "express";
import cors from "cors";
import acolitosRoutes from "./routes/acolitos.js"; // mesmo nome do arquivo!
import { db } from "./db.js";
import bcrypt from "bcryptjs";

const app = express();

app.use(cors());
app.use(express.json());

// Prefixo opcional
app.use("/", acolitosRoutes);

const ensureAdminUser = () => {
  const user = "Bruno";
  const plain = "Bruno123";
  db.query("SELECT user FROM adms WHERE user = ?", [user], async (err, rows) => {
    if (err) return;
    if (rows.length === 0) {
      const hash = await bcrypt.hash(plain, 10);
      db.query("INSERT INTO adms (user, password) VALUES (?, ?)", [user, hash]);
    }
  });
};

ensureAdminUser();

// Exportar o app para Vercel
export default app;

// Iniciar servidor apenas em desenvolvimento local
if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 8800;
    app.listen(port, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
}
