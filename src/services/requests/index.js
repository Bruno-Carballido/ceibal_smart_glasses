const mysqlConnection = require('app/app/database/mysql-connection');
var moment = require('moment-timezone');



export const saveRequest = async (data) => {
    try {
        const fechaHora = moment().tz('America/Montevideo').format('yyyy-MM-DD hh:mm:ss');
        const results = await new Promise((resolve, reject) => {
            var request = { email: data.email, name: data.name, id_model: data.model, date_time: fechaHora };
            mysqlConnection.query(`INSERT INTO glasses_requests SET ?;`, request, (error, results) => {
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