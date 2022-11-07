const request = require("supertest");
const app = require("./server");

afterAll((done) => {
  done();
});

describe("User API", () => {
  test("List User", async () => {
    const res = await request(app).get("/api/user/all");
    expect(res.status).toBe(200);
  });

  test("Add User", async () => {
    const res = await request(app).post("/api/user/register").send({
      name: "add user test",
      email: "test@test.com",
      password: "test",
    });
    expect(res.status).toBe(200);
  });

  test("User Login", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "test@test.com",
      password: "test",
    });
    token = res.body.token;
    expect(res.status).toBe(200);
  });

  test("User Logout", async () => {
    const res = await request(app).post("/api/user/logout");
    expect(res.status).toBe(200);
  });

  test("Edit User", async () => {
    const login = await request(app).post("/api/user/login").send({
      email: "test@test.com",
      password: "test",
    });
    token = login.body.token;
    const res = await request(app)
      .put("/api/user/edit")
      .set("Cookie", [`token=${token}`])
      .send({
        name: "tes ganti nama",
      });
    expect(res.status).toBe(200);
  });

  test("Delete User", async () => {
    const res = await request(app)
      .delete("/api/user/delete")
      .set("Cookie", [`token=${token}`]);
    expect(res.status).toBe(200);
  });
});

describe("Expense Tracker API", () => {
  let expenseId;
  test("Add Expense", async () => {
    const register = await request(app).post("/api/user/register").send({
      name: "add user test",
      email: "test@test.com",
      password: "test",
    });
    const login = await request(app).post("/api/user/login").send({
      email: "test@test.com",
      password: "test",
    });
    token = login.body.token;
    const res = await request(app)
      .post("/api/expense/add")
      .set("Cookie", [`token=${token}`])
      .send({
        type: "income",
        amount: 100000,
        description: "Dari langit",
      });
    expect(login.status).toBe(200);
  });

  test("List Expense", async () => {
    const res = await request(app)
      .get("/api/expense")
      .set("Cookie", [`token=${token}`]);
    expenseId = res.body.data[0].id;
    expect(res.status).toBe(200);
  });

  test("Edit Expense", async () => {
    const res = await request(app)
      .put(`/api/expense/edit/${expenseId}`)
      .set("Cookie", [`token=${token}`])
      .send({
        description: "Bayaran joki tugas",
      });
    expect(res.status).toBe(200);
  });

  test("Delete Expense", async () => {
    const res = await request(app)
      .delete(`/api/expense/delete/${expenseId}`)
      .set("Cookie", [`token=${token}`]);
    const deleteUser = await request(app)
      .delete("/api/user/delete")
      .set("Cookie", [`token=${token}`]);
    expect(res.status).toBe(200);
  });
});
