const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");
const key = require("./config/key");
const path = require("path");

const app = express();
// set view engine
app.set("view engine", "ejs");
//the default directory for view engine is "views"
//so if the directory is "./web"
// app.set('views', path.join(__dirname, 'web'));

//=========== middleware ==============
//cookie
app.use(cookieSession({
    //1 hour
    maxAge: 60*60*1000,
    //secrete key to encrypt cookie
    keys: [key.session.cookieKey]
}));
//passport intiailization
app.use(passport.initialize());
//passport session
app.use(passport.session());
//authentication
app.use("/auth", authRoutes);
//profile
app.use("/profile", profileRoutes);

//=========== routes ==============
//root route
app.get("/", (req, res) => {
    res.render("home", {user: req.user});
})

//start server
app.listen(8088, () => {
    console.log("Server starts");
});