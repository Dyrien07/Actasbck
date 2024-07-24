const sql = require("mssql");
const { sqlConfig } = require("../config/db.js");

const getActasxId = async (req, res) => {
    const { id } = req.body;

    try {
        let conn = await sql.connect(sqlConfig);
        const request = new sql.Request(conn);
        request.input("id", sql.Int, id);
        request.execute("getActasxID", (err, result) => {
            if (err) {
                console.log(err.message);
                res.json({ message: err.message });
            } else {
                res.send(result.recordset);
            }
        });
    } catch (e) {
        console.log(e.message);
        res.sned(e.message);
    }
};

const getActasxFechas = async (req, res) => {
    const {desde, hasta} = req.body;
    console.log(desde);
    try {
        console.log(req.body.id);
        let conn = await sql.connect(sqlConfig);
        const request = new sql.Request(conn);
        request.input("Desde", sql.Date, desde);
        request.input("Hasta", sql.Date, hasta);
        request.execute("verActasTodo", (err, result) => {
            if (err) {
                console.log(err.message);
                res.json({ message: err.message });
            } else {
                console.log(result.recordset);
                res.send(result.recordset);
            }
        });
    } catch (e) {
        console.log(e.message);
        res.sned(e.message);
    }
};

const getRequests = {
    getActasxId,
    getActasxFechas
};

module.exports = { getRequests };
