const { Router } = require("express");
const  { ControllerCrearActas}  = require("../controllers/CtrCrearActas.js")
const upload = require("../middleware/multer.js")

const router = Router();

router.post("/crearacta", ControllerCrearActas.CrearActa);
router.post("/GuardarPDF/:ID",[upload.single("file")],ControllerCrearActas.GuardarPDF)
router.post("/EnviarActa", ControllerCrearActas.EnviarActa)
router.post("/RechazoActa", ControllerCrearActas.RechazoActa)
router.post("/EliminarPDF", ControllerCrearActas.EliminarPDF)





module.exports = router;






