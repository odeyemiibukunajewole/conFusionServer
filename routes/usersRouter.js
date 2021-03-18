const express = require('express');
const { json, urlencoded } = require('body-parser');
const passort = require('passport')

const mongoose = require('mongoose');
const User = require('../model/user');
const passport = require('passport');

const userRouter = express.Router();
userRouter.use(json());
userRouter.use(urlencoded({ extended: true }, { useNewUrlParser: true }));

/* GET users listing. */
userRouter.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

userRouter.post('/signup', (req, res, next) => {
  User.register(new User({ username: req.body.username }),
    req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else {
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true, status: 'Registration Successful!' });
        });
      }
    });
});

userRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, status: 'You are successfully logged in!' });
});

userRouter.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie(session - id);
    res.redirect('/')
  } else {
    const erro = new Error('Your password is incorrect');
    erro.statusCode = 403;
    return next(erro);
  }
})

module.exports = userRouter;
