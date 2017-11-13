const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  req.app.locals.logger.info('Login form');
  res.render(path.join('login', 'index.pug'));
});

router.post('/', (req, res) => {
  req.app.locals.logger.info('Request parameters', req.body);
  res.render(path.join('login', 'index.pug'));
});

module.exports = router;
