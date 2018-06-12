var express = require('express');
const multer = require('multer');

var router = express.Router();

const database = require('../services/database.js');

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "app/src/assets/");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({storage: Storage}).array("file", 3); //Field name and max count

/* GET home page. */
router.get('/', function (req, res, next) {
    database.sendQuery(`SELECT r.* FROM recipes r`, function (err, results) {
        if (err) console.error('Error in fetching recipes', err)
        res.json(results)
    })
});

router.get('/:id', function (req, res, next) {
    let id = req.params.id
    let response = {}
    database.sendQuery(`SELECT r.* FROM recipes r WHERE r.id = ${id}`, function (err, results) {
        if (err) console.error('Error in fetching recipes', err)
        response.recipe = results[0]
        database.sendQuery(`SELECT * FROM ingredients WHERE id_recipe = ${id}`, function (err, results) {
            if (err) console.error('Error in fetching ingredients', err)
            response.ingredients = results
            database.sendQuery(`SELECT * FROM steps WHERE id_recipe = ${id}`, function (err, results) {
                if (err) console.error('Error in fetching steps', err)
                response.steps = results
                database.sendQuery(`SELECT * FROM comments WHERE id_recipe = ${id}`, function (err, results) {
                    if (err) console.error('Error in fetching comments', err)
                    response.comments = results
                    res.json(response)
                })
            })
        })
    })
});

router.post('/', function (req, res, next) {
    /*upload(req, res, function (err) {
        let file = req.files[0].path.split('\\')
        if (err) {
            return err;
        }
    })*/
    console.log(req.body)
    database.sendQuery(`INSERT INTO recipes (title, nb_people, picture_path) VALUES ('${req.body.recipe.title}', ${req.body.recipe.nb}, 'nope')`, function (err, results) {
        if (err) {
            console.error('Error in insert recipes', err)
        } else {
            for (let i = 0; i < req.body.ingredients.length; i++) {
                let ingredient = req.body.ingredients[i]
                database.sendQuery(`INSERT INTO ingredients (name, quantity, id_recipe) VALUES ('${ingredient.name}', ${ingredient.quantity}, ${results.insertId})`, function (err, results) {
                    if (err) {
                        console.error('Error in insert ingredients', err)
                    }
                })
            }
            for (let i = 0; i < req.body.steps.length; i++) {
                let step = req.body.steps[i]
                database.sendQuery(`INSERT INTO steps (step, text, id_recipe) VALUES (${step.nb}, '${step.text}', ${results.insertId})`, function (err, results) {
                    if (err) {
                        console.error('Error in insert steps', err)
                    }
                })
            }
            res.json(results.insertId)
        }
    })
})

module.exports = router;