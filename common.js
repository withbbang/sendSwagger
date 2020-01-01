const Pool = require("pg").Pool;
const dbProperties = {
    //sendplanet db information
};
exports.dbProperties;
exports.pool = new Pool({
    ...dbProperties,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

const pool_ = new Pool({
    ...dbProperties,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

/**
 * get *                ==> GET
 * change || update     ==> PUT
 * check || else        ==> POST
 * delete               ==> DELETE
 */

exports.db_start = async function(db_sql, rsp, message) {
    //console.log("DB_SQL:", db_sql);
    let client = await pool_.connect();
    await client.query(db_sql, [], (error, results) => {
        if (error) {
            console.log(db_sql)
            throw error;
        }
        if(message){
            rsp.status(200).json({ callback: "OK" });
            return;
        }
        else return
    });
    await client.release();
};
exports.db_start_def = async function(db_sql, rsp, rspcode, callback) {
    console.log("DB_SQL:", db_sql);
    await client.query(db_sql, [], (error, results) => {
        if (error) {
            throw error;
        }
        rsp.status(rspcode).json(callback);
    });

    await client.release();
};
