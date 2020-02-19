const db = require("../data/dbConfig.js");
const userModel = require("./user-model.js");

beforeEach(async () => {
  await db.seed.run();
});

describe("user model", () => {
  test("find", async () => {
    const res = await userModel.find();
    expect(res.length).toBe(2);
  });

  test("findById", async () => {
    const res = await userModel.findById(1);
    expect(res.username).toBe("user1");
  });

  test("findByUsername", async () => {
    const res = await userModel.findByUsername("user1");
    expect(res.id).toBe(1);
  });

  test("update", async () => {
    await userModel.update(1, { username: "pizza4000" });
    const user = await userModel.findById(1);
    expect(user.username).toBe("pizza4000");
  });

  test("remove", async () => {
    await userModel.remove(1);
    const users = await userModel.find();
    expect(users).toHaveLength(1);
  });
});
