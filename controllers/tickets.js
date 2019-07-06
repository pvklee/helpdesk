const conn = require('../config/db');

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