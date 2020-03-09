const router = require("express").Router();

//middleware to redirect user if not logged in
const authCheck = (req, res, next) => {
    //if not yet login
    if(!req.user) {
        res.redirect("/auth/login");
    }
    else {
        next();
    }
};

//apply middleware to all routes here
router.use(authCheck);
//if only specific route
// router.use("/", authCheck);
//or we can add middleware directly to any route
// router.get("/", authCheck, (req, res) => {});

//show profile
router.get("/", (req, res) => {
    //req.user is from passportjs authen
    // res.send("Your email: " + req.user.email);
    res.render("profile", {user: req.user});
});

module.exports = router;