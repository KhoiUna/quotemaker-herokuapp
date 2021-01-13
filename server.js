require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

//env variables
const TWO_HOURS = 1000 * 3600 * 2;
const {
  PORT = 3000,
  NODE_ENV = "development",
  SESS_LIFETIME = TWO_HOURS,
  SESS_NAME,
  SESS_SECRET,
} = process.env;
const IN_PROD = NODE_ENV === "production";

//Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("trust proxy", 1);
app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//Routes:
//Register route
const registerRouter = require("./routes/register-router");
app.use("/api/register", registerRouter);

//Login route
const loginRouter = require("./routes/login-router");
app.use("/api/login", loginRouter);

//Google auth route
const googleAuthRouter = require("./routes/google-auth-router");
app.use("/auth", googleAuthRouter);

//Logout route
const logoutRouter = require("./routes/logout-router");
app.use("/api/logout", logoutRouter);

//Main page route
const mainRouter = require("./routes/main-router");
app.use("/api/main", mainRouter);

//Play route
const playRouter = require("./routes/play-router");
app.use("/api/play", playRouter);

//Update route
const updateRouter = require("./routes/update-router");
app.use("/api/play/update", updateRouter);

//Delete route
const deleteRouter = require("./routes/delete-router");
app.use("/api/play/delete", deleteRouter);

//Start a server
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
  console.log("---------------------");
});
