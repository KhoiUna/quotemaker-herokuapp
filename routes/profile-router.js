const router = require("express").Router();
const redirectLogin = require("../middlewares/redirectLogin");
const updateUser = require("../utils/updateUser");
const pool = require("../db/pool");

router.get("/", redirectLogin, (req, res) => {
  res.render("profile", {
    avatar:
      req.user.avatar ||
      "https://collaborativecbt.com/wp-content/uploads/2016/12/default-avatar.png",
    username: req.user.username.trim(),
    warn: null,
  });
});

router.post("/", async (req, res) => {
  const { avatar_url, username } = req.body;

  //Only change and upload avatar if the url is different
  const changeAvatarIfDifferent = req.user.avatar !== avatar_url;
  if (changeAvatarIfDifferent) {
    req.user.avatar = avatar_url; // change session's avatar
  }

  if (
    await updateUser(
      pool,
      changeAvatarIfDifferent,
      req.user.avatar,
      username,
      avatar_url,
      req.user.user_id
    )
  ) {
    req.user.username = username; // change session's username
    res.redirect("/api/profile");
  } else {
    res.render("profile", {
      avatar:
        req.user.avatar ||
        "https://collaborativecbt.com/wp-content/uploads/2016/12/default-avatar.png",
      username: req.user.username.trim(),
      warn: "* Username already used",
    });
  }
});

module.exports = router;
