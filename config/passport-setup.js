const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const key = require("./key");

//serialize user data to cookie for session, called by passport.use() below
passport.serializeUser((user, done) => {
    //done(err, id);
    done(null, user);
});

//deserialize user data from session for using in any web pages
passport.deserializeUser((id, done) => {
    //id comes from serialized cookie
    //generally we query user data by id from database
    // assume that we don't query DB and only deserialize the saved serialized cookie
    done(null, id);
});

passport.use(
    new GoogleStrategy({
        clientID: key.google.clientID,
        clientSecret: key.google.clientSecret,
        callbackURL: "/auth/google/redirect"
    }, (accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        // we may need: profile.id, profile.displayName, profile.photos[0].value, profile.emails[0].value
        // use id or email to insert or verify with data in database

        if(profile.emails[0].value == "usurapong@gmail.com") {
            // console.log("admin");
            // assume that this email has a related ID in database"
            let user = {"email": profile.emails[0].value, "photo": profile.photos[0].value};
            //admin
            //serialize user info to cookie, actually we can serialize more data, but should not be larger than cookie's size (4KB)
            done(null, user);
            //after this, it will call the callbackURL above 
        }
        else {
            //committee

        }
    })
);