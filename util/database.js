const mysql = require('mysql2');
//creating new connection every time we execute code is a bit tough , 
//so we created a pool by using method of mysql2 package  
const pool = mysql.createPool({
  host:'localhost',
  user:'root',
  database:'node-complete',
  password:'1@Passworrd'
})

module.exports = pool.promise();