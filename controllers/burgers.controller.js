const express = require("express");
//import the model burger.js to use its database functions
const burger = require("../models/burger.js");

const router = express.Router();

router.get("/", function (req, res) {
    burger.all(function (data) {
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (res, req) {
    console.log(res.body);
    burger.create([
        "burger_name", "devoured"
    ], [res.body.burger_name, res.body.devour],
    function (result) {
        console.log(res.body);
        console.log("You reached this point");
        req.json({ id: result.insertId });
        
    });
});

router.put("/api/burgers/:id", function (req, res) {
    const condition = "id = " + req.params.id;

    console.log("condition", condition);
    // console.log(req.body);

    burger.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;