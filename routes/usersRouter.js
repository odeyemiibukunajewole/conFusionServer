const express = require('express');
const { json, urlencoded } = require('body-parser');
const passort = require('passport')

const mongoose = require('mongoose');
const User = require('../model/user');
const passport = require('passport');
const authenticate = require('../authenticate')

const userRouter = express.Router();
userRouter.use(json());
userRouter.use(urlencoded({ extended: true }, { useNewUrlParser: true }));

/* GET users listing. */
userRouter.route('/')
  .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    User.find({}, (err, users) => {
      if (err) {
        return next(err);
      } else {
        res.statusCode = 200;
        res.setHeader('Content_type', 'application/json');
        res.json(users);
      }
    })
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
        if (req.body.firstname)
          user.firstname = req.body.firstname;
        if (req.body.lastname)
          user.lastname = req.body.lastname;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        });
      }
    });
});

userRouter.post('/login', passport.authenticate('local'), (req, res) => {

  const token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token: token, status: 'You are successfully logged in!' });
});

userRouter.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie(session - id);
    res.redirect('/')
  } else {
    const erro = new Error('Your password is incorrect');
    erro.status = 403;
    return next(erro);
  }
})

module.exports = userRouter;
