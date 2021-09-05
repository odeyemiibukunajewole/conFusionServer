const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
const { json, urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const Leaders = require('../model/leaders');
const authenticate = require('../authenticate')


leaderRouter.use(json());
leaderRouter.use(urlencoded({ extended: true }, { useNewUrlParser: true }));

leaderRouter.route('/')
    .get((req, res, next) => {
        Leaders.find({})
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader)
            })
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Leaders.create(req.body)
            .then((leader) => {
                console.log('leader Created', leader)
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader)
            })
            .catch((err) => next(err));

    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /Leaders');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Leaders.remove({})
            .then((leader) => {
                console.log('leader Created', leader)
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader)
            })
            .catch((err) => next(err));
    })
leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        Leaders.findById(req.params.leaderId)
            .then((leader) => {
                console.log('leader Created', leader)
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader)
            })
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /Leaders/' + req.params.leaderId);
    })

    .put(authenticate.verifyUser, (req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            })
            .catch((err) => next(err));
    })

    .delete(authenticate.verifyUser, (req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then((res) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(res);
            })
            .catch((err) => next(err));
    });


module.exports = leaderRouter;