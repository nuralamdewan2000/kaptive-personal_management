const express = require("express");
const userRouter = require("./routes/user.routes");
const transactionRouter = require("./routes/transaction.routes");
const categoryRouter = require("./routes/category.routes");
const monthlyReportRouter = require("./routes/monthlyReport.routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {  
  res
    .status(200)
    .json({ message: "Welcome to the Personal Finance Management System" });
});

// defining all the routes
app.use("/user", userRouter);
app.use("/transactions", transactionRouter);
app.use("/category", categoryRouter);
app.use("/monthly-report", monthlyReportRouter);

app.listen(PORT, () => {
  try {
    console.log("connected to mongodb");
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("error while listening:", error);
  }
});
