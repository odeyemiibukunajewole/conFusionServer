const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
const { json, urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../model/promotions');
const authenticate = require('../authenticate')


promoRouter.use(json());
promoRouter.use(urlencoded({ extended: true }, { useNewUrlParser: true }));

promoRouter.route('/')
    .get((req, res, next) => {
        Promotions.find({})
            .then((promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions)
            })
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Promotions.create(req.body)
            .then((promotions) => {
                console.log('promotions Created', promotions)
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions)
            })
            .catch((err) => next(err));

    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /Promotions');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Promotions.remove({})
            .then((promotions) => {
                console.log('promotions Created', promotions)
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions)
            })
            .catch((err) => next(err));
    })
promoRouter.route('/:promoId')
    .get((req, res, next) => {
        Promotions.findById(req.params.promoId)
            .then((promotions) => {
                console.log('promotions Created', promotions)
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions)
            })
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /Promotions/' + req.params.promoId);
    })

    .put(authenticate.verifyUser, (req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, { new: true })
            .then((promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            })
            .catch((err) => next(err));
    })

    .delete(authenticate.verifyUser, (req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promoId)
            .then((res) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(res);
            })
            .catch((err) => next(err));
    });

module.exports = promoRouter;