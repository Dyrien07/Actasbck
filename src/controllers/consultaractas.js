const { sqlConfig } = require("../config/db");
const sql = require("mssql");

const verActas = async (req, res) => {
    try {
        let conn = await sql.connect(sqlConfig);
        const request = new sql.Request(conn);
        request.input("Estado", sql.NVarChar, req.body.Estado);
        request.input("Desde", sql.DateTime, req.body.Desde);
        request.input("Hasta", sql.DateTime, req.body.Hasta);
        request.execute("VerActas", (err, result) => {
            if (err) {
                console.log(err.message);
                res.send("error");
            } else {
                res.status(200).send(result.recordset);
            }
        });
    } catch (err) {
        console.log(err.message);
    }
};

const verActasTodo = async (req, res) => {
    try {
        let conn = await sql.connect(sqlConfig);
        const request = new sql.Request(conn);
        request.input("Desde", sql.DateTime, req.body.Desde);
        request.input("Hasta", sql.DateTime, req.body.Hasta);
        request.execute("VerActasTodo", (err, result) => {
            if (err) {
                console.log(err.message);
                res.send("error");
            } else {
                res.status(200).send(result.recordset);
            }
        });
    } catch (err) {
        console.log(err.message);
    }
};

const verActasDetalle = async (req, res) => {
    const {IDacta} = req.body;
    try {
        let conn = await sql.connect(sqlConfig);
        const request = new sql.Request(conn);
        request.input("IDacta", sql.Int, req.body.IDacta);
        request.execute("VerActaDetalle", (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({ msj: "Error al consultar detalle" });
            } else {
                res.send(result.recordset);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ msj: "error general al consultar detalle" });
    }
};

const obtenerRutaHDR = async (req, res) => {
    console.log(req.body.ID);
    try {
        let conn = await sql.connect(sqlConfig);
        const request = new sql.Request(conn);
        request.input("ID", sql.Int, req.body.ID);
        request.execute("ObtenerRutaPDF", (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({ msj: "Error al obtener la ruta" });
            } else {
                console.log(result);
                console.log(result.recordset[0].RutaHDR);
                res.send(result.recordset[0].RutaHDR);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ msj: "error general al consultar detalle" });
    }
};

const verActasCliente = async (req, res) => {
    try {
        let conn = await sql.connect(sqlConfig);
        const request = new sql.Request(conn);
        request.input("Desde", sql.DateTime, req.body.Desde);
        request.input("Hasta", sql.DateTime, req.body.Hasta);
        request.execute("VerActasCliente", (err, result) => {
            if (err) {
                console.log(err.message);
                res.send("error");
            } else {
                res.status(200).send(result.recordset);
            }
        });
    } catch (err) {
        console.log(err.message);
    }
};

const obtenerARchivo = async (req, res) => {
    console.log(req.params.nombreArchivo);
    try {
        const nombreArchivo = req.params.nombreArchivo; // Obtén el nombre del archivo desde los parámetros de la URL
        const rutaArchivo = "C:\\PDFACTAS\\" + nombreArchivo.trim(); // Reemplaza con la ubicación real de tus archivos PDF

        // Utiliza res.download para enviar el archivo como una descarga
        res.download(rutaArchivo, nombreArchivo, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error al descargar el archivo");
            }
        });
    } catch (e) {
        console.log(e.message);
    }
};

const consultarActas = {
    verActas,
    verActasTodo,
    verActasDetalle,
    obtenerRutaHDR,
    verActasCliente,
    obtenerARchivo,
};

module.exports = { consultarActas };
