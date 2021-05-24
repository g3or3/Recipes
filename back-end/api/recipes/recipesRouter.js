const recipesController = require("./recipesController");
const { validateBody } = require("./recipesMiddleware");

const router = require("express").Router();

router.get("/", recipesController.getAll);

router.get("/:id", recipesController.getById);

router.post("/", validateBody, recipesController.create);

router.put("/:id", recipesController.update);

router.delete("/:id", recipesController.remove);

module.exports = router;
