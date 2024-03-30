const mysqlConnection = require('app/app/database/mysql-connection');
var moment = require('moment');



export const saveRequest = async (data) => {
    try {
        const fechaHora = moment().format('yyyy-MM-DD hh:mm:ss');
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
        return Response.json([])
    }
}