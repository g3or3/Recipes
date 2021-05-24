const authController = require("./authController");
const { checkIfUserExists, validateBody } = require("./authMiddleware");

const router = require("express").Router();

router.get("/", (req, res) => {
	res.json("works");
});

router.post("/register", validateBody, checkIfUserExists, authController.register);

router.post("/login", validateBody, checkIfUserExists, authController.login);

module.exports = router;
