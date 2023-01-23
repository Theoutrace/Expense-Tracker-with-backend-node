const express = require("express");

const router = express.Router();

const expensesController = require("../controllers/expenses");

router.get("/expenses", expensesController.getAllExoenses);
router.post("/add-expense", expensesController.postExpense);
router.delete("/del-expense/:id", expensesController.deleteExpense);
router.put("/update-expense/:id", expensesController.updateExpense);

module.exports = router;
