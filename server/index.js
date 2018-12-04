const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const passport = require("passport");
const cookieSession = require("cookie-session");
require('./models/User');
require('./models/Child');
require('./models/Area');

require('./services/passport');
const registrationRoutes = require('./routes/registrationRoutes');
const childrenRoutes  = require('./routes/childrenRoutes');
const areaRoutes = require('./routes/areaRoutes');

const morgan = require('morgan');

mongoose.connect(encodeURI(keys.mongoURI),{ useNewUrlParser: true });

const app = express();
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(
  cookieSession({
      maxAge: 30*24*60*60*1000,
      keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRouter);
app.use(registrationRoutes);
app.use(childrenRoutes);
app.use(areaRoutes);

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
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Example app!');
});