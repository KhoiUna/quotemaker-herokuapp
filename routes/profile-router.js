const router = require("express").Router();
const redirectLogin = require("../middlewares/redirectLogin");
const formidable = require("formidable");
const updateUser = require("../utils/updateUser");
const pool = require("../db/pool");

router.get("/", redirectLogin, (req, res) => {
  res.render("profile", {
    avatar: req.user.avatar || "/img/default_avatar.jpg",
    username: req.user.username.trim(),
    warn: null,
  });
});

router.post("/", (req, res) => {
  const form = formidable({
    uploadDir: __dirname + "/../public/img/uploads",
    keepExtensions: true,
    maxFields: 1,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const parsePath = files.file.path.split("\\");
    const fileName = parsePath[parsePath.length - 1];
    const avatarPath = `/img/uploads/${fileName}`;

    req.user.avatar = avatarPath; // change session's avatar
    req.user.username = fields.username; // change session's avatar

    //Update user
    if (await updateUser(pool, fields.username, avatarPath, req.user.user_id)) {
      res.redirect("/api/profile");
    } else {
      res.render("profile", {
        avatar: req.user.avatar || "/img/default_avatar.jpg",
        username: req.user.username.trim(),
        warn: "* Username already used",
      });
    }
  });
});

module.exports = router;
