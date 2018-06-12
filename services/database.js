const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'mysql-eval.alwaysdata.net',
    user     : 'eval',
    password : 'totolola42',
    database : 'eval_bdd'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected')
});

function sendQuery(query, callback) {
    connection.query(query, function (error, results, fields) {
        if(error){
            callback(error)
        }else {
            callback(null, results)
        }
    })
}

module.exports =({
    sendQuery: sendQuery
});