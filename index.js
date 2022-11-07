require('dotenv').config()
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//Welcome API
app.get("/", async (req, res) => {
  res.status(200).send({
    status: true,
    data: "Welcome to API Todo List and Express",
  });
});

routes(app);

app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
