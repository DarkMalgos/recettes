var express = require('express');
var router = express.Router();

const database = require('../services/database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    database.sendQuery(`SELECT * FROM recipes r`, function (err, results) {
        if (err) console.error('Error in fetching recipes', err)
        res.json(results)
    })
});

router.post('/', function (req, res, next) {
    database.sendQuery(`INSERT INTO comments (id_recipe, name, comment) VALUES (${req.body.comment.id_recipe}, '${req.body.comment.name}', "${req.body.comment.comment}")`, function (err, results) {
        if (err) console.error('error post on comments', err)
        res.json(results.insertId)
    })
})

module.exports = router;