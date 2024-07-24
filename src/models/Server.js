
const express = require("express");
const cors = require("cors");
const {paths} = require("../config/paths");

class Server{
    constructor(){
        this.app = express();
        this.port = 8086
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }
    routes(){
        this.app.use(paths.auth,require("../routes/auth"));
        this.app.use(paths.envioactas,require("../routes/crearactas"));
        this.app.use(paths.consultar,require("../routes/consultar"));
        this.app.use(paths.Eliminar,require("../routes/eliminar"));
        this.app.use(paths.get,require("../routes/get"));
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log("Server REST Actas DIA - ON! - Port: " + this.port);
        })
    }
}

module.exports = Server;