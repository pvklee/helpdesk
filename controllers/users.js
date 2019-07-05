const {validateSignup, validateLogin, validateAddRemoveSubject, validateUserId} = require('../validation/users')
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const conn = require('../config/db');

exports.signup = async (req, res) => {
  const {errors, isValid} = validateSignup(req.body);
  if(!isValid) {return res.status(400).json(errors);}
  const {email, password, firstname, lastname} = req.body;

  const [users] = await conn.query("SELECT * FROM users WHERE email = ?", email);

  if(users.length !== 0){
    res.status(400).json({email: 'email already taken'});
  }

  const hash = await bcrypt.hash(password, saltRounds);

  const user = {email, password: hash, role: 'user', firstname, lastname}
  let result;
  try {
    result = await conn.query("INSERT INTO users SET ?", user);
  } catch (errs) {
    return res.status(400).json(errs)
  }
  const payload = {id: result.insertId, email};
  jwt.sign(
    payload,
    keys.secretOrKey,
    {expiresIn: 3600},
    (err, token) => {
      return res.json({
        success: true,
        token: 'Bearer ' + token
      });
    });
}

exports.login = async (req, res) => {
  const {errors, isValid} = validateLogin(req.body);
  if(!isValid){return res.status(400).json(errors);}

  const {email, password} = req.body;
  const [users] = await conn.query("SELECT * FROM users WHERE email = ?", email);
  if(users.length === 0){
    return res.status(400).json({username: 'no user with that email'});
  }
  const match = await bcrypt.compare(password, users[0].password);
  if(match){
    const payload = {id: users[0].id, username: users[0].email};
    jwt.sign(
      payload,
      keys.secretOrKey,
      {expiresIn: 3600},
      (err, token) => {
        return res.json({
          success: true,
          token: 'Bearer ' + token
        });
      });
  }else{
    return res.status(400).json({password: 'incorrect password'});
  }
}

exports.current = (req, res) => {
  return res.json({id: req.currentUser.id});
}

exports.create_ticket = async (req, res) => {
  const submitter_id = req.currentUser.id;
  const {supporter_id, description} = req.body;
  const ticket = {
    description,
    status: 'new',
    submitter_id,
    supporter_id
  };
  const query = [`
    INSERT INTO tickets
    SET ?
  `, ticket];
  let result;
  try{
    [result] = await conn.query(...query);
  } catch (errs) {
    return res.status(400).json(errs);
  }
  return res.json({id: result.insertId});
}

exports.get_all_tickets = async (req, res) => {
  const id = req.currentUser.id;
  const query = [`
    SELECT *
    FROM tickets
    WHERE submitter_id = ?
    OR supporter_id = ?
  `, [id, id]];
  const [tickets] = await conn.query(...query)
  return res.json({tickets});
}

exports.update_ticket = async (req, res) => {
  const {status, ticket_id} = req.body;
  const query = [`
    UPDATE tickets
    SET status = ?
    WHERE id = ?
  `, [status, ticket_id]]
  let result;
  try{
    [result] = await conn.query(...query);
  } catch (errs) {
    return res.status(400).json(errs);
  }
  return res.json({id: result.info});
}