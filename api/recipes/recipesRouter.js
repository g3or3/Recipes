const recipesController = require("./recipesController");
const { validateBody, validateId } = require("./recipesMiddleware");

const router = require("express").Router();

router.get("/", recipesController.getAll);

router.get("/:id", validateId, recipesController.getById);

router.post("/", validateBody, recipesController.create);

router.put("/:id", recipesController.update);

router.delete("/:id", validateId, recipesController.remove);

module.exports = router;
