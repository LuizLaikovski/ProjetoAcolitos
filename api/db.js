import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

// Use POOL em vez de createConnection
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
    },
    connectionLimit: 10, // Número máximo de conexões
    acquireTimeout: 60000, // 60 segundos
    timeout: 60000, // 60 segundos
    reconnect: true
});

// Testa a conexão do pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Erro ao conectar ao banco Aiven:", err);
    } else {
        console.log("✅ Conectado com sucesso ao banco de dados Aiven!");
        connection.release(); // Libera a conexão de volta para o pool
    }
});

// Eventos do pool para debug
pool.on('acquire', (connection) => {
    console.log('🔗 Conexão adquirida do pool');
});

pool.on('release', (connection) => {
    console.log('🔄 Conexão liberada de volta ao pool');
});

pool.on('error', (err) => {
    console.error('💥 Erro no pool:', err);
});