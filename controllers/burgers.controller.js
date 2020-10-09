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
    burger.create([
        "burger_name", "devoured"
    ], [req.body.burger_name, req.body.devour], function (result) {
        res.json({ id: result.insertId });
    });
});

router.put("api/burgers/:id", function (req, res) {
    const condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devour: req.body.devour
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;