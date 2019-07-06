var express = require('express');
var router = express.Router();
var passport = require('passport');
var usersController = require('../controllers/users')
const isAuthenticated = passport.authenticate('jwt', {session: false});

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.get('/current', isAuthenticated, usersController.current);

module.exports = router;
