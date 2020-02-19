const postModel = require("./post-model.js");
const db = require("../data/dbConfig.js");

beforeEach(async () => {
  await db.seed.run();
});

describe("post model", () => {
  test("find", async () => {
    const res = await postModel.find();
    expect(res.length).toBe(6);
  });

  test("findById", async () => {
    const res = await postModel.findById(1);
    expect(res.text).toBe("something pointless");
  });

  test("findUserPosts", async () => {
    const res = await postModel.findUserPosts(1);
    expect(res.length).toBe(3);
  });

  test("add", async () => {
    await postModel.add({ text: "new post", user_id: 1 });
    const posts = await postModel.find();
    expect(posts).toHaveLength(7);
  });

  test("update", async () => {
    await postModel.update(1, {
      text: "something new",
      user_id: 1
    });
    const post = await postModel.findById(1);
    expect(post.text).toBe("something new");
  });

  test("remove", async () => {
    await postModel.remove(1);
    const posts = await postModel.find();
    expect(posts.length).toBe(5);
  });
});
