const { Router } = require("express");
const m$user = require("../modules/user.module");
const response = require("../helpers/response");
const authSession = require("../helpers/middleware");
const jwt = require("jsonwebtoken");

const UserController = Router();

// Endpoint list user API
UserController.get("/all", async (req, res) => {
  const list = await m$user.listUser();
  response.sendResponse(res, list);
});

// Endpoint register user API
UserController.post("/register", async (req, res) => {
  const body = req.body;
  const add = await m$user.addUser(body);
  response.sendResponse(res, add);
});

// Endpoint login user API
UserController.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await m$user.loginUser(email, password);
  if (user.status) {
    const token = jwt.sign(user.user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });
    user.token = token;
  }
  response.sendResponse(res, user);
});

// Endpoint logout user API
UserController.post("/logout", async (req, res) => {
  res.clearCookie("token");
  data = {
    status: true,
    msg: "User Logged out!",
  };
  response.sendResponse(res, data);
});

// Endpoint delete user API
UserController.delete("/delete", authSession, async (req, res) => {
  const del = await m$user.deleteUser(req.user.id);
  response.sendResponse(res, del);
});

// Endpoint edit user API
UserController.put("/edit", authSession, async (req, res) => {
  const edit = await m$user.editUser(req.user.id, req.body);
  response.sendResponse(res, edit);
});

// Endpoint find signed user
UserController.get("/signedAs", authSession, async (req, res) => {
  const find = await m$user.findUser(req.user.id);
  response.sendResponse(res, find);
});

module.exports = UserController;
