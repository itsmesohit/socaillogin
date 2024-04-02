const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/user');

passport.serializeUser((user, done) => {
    console.log('Serialize user');
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Deserialize user');
    User.findById(id).then((user) => {
        done(null, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: 'Put your client id here',
    clientSecret: 'Put your client secret here',
    callbackURL: '/auth/google/callback'
}, 
(accessToken, refreshToken, profile, next) => {
    console.log('Passport callback function fired');
    console.log(profile);
    const user1 = User.findOne({ googleId: profile.id })
        .then((currentUser) => {
            if(currentUser){
                console.log('User is: ', currentUser);
                next(null, currentUser);
            } else {
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id
                }).then((newUser) => {
                        console.log('New user created: ' + newUser);
                        next(null, newUser);
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    })
    // console.log('User is: ', user1);
);