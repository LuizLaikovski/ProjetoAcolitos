import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});

// Testa a conexão
db.connect((err) => {
    if (err) {
        console.error("❌ Erro ao conectar ao banco:", err);
    } else {
        console.log("✅ Conectado com sucesso ao banco de dados Aiven!");
    }
});
