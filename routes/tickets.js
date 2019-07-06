var express = require('express');
var router = express.Router();
var passport = require('passport');
var ticketsController = require('../controllers/tickets')
const isAuthenticated = passport.authenticate('jwt', {session: false});
const {isSupporter} = require('../services/authorize');

router.get('/get_all_tickets', isAuthenticated, ticketsController.get_all_tickets);
router.post('/create_ticket', isAuthenticated, ticketsController.create_ticket);
router.post('/update_ticket', [isAuthenticated], ticketsController.update_ticket);

module.exports = router;