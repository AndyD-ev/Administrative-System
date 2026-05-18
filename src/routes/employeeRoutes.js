const express = require("express")

const router = express.Router()

const verifyToken = require("../middleware/verifyToken")

const {
  createEmployee,
  getEmployees,
  searchEmployee,
  updateEmployee,
  deleteEmployee
} = require("../controllers/employeeController")

router.post(
  "/",
  verifyToken,
  createEmployee
)

router.get(
  "/search",
  verifyToken,
  searchEmployee
)

router.get(
  "/",
  verifyToken,
  getEmployees
)

router.put(
  "/:id",
  verifyToken,
  updateEmployee
)

router.delete(
  "/:id",
  verifyToken,
  deleteEmployee
)

module.exports = router