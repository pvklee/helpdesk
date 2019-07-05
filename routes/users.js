var express = require('express');
var router = express.Router();
var passport = require('passport');
var usersController = require('../controllers/users')
const isAuthenticated = passport.authenticate('jwt', {session: false});
const {isSupporter} = require('../services/authorize');

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.get('/current', isAuthenticated, usersController.current);
router.get('/get_all_tickets', isAuthenticated, usersController.get_all_tickets);
router.post('/create_ticket', isAuthenticated, usersController.create_ticket);
router.post('/update_ticket', [isAuthenticated], usersController.update_ticket);

module.exports = router;
