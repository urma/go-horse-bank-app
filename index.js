const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const winston = require('winston');

const app = express();

/* Application globals */
app.locals.logger = new winston.Logger({
  transports: [
    new winston.transports.Console({ colorize: true, timestamp: true }),
  ],
});
app.locals.models = require('./app/models');

/* Enable request body parsing */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Configure paths */
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'app', 'public')));

/* Log requests */
app.use((req, res, next) => {
  app.locals.logger.info(req.ip, req.method, req.url);
  next();
});

/* Mount controller paths */
app.use('/login', require('./app/controllers/login'));

/* Start server */
app.locals.models.sequelize.sync().then(() => {
  app.listen(3000, () => {
    app.locals.logger.info('Web server started at http://127.0.0.1:3000/');
  });
});
