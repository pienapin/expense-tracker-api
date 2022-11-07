const m$expense = require("../modules/expense.module");
const { Router } = require("express");
const response = require("../helpers/response");
const authSession = require("../helpers/middleware");

const ExpenseController = Router();

ExpenseController.get("/", authSession, async (req, res) => {
  const list = await m$expense.listExpense(req.user.id);
  response.sendResponse(res, list);
});

ExpenseController.post("/add", authSession, async (req, res) => {
  const add = await m$expense.addExpense(req.user.id, req.body);
  response.sendResponse(res, add);
});

ExpenseController.put("/edit/:id", authSession, async (req, res) => {
  const edit = await m$expense.editExpense(
    parseInt(req.params.id),
    req.user.id,
    req.body
  );
  response.sendResponse(res, edit);
});

ExpenseController.delete("/delete/:id", authSession, async (req, res) => {
  const del = await m$expense.deleteExpense(
    parseInt(req.params.id),
    req.user.id
  );
  response.sendResponse(res, del);
});

module.exports = ExpenseController;
