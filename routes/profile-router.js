const router = require("express").Router();
const redirectLogin = require("../middlewares/redirectLogin");
const updateUser = require("../utils/updateUser");
const pool = require("../db/pool");

router.get("/", redirectLogin, (req, res) => {
  res.render("profile", {
    avatar: req.user.avatar || "/img/default_avatar.jpg",
    username: req.user.username.trim(),
    warn: null,
  });
});

router.post("/", async (req, res) => {
  const { avatar_url, username } = req.body;
  req.user.avatar = avatar_url; // change session's avatar
  req.user.username = username; // change session's username

  //Update user
  if (await updateUser(pool, username, avatar_url, req.user.user_id)) {
    res.redirect("/api/profile");
  } else {
    res.render("profile", {
      avatar: req.user.avatar || "/img/default_avatar.jpg",
      username: req.user.username.trim(),
      warn: "* Username already used",
    });
  }
});
module.exports = router;
