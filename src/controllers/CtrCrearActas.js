const sql = require("mssql");
const { sqlConfig } = require("../config/db.js");
const pdf = require("pdf-parse");
const fs = require("fs");
const nodemailer = require("nodemailer");

const crearActaDetalle = async (
    IDActa,
    Debito,
    Bultos,
    Fecha,
    Pedido,
    Rectificacion,
    Tienda,
    res
) => {
    try {
        let conn = await sql.connect(sqlConfig);
        const request = new sql.Request(conn);
        request.input("IDActa", sql.Int, IDActa);
        request.input("Debito", sql.Float, Debito);
        request.input("BultosFaltantes", sql.Int, Bultos);
        request.input("Fecha", sql.Date, Fecha);
        request.input("Pedido", sql.NVarChar, Pedido);
        request.input("Rectificacion", sql.NVarChar, Rectificacion);
        request.input("Tienda", sql.NVarChar, Tienda);
        request.execute("CrearActaDetalle", (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    msj: "Error al grabar el detalle del acta",
                });
            } else {
                console.log("OK");
            }
        });
    } catch (err) {
        res.status(400);
    }
};

const CrearActa = async (req, res) => {
    let Nombre = req.body.Nombre;

    if (Nombre.length < 10) {
        res.status(400).json({ err: "Falta nombre del acta" });
        return;
    }

    try {
        let Almacen = Nombre.match(/\d+/);
        let AlmacenNumber = parseInt(Almacen[0]);
        let total = CalcularMonto(req.body.Datos);
        let conn = await sql.connect(sqlConfig);
        const request = new sql.Request(conn);
        request.input("NombreActa", sql.NVarChar(50), req.body.Nombre);
        request.input("Almacen", sql.Int, AlmacenNumber);
        request.input("TipoActa",sql.NVarChar(50),req.body.Datos[0]["Resolución"]);
        request.input("Estado", sql.NVarChar(50), "Pendiente Envio");
        request.input("HDR", sql.Bit, false);
        request.input("Monto", sql.Float, total);
        request.input("PeriodoInventarial", sql.NVarChar, "Periodo Actual");
        request.execute("CrearActa", async (err, result) => {
            if (err) {
                if (err.class === 14) {
                    res.status(400).json({
                        Respuesta: {
                            msj: "Ya existe un acta con ese nombre"
                        },
                    });
                }
            } else {
                try {
                    for (let i = 0; i < req.body.Datos.length; i++) {
                        let Monto = limpiarString(req.body.Datos[i][" Debito a Transportista "])
                        let ID = await result.recordset[0].ID;
                        let Debito = Monto;
                        let Bultos = req.body.Datos[i]["Bts Falta"];
                        let Fecha = req.body.Datos[i]["Fecha "];
                        let Pedido = req.body.Datos[i].Pedido;
                        let Rectificacion = req.body.Datos[1]["Rectificación"];
                        let Tienda = req.body.Datos[i].Tienda;
                        await crearActaDetalle(
                            ID,
                            Debito,
                            Bultos,
                            Fecha,
                            Pedido,
                            Rectificacion,
                            Tienda,
                            res
                        );
                    }
                    res.status(200).json({  msj: "OK"  });
                } catch (e) {
                    res.json({ msj: e.message });
                }
            }
        });
    } catch (err) {
        res.status(400).json({
            Respuesta: {
                msj: err.message,
            },
        });
    }
};

const CalcularMonto = (ArrayMonto) => {
    let total = 0;
    ArrayMonto.pop()
    ArrayMonto.forEach((Datos) => {
        let StringNumber = Datos[" Debito a Transportista "].trim();
        let replaceNumber = StringNumber.replace("$", "").replace(",", "").trim();
        let parcedNumber = parseFloat(replaceNumber)
        total += parcedNumber
    });
 return total;
};

const limpiarString = (StringNumber) => parseFloat( StringNumber.replace("$", "").replace(",", "").trim());

const GuardarPDF = async (req, res) => {
    console.log(req.file);
    console.log(req.params.ID);
    try {
        let conn = await sql.connect(sqlConfig);
        const request = new sql.Request(conn);
        request.input("RutaPDF", sql.NVarChar(50), req.file.path);
        request.input("ID", sql.Int, parseInt(req.params.ID));
        request.execute("GuardarPDF", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("OK");
            }
        });
    } catch (e) {
        console.log(e.message);
        res.json({
            Respuesta: { msj: "Ya existe un archivo con ese nombre" },
        }).status(400);
    }
};
const EnviarActa = async (req, res) => {
    try {
        let conn = await sql.connect(sqlConfig);
        const request = new sql.Request(conn);
        request.input("ID", sql.Int, parseInt(req.body.ID));
        request.execute("EnviarActa", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("OK");
            }
        });
    } catch (e) {
        console.log(e.message);
        res.json({
            Respuesta: { msj: "Ya existe un archivo con ese nombre" },
        }).status(400);
    }
};

const RechazoActa = async (req, res) => {
    console.log(req.body);
    try {
        let conn = await sql.connect(sqlConfig);
        const request = new sql.Request(conn);
        request.input("ID", sql.Int, req.body.ID);
        request.input("Motivo", sql.NVarChar(255), req.body.Motivo);
        request.execute("RechazoActa", (err, result) => {
            if (err) {
                console.log(err.message);
                res.status(400).json({ error: e.message });
            } else {
                res.send("OK");
            }
        });
    } catch (e) {
        console.log(e.message);
    }
};

const EliminarPDF = async (req, res) => {
    console.log(req.body);
    try {
        let conn = await sql.connect(sqlConfig);
        const request = new sql.Request(conn);
        request.input("ID", sql.Int, req.body.ID);
        request.execute("ReSubirPDF", (err, result) => {
            if (err) {
                console.log(err.message);
                res.status(400).json({ error: e.message });
            } else {
                res.send("OK");
            }
        });
    } catch (e) {
        console.log(e.message);
    }
};

const SendCode = async (req, res) => {
    const { to, code, idActa } = req.body;

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP,
        port: process.env.SMTPPORT,
        secure: false,
        auth: {
            type: "login",
            user: process.env.MAIL,
            pass: process.env.MAILPASS
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let info = await transporter.sendMail({
        from: "noresponder@id-logistics.com",
        to: `${to}`,
        subject: ` Codigo de firma de acta ${idActa}`,
        html: `<img src="https://www.id-logistics.com/es/wp-content/uploads/sites/28/2021/02/IDL_A_M.png" width="200" alt="Logo ID">`,
        body: `<p>Su codigo de firma es ${code}</p>`,
    });
};
const ControllerCrearActas = {
    CrearActa,
    GuardarPDF,
    EnviarActa,
    RechazoActa,
    EliminarPDF,
    SendCode,
};

module.exports = { ControllerCrearActas };
