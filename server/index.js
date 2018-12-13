const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const passport = require("passport");
const cookieSession = require("cookie-session");
const app = express();
app.use(bodyParser.json());

require('./models/User');
require('./models/Child');
require('./models/Area');
require('./models/Rule');
require('./models/ChildUser');
require('./models/ConnectionCode');
require('./services/passport');

const locationRoutes = require('./routes/childRoutes/locationRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const childrenRoutes  = require('./routes/parentRoutes/childrenRoutes');
const areaRoutes = require('./routes/parentRoutes/areaRoutes');
const ruleRouter = require('./routes/parentRoutes/ruleRoutes');
const connectionRouter = require('./routes/childRoutes/connectionRoutes');

const morgan = require('morgan');

mongoose.connect(encodeURI(keys.mongoURI),{ useNewUrlParser: true });


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
app.use(ruleRouter);
app.use(locationRoutes);
app.use(connectionRouter);

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