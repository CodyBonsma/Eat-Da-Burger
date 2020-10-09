const orm = require("../config/orm.js");

const burger = {
    all: function(cb) {
        orm.all("burgers", function(res){
            cb(res);
        });
    },

    create: function(cols, vals, cb) {
        orm.create("cats", cols, vals, function(res){
            cb(res);
        });
    },

    update: function(objColVals, condition, cb){
        orm.update("burgers", objColVals, condition, function(res){
            cb(res);
        });
    }
};
// Export the database functions for the controller (burgers.controller.js).
module.exports = burger;