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
                res.status(400);
                return res.json(err);
            } else {
                debug("User Created Successfully");
                return res.json(elem);
            }
        })
    },

    login : function(req,res){
        debug('Login Action');
        sails.models.user.findOne(req.allParams(),function(err,elem){
            if(elem){
                debug("Login Successful");
                req.session.user = elem;
                return res.json(elem);
            } else {
                debug("Login Failed");
                res.status(400);
                return res.json(err);
            }
        });
    },

    isLogged : function(req,res){
        if (req.session.user ){
            res.json(req.session.user);
        } else {
            res.json(false);
        }
    },

    list : function(req,res){
        sails.models.user.find(function(err,users){
            res.json(users);
        })
    }


};

