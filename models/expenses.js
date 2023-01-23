const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Expense = sequelize.define("expenses", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  price: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },

  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Expense;
