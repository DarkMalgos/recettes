var express = require('express');
var router = express.Router();

const database = require('../services/database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    database.sendQuery(`SELECT r1.*,
                               r2.*
                        FROM recipes r1
                        JOIN favorites f ON r1.id = f.id_recipe
                        JOIN recipes r2 ON r2.id != f.id_recipe
                        `, function (err, results) {
        if (err) console.error('Error in fetching favorites', err)
        res.json(results)
    })
});

router.post('/:id', function (req, res, next) {
    let id = req.params.id
    database.sendQuery(`INSERT INTO favorites (id_recipe) VALUES (${id})`, function (err, results) {
        if (err) console.error('error in post favorites', err)
        res.json(results.insertId)
    })
})

module.exports = router;