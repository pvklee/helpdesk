const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'kevin',
  password: 'password',
  database: 'helpdesk'
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
  }
  console.log('Connection established');
})

con.query('INSERT INTO users SET ?', user, function(err, res){
  if(err){
    console.log('err: ', err);
  } else {
    console.log(res);
  }
})

con.end(function(err){
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
  if(err) console.log('err: ', err);
  else console.log('Terminated done: ');
})