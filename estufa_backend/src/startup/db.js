require('dotenv').config();

const mysql = require('mysql2/promise');

// Configuração da conexão
const pool = mysql.createPool({
    host: 'localhost',   // Altere se o banco estiver em outro host
    user: 'root',        // Seu usuário do MySQL
    password: process.env.SQLPASSWORD,        // Sua senha do MySQL
    database: 'Projetinho', // Nome do banco de dados
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306
});

module.exports = pool;