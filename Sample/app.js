const express = require('express');
const app = express();
const session = require('express-session')
const passport = require('passport');
const WebAppStrategy = require("ibmcloud-appid").WebAppStrategy;

app.use(session({
    secret: "123456",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

passport.use(new WebAppStrategy({
    tenantId: "42965ab2-xxxx-xxxx-xxxx-161852d195af",
    clientId: "c3676ffc-xxxx-xxxx-xxxx-10ba73b68b88",
    secret: "OWUyZDg4NTAtNTk2XXXXYWEXLWFhXXXXYmY2NXXXXGQ3MjMx",
    oauthServerUrl: "https://eu-gb.appid.cloud.ibm.com/oauth/v4/42965ab2-xxxx-xxxx-xxxx-161852d195af",
    redirectUri: "http://localhost:3000/appid/callback" //+ CALLBACK_URL
}));
app.get('/appid/callback', passport.authenticate(WebAppStrategy.STRATEGY_NAME));
//app.get(CALLBACK_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME));
app.use(passport.authenticate(WebAppStrategy.STRATEGY_NAME));
//app.get("/protected", passport.authenticate(WebAppStrategy.STRATEGY_NAME), function(req, res) {
//  res.json(req.user);
//});
app.use(express.static('./public'));

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});
