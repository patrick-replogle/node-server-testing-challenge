const supertest = require("supertest");

const server = require("../api/server.js");
const db = require("../data/dbConfig.js");

let token;

beforeEach(async () => {
  await db.seed.run();
});

describe("root", () => {
  test("environment should be testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  test("register", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "patrickr", password: "patrickr" });
    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");
  });

  test("login", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({
        username: "user1",
        password: "password"
      });
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.message).toEqual("Welcome user1!");
  });

  test("get users", async () => {
    const res = await supertest(server)
      .get("/api/users")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });

  test("get user by id", async () => {
    const res = await supertest(server)
      .get("/api/users/1")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });

  test("the user is updated", async () => {
    const res = await supertest(server)
      .put("/api/users/1")
      .set("Authorization", `${token}`)
      .send({
        username: "edited",
        password: "password"
      });
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });

  test("it delete's the user", async () => {
    const res = await supertest(server)
      .delete("/api/users/1")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });
});
