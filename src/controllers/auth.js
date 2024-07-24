const {   sqlConfig } = require("../config/db");
const sql = require("mssql");

const auth = async(req,res) => {
    const sp = req.body.sp;
    try {
        let conn = await sql.connect(sqlConfig);
        const request = new sql.Request(conn);
        request.input("UserID", sql.NVarChar(255), req.body.UserID);
        request.input("pass", sql.NVarChar(255), req.body.pass);
        request.execute(sp, (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    Respuesta: "Ocurrio un error al intentar ingresar",
                });
            } else {
                console.log(result.recordset)
                res.send(result.recordset[0]);
            }
        });
    } catch (e) {
        console.log("error general al ingresar " + e.message);
        conn.close()
    }
}

const authController = {
    auth
}

module.exports = {authController};