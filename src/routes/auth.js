const {Router} = require("express");
const { authController } = require("../controllers/auth");
const router = Router();

router.post('/', authController.auth)
router.post('/dia', authController.auth)

module.exports = router;