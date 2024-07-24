const { Router } = require("express");
const { getRequests } = require("../controllers/get");
const { consultarActas } = require("../controllers/consultaractas");


const router = Router();
router.post("/id", getRequests.getActasxId);
router.post("/actas-fechas", getRequests.getActasxFechas);
router.post("/detalle",  consultarActas.verActasDetalle);

module.exports = router;
