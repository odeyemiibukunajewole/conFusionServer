const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./model/user');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());