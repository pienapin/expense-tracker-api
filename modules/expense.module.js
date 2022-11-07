const prisma = require("../helpers/database");

class _expense {
  listExpense = async (id) => {
    try {
      const list = await prisma.expense.findMany({
        where: {
          userId: id,
        },
      });

      return {
        status: true,
        data: list,
      };
    } catch (error) {
      console.error("listExpense at expense module Error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  addExpense = async (id, body) => {
    try {
      const add = await prisma.expense.create({
        data: {
          userId: id,
          type: body.type,
          amount: body.amount,
          description: body.description,
        },
      });

      return {
        status: true,
        msg: "Added.",
      };
    } catch (error) {
      console.error("addExpense at expense module Error: ", error);
      return {
        status: false,
        error,
      };
    }
  };

  editExpense = async (id, userId, body) => {
    try {
      const list = await prisma.expense.findMany({
        where: {
          userId: userId,
        },
      });
      let check;
      for (const expense of list) {
        if (id == expense.id) {
          check = true;
          break;
        } else {
          check = false;
        }
      }

      if (check == false) {
        return {
          status: false,
          msg: "Invalid id.",
        };
      }

      const edit = await prisma.expense.update({
        where: {
          id: id,
        },
        data: body,
      });

      return {
        status: true,
        msg: "Edited.",
      };
    } catch (error) {
      console.error("editExpense at expense module Error: ", error);
      return {
        status: false,
        error,
      };
    }
  };

  deleteExpense = async (id, userId) => {
    try {
      const list = await prisma.expense.findMany({
        where: {
          userId: userId,
        },
      });
      let check;
      for (const expense of list) {
        if (id == expense.id) {
          check = true;
          break;
        } else {
          check = false;
        }
      }

      if (check == false) {
        return {
          status: false,
          msg: "Invalid id.",
        };
      }

      const del = await prisma.expense.delete({
        where: {
          id: id,
        },
      });

      return {
        status: true,
        msg: "Deleted",
      };
    } catch (error) {
      console.error("deleteExpense at expense module Error: ", error);
      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _expense();
