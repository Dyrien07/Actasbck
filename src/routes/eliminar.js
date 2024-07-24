const { Router } = require("express");
const  { DeleteActas}  = require("../controllers/EliminarActas.js")

const router = Router();


router.post("/", DeleteActas.EliminarLineaDetalle); 
router.post("/EliminarTodo", DeleteActas.EliminarTodo)
router.post("/ModificarActa", DeleteActas.ModificarActa)





module.exports = router;
