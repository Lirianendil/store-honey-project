const Router = require("express");
const { register, login, load } = require("../controllers/authController");
const {protect} = require("../authMiddleware");
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post('/load',protect, load)

module.exports = router;
