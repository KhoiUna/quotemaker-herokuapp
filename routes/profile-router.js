const router = require("express").Router();
const redirectLogin = require("../middlewares/redirectLogin");
const formidable = require("formidable");

router.get("/", redirectLogin, (req, res) => {
  console.log(req.user);
  const avatarPath = req.user.avatar
    ? `/img/uploads/${req.user.avatar}`
    : "/img/default_avatar.jpg";

  res.render("profile", {
    avatar: avatarPath,
    username: req.user.username.trim(),
  });
});

router.post("/", (req, res) => {
  const form = formidable({
    uploadDir: __dirname + "/../public/img/uploads",
    keepExtensions: true,
    maxFields: 1,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const parsePath = files.file.path.split("\\");
    const fileName = parsePath[parsePath.length - 1];
    req.user.avatar = fileName;
    res.redirect("/api/profile");
  });
});

module.exports = router;
