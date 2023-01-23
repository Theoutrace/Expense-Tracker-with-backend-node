const Expense = require("../models/expenses");

//get all expenses
exports.getAllExoenses = async (req, res, next) => {
  let expenses = await Expense.findAll();
  res.json(expenses);
};

//post an expense to add to DB
exports.postExpense = async (req, res, next) => {
  const price = req.body.price;
  const description = req.body.description;
  const category = req.body.category;

  let result = await Expense.create({
    price: price,
    category: category,
    description: description,
  });

  res.json(result);
};

//delete after getting id from router's route API link
exports.deleteExpense = async (req, res, next) => {
  let itemId = req.params.id;
  console.log(itemId);
  let expenseToDelete = await Expense.findByPk(itemId);
  await expenseToDelete.destroy();
  res.json({ message: "Item Deleted" });
};

//edit after getting id from router's route API link
exports.updateExpense = async (req, res, next) => {
  let itemIdToUpdate = req.params.id;
  // collect updated price, category and description from request
  const price = req.body.price;
  const category = req.body.category;
  const description = req.body.description;
  let expenseToUpdate = await Expense.findByPk(itemIdToUpdate);

  let result = await expenseToUpdate.update({
    price: price,
    category: category,
    description: description,
  });

  res.json(result);
};
