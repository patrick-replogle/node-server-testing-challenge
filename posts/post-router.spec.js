const supertest = require("supertest");

const server = require("../api/server.js");
const db = require("../data/dbConfig.js");

let token;

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("post router", () => {
  // login and grab a token to test the post routes
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

  test("get all posts", async () => {
    const res = await supertest(server)
      .get("/api/posts/all")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });

  test("get post by id", async () => {
    const res = await supertest(server)
      .get("/api/posts/1")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.text).toBe("something pointless");
  });

  test("get user id#1 posts", async () => {
    const res = await supertest(server)
      .get("/api/posts/")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.length).toBe(3);
  });

  test("a new post will be added", async () => {
    const res = await supertest(server)
      .post("/api/posts/")
      .set("Authorization", `${token}`)
      .send({ text: "new post", date: "today" });
    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");

    const posts = await supertest(server)
      .get("/api/posts/")
      .set("Authorization", `${token}`);
    expect(posts.body.length).toBe(4);
  });

  test("post is updated", async () => {
    const res = await supertest(server)
      .put("/api/posts/2")
      .set("Authorization", `${token}`)
      .send({ text: "IM UPDATED", date: "WHO KNOWS?" });
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.text).toEqual("IM UPDATED");
  });

  test("post is deleted", async () => {
    const res = await supertest(server)
      .delete("/api/posts/3")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toBe(1);
  });
});
