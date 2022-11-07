const prisma = require("../helpers/database");
const bcrypt = require("bcryptjs");

class _user {
  listUser = async () => {
    try {
      const list = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        status: true,
        data: list,
      };
    } catch (error) {
      console.error("listUser at user module Error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  addUser = async (body) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(body.password, salt);
      const add = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: hash,
        },
      });

      return {
        status: true,
        msg: "User is added.",
      };
    } catch (error) {
      console.error("addUser at user module Error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  loginUser = async (email, password) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        return {
          status: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          msg: "Login Successful!",
        };
      } else {
        return {
          status: false,
          msg: "Wrong Password!",
        };
      }
    } catch (error) {
      console.error("loginUser at user module Error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  editUser = async (id, body) => {
    try {
      const edit = await prisma.user.update({
        where: {
          id: id,
        },
        data: body,
      });

      return {
        status: true,
        msg: "Edit Successful.",
      };
    } catch (error) {
      console.error("editUser at user module Error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  deleteUser = async (id) => {
    try {
      const del = await prisma.user.delete({
        where: {
          id: id,
        },
      });

      return {
        status: true,
        msg: "User is deleted.",
      };
    } catch (error) {
      console.error("deleteUser at user module Error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  findUser = async (id) => {
    try {
      const find = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      return {
        status: true,
        data: find,
      };
    } catch (error) {
      console.error("listUser user module Error: ", error);

      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _user();
