const authController = require("./authController");
const { checkIfUserExists, validateBody } = require("./authMiddleware");

const router = require("express").Router();

router.post("/register", validateBody, checkIfUserExists, authController.register);

router.post("/login", validateBody, checkIfUserExists, authController.login);

router.use("*", authController.notFound);

module.exports = router;
