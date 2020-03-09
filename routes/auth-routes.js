const router = require("express").Router();
const passport = require("passport");

//go to login page
router.get("/login", (req, res) => {
    if(req.user) {
        res.redirect("/");
    }
    res.render("login", {user: req.user});
});

router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
});

//authenticate with google using middleware
router.get("/google", 
    passport.authenticate("google", {scope: ["profile", "email"]})
);

//redirect from google authentication, middleware is to get profile
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    //req.user contains anything from passport deserialization
    // res.send(req.user);
    res.redirect("/profile");
});

module.exports = router;