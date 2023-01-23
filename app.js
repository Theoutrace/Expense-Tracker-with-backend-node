const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const expenseRoutes = require("./routes/expenses");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expenseRoutes);

app.get("/", (req, res, next) => {
  console.log("working");
  res.json({ body: "my body" });
});

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("DB CONNECTED");
    });
  })
  .catch((error) => {
    console.log(error);
  });
