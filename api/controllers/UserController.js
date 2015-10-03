/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var debug = require('debug')('TrainTicket-UserController.js');
module.exports = {
    index : function(req,res){
        debug('Creating Model');
        sails.models.user.create(req.allParams()).exec(function(err,elem){
            debug('Model Ended');
            if(err){
                debug("Errors Found in model creation: %s",err);
                res.json(err);
            } else {
                debug("User Created Successfully");
                res.json(elem);
            }
        })
    },
    list : function(req,res){
        sails.models.user.find(function(err,users){
            res.json(users);
        })
    }


};

