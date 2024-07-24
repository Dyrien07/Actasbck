const {Router}  = require("express");
const { consultarActas } = require("../controllers/consultaractas");

const router = Router();

router.post("/actas", consultarActas.verActas)
router.post("/all", consultarActas.verActasTodo)
router.post("/detalle", consultarActas.verActasDetalle)
router.post("/HDR", consultarActas.obtenerRutaHDR)
router.post("/ActasClient", consultarActas.verActasCliente)
router.get("/getPDF/:nombreArchivo", consultarActas.obtenerARchivo)

module.exports = router