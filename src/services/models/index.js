const mysqlConnection = require('app/app/database/mysql-connection');

export const getModels = async () => {
    try {
        const results = await new Promise((resolve, reject) => {
            mysqlConnection.query('select * from models;', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        return Response.json(results);
    } catch (error) {
        return Response.json([])
    }
}

