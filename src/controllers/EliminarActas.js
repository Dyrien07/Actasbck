const sql = require('mssql');
const {sqlConfig} = require("../config/db.js")

  const EliminarLineaDetalle = async(req, res)=>{
    try{
        let conn = await sql.connect(sqlConfig)
        const request = new sql.Request(conn)
        request.input("IDLinea", sql.Int, req.body.IDLinea)
        request.input("IDActa", sql.Int, req.body.IDActa)
        request.execute("EliminarLineaDetalle", (err, result)=>{
            if (err){
                console.log(err.message)
                res.json({Respuesta:{msj:err.message}})
            }else{
                res.send("OK")
            }
        });

    }catch(e){
        res.json({Respuesta:{msj:"Ocurrio un error eliminando la linea"}}).status(400)

    }
}

const EliminarTodo = async(req, res)=>{
    try{
        let conn = await  sql.connect(sqlConfig)
        const request = new sql.Request(conn)
        request.input("IDacta" , sql.Int, req.body.IDacta)
        request.execute("EliminarActa", (err, result)=>{
            if (err){
                console.log(err.message)
                res.json({Respuesta:{msj:err.message}}).status(400)
            }else{
                res.send("OK")
            }
        })

    }catch(e){
        console.log(e.message)
        res.json({Respuesta:{msj:e.message}}).status(400)
    }
}

const ModificarActa = async(req, res) => {
    try{
        console.log(req.body)
        let conn =  await sql.connect(sqlConfig)
        const request = new sql.Request(conn)
        request.input("IDacta", sql.Int,req.body.IDacta)
        request.input("Monto", sql.Float,req.body.Monto)
        request.input("BultosF", sql.NVarChar(50),req.body.BultosF)
        request.input("Pedido", sql.NVarChar(50),req.body.Pedido)
        request.input("Rectificacion", sql.NVarChar(50),req.body.Rect)
        request.input("Tienda", sql.NVarChar(50),req.body.Tienda)
        request.execute("AgregarLineaDetalle",(err,result)=>{
            if (err){
                console.log(err)
                res.json({Respuesta:{msj:err.message}}).status(400)
            }else{
                res.send("OK")
            }
        })

    }catch(e){
        console.log(e)
        res.status(500).json({Respuesta:{msj:e.message}})
    }
}

const DeleteActas = {
    EliminarLineaDetalle,
    EliminarTodo,
    ModificarActa
}


module.exports = {DeleteActas}

