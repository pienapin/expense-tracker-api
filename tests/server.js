require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("../routes");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.send({
    message: "You are using Expense Tracker by Kelompok 4",
  });
});

routes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
