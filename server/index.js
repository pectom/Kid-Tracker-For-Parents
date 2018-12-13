const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const passport = require("passport");
const cookieSession = require("cookie-session");

const app = express();

require('./models/User');
require('./models/Child');
require('./models/Area');
require('./models/Rule');
require('./models/ChildUser');
require('./models/ConnectionCode');
require('./services/passport');

const morgan = require('morgan');
app.use(morgan('dev'));

mongoose.connect(encodeURI(keys.mongoURI),{ useNewUrlParser: true });

app.use(bodyParser.json());
app.use(
  cookieSession({
      maxAge: 30*24*60*60*1000,
      keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

const mainRouter = require('./routes/mainRouter');
app.use(mainRouter);

app.get('/api/current_user',(req,res) =>{
    if(!req.user) {
        res.send(false);
    } else {
        res.send(req.user);
    }
});

app.get('/api/logout',(req,res) =>{
    req.logout();
    res.redirect('/');
});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');

    app.get('/auth/google/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Example app!');
});