exports.seed = function(knex, Promise) {
  return knex("posts").insert([
    {
      text: "something pointless",
      date: "2020-02-17",
      user_id: 1
    },
    {
      text: "another pointless post",
      date: "2020-02-16",
      user_id: 1
    },
    {
      text: "something about cats",
      date: "2020-02-15",
      user_id: 1
    },
    {
      text: "dog post",
      date: "2020-02-14",
      user_id: 2
    },
    {
      text: "more cat posts",
      date: "2020-02-14",
      user_id: 2
    },
    {
      text: "politcal rant #4000",
      date: "2020-02-16",
      user_id: 2
    }
  ]);
};
