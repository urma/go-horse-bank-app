const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  req.app.locals.logger.info('Login form');
  res.render(path.join('login', 'index.pug'));
});

router.post('/', (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    res.render(path.join('login', 'index.pug'), {
      flash: {
        type: 'is-danger',
        title: 'Error',
        message: 'Invalid username and/or password',
      },
    });
  } else {
    req.app.locals.models.User.authenticate(req.body.username, req.body.password).then((user) => {
      if (!user) {
        res.render(path.join('login', 'index.pug'), {
          flash: {
            type: 'is-danger',
            title: 'Error',
            message: 'Invalid username and/or password',
          },
        });
      } else {
        res.render(path.join('login', 'index.pug'), {
          flash: {
            type: 'is-info',
            title: 'Success',
            message: `Logged in as user ${user.email}`,
          },
        });
      }
    });
  }
});

router.get('/register', (req, res) => {
  req.app.locals.logger.info('New user registration');
  res.render(path.join('login', 'register.pug'));
});

router.post('/register', (req, res) => {
  if (!req.body || !req.body.username || !req.body.password || !req.body['confirm-password']) {
    res.render(path.join('login', 'register.pug'), {
      flash: {
        type: 'is-danger',
        title: 'Error',
        message: 'You must fill in all the form fields',
      },
    });
  } else if (req.body.password !== req.body['confirm-password']) {
    res.render(path.join('login', 'register.pug'), {
      flash: {
        type: 'is-danger',
        title: 'Error',
        message: 'Passwords do not match',
      },
    });
  } else {
    const user = req.app.locals.models.User.build({
      email: req.body.username,
    });

    user.setPassword(req.body.password).then(() => {
      user.save().then(() => {
        res.render(path.join('login', 'index.pug'), {
          flash: {
            type: 'is-success',
            title: 'Success',
            message: 'User created successfully, please log in',
          },
        });
      });
    });
  }
});

module.exports = router;
