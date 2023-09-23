const router = require("express").Router();
const {
  create,
  fetchAll,
  fetchOne,
  update,
  deleteOne,
  updatereminder,
} = require("../controllers/taskController");
const { validateQuery, validateBody } = require("../middleware/joi");
const { todoSchema, paginationSchema } = require("../valiadtion/task");
const objectIdValidator = require("../middleware/objectIdValidator");

router.get("/", validateQuery(paginationSchema), fetchAll);
router.post("/", create);
router.get("/:id", objectIdValidator, fetchOne);
router.put("/:id", objectIdValidator, update);
router.put("/reminder/:id", objectIdValidator, updatereminder);
router.delete("/:id", objectIdValidator, deleteOne);

module.exports = router;
