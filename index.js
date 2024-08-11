const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/MoneyList", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => console.log("Error in Connecting to the database"));
db.once("open", () => console.log("Connected to the Database"));

const expenseSchema = new mongoose.Schema({
  Category: String,
  Amount: Number,
  Info: String,
  Date: Date,
});

const Expense = mongoose.model("Expense", expenseSchema);

app.post("/add", async (req, res) => {
  const { category_select, amount_input, info, date_input } = req.body;

  const expense = new Expense({
    Category: category_select,
    Amount: amount_input,
    Info: info,
    Date: new Date(date_input), // Convert date_input to Date object
  });

  try {
    const result = await expense.save(); // Save using async/await
    console.log("Record inserted successfully:", result);
    res.status(200).send("Record inserted successfully.");
  } catch (err) {
    console.error("Error inserting record:", err);
    res.status(500).send("Error inserting record.");
  }
});

app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });
  return res.redirect("index.html");
});

app.listen(5000, () => {
  console.log("Listening on PORT 5000");
});
