const express = require('express')
const mongoose = require('mongoose');
const passportConfig = require('./passport/passport');
const passport = require('passport');
const cookieSession = require('cookie-session');

const app = express();
const port = 4000

const auth = require("./routes/auth");

// connect to db

const DB_URL = 'mongodb+srv://itsmesohit:itsmesohit@cluster0.ad3buwr.mongodb.net'

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
    

app.use(express.json());
// use express session

app.use(require('express-session')({
    secret : 'keyboardcat', 
    resave: true,
    saveUninitialized: true
}));


// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys : ['keyboard cat']
// }));

app.use(passport.initialize());
app.use(passport.session());



app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/profile', (req, res) => {
    if (req.user) {
        res.send("This is me " + req.user.username);
    } else {
        res.send("User not authenticated");
    }
});


app.use('/auth', auth);


app.get('/about', (req, res) => res.send('About Page!'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

