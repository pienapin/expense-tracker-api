const UserController = require("./controllers/UserController");
const ExpenseController = require("./controllers/ExpenseController");

const _routes = [
  // http://localhost:8000/api/user
  ["user", UserController],
  // http://localhost:8000/api/expense
  ["expense", ExpenseController],
];

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(`/api/${url}`, controller);
  });
};

module.exports = routes;
