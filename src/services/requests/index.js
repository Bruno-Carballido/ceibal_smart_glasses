const mysqlConnection = require('app/app/database/mysql-connection');
var moment = require('moment-timezone');



export const saveRequest = async (data) => {
    try {
        const fechaHora = moment().tz('America/Montevideo').format('yyyy-MM-DD hh:mm:ss');
        console.log(fechaHora);
        const results = await new Promise((resolve, reject) => {
            mysqlConnection.query(`insert into glasses_requests (email, name, id_model, date_time) values ('${data.email}', '${data.name}', ${data.model}, '${fechaHora}');`, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        return Response.json(results);
    } catch (error) {
        throw error
    }
}