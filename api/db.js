import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

// Exporte como pool, não como db
export const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
    },
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000
});

// Testa a conexão do pool
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Erro ao conectar ao banco:", err);
    } else {
        console.log("✅ Conectado com sucesso ao banco de dados Aiven!");
        connection.release();
    }
});