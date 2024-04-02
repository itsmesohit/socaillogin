const router = require('express').Router();
const passport = require('passport');
const user = require('../model/user');


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/google', passport.authenticate( 'google' ,{
    scope: ['profile' , 'email']
}), (req, res) => {
    res.send('Logging in with google');
});
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/login' }), (req, res) => {
    console.log( "This is before redirecting to the home page " +req.user);
    res.send(req.user);
});

module.exports = router;
