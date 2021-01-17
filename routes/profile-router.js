const router = require("express").Router();
const redirectLogin = require("../middlewares/redirectLogin");

router.get("/", redirectLogin, (req, res) => {
  res.render("profile", {
    avatar: req.user.avatar || "/img/default_avatar.jpg",
    username: req.user.username.trim(),
  });
});

router.post("/", (req, res) => {
  //
});

module.exports = router;
