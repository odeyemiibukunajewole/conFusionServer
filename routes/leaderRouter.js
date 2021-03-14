const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());
leaderRouter.use(bodyParser.urlencoded({ extended: false }));

leaderRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the dishes to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })
    .delete((req, res, next) => {
        res.end('Deleting all dishes');
    });

    leaderRouter.route('/:leaderId')
    .all((req, res, next) => {
        res.end('Will send details of the dish: ' + req.params.leaderId + ' to you!');
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/' + req.params.leaderId);
    })

    .put((req, res, next) => {
        res.write('Updating the dish: ' + req.params.leaderId + '\n');
        res.end('Will update the dish: ' + req.body.name +
            ' with details: ' + req.body.description);
    })

    .delete((req, res, next) => {
        res.end('Deleting dish: ' + req.params.leaderId);
    });

module.exports = leaderRouter;