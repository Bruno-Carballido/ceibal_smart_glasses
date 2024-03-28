import { env } from "app/config/env"
// Importa el cliente MySQL
const mysql = require('mysql2');

// Configura los detalles de la conexión a la base de datos
const mysqlConnection = mysql.createConnection({
    host: env.MYSQL_HOSTNAME,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DB
});

// Conecta a la base de datos
mysqlConnection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida correctamente');
});

// Exporta la conexión para poder utilizarla en otros archivos
module.exports = mysqlConnection;