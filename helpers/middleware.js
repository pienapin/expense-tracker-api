const jwt = require('jsonwebtoken');

const authSession = (req, res, next) => {
  const token = req.cookies.token;
  if (token == null)  return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    res.status(403).send("User is not logged in.");
    return error;
  }
}

module.exports = authSession;