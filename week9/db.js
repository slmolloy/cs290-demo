var mysql = require('mysql');
exports.pool = mysql.createPool({
  host  : 'localhost',
  user  : 'student',
  password: 'default',
  database: 'student'
});
// exports.getConnection = function(callback) {
//   pool.getConnection(function(err, connection) {
//     callback(err, connection);
//   });
// };