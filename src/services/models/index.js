const mysqlConnection = require('app/app/database/mysql-connection');

export const getModels = async () => {
    try {
        const results = await new Promise((resolve, reject) => {
            // Obtengo todos los modelos de smart glasses e ids desde la base de datos
            mysqlConnection.query('select * from models;', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        return results;
    } catch (error) {
        throw error
    }
}

