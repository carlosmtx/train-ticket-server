/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var debug = require('debug')('TrainTicket-UserController.js');
module.exports = {

  create : function(req,res){
    debug('Creating Model');
    if(!req.body.email) return res.badRequest("Email not found");

    sails.models.user.findOrCreate({email: req.email}, req.allParams())
      .then(function(user){
        delete user.password;
        user.token = req.sessionID;
        return res.ok(user);
      })
      .catch(function(err){
        sails.log.error(err);
        return res.badRequest(err);
      })
  },

  login : function(req,res){
    debug('Login Action');
    sails.models.user.findOne(req.body)
      .then(function(user) {
        if(!user){
          return res.badRequest("No user found. Please verify your credentials.");
        }
        else{
          delete user.password;
          user.token = req.sessionID;
          req.session.user = user;
          req.session.authenticated = true;
          return res.ok(user);
        }
      })
      .catch(function(err){
        return res.badRequest(err);
      })
  },

  isLogged : function(req,res){
    if (req.session.user ){
      res.ok(req.session);
    } else {
      return res.badRequest(false);
    }
  },

  list : function(req,res){
    sails.models.user.find(function(err,users){
      res.ok(users);
    })
  }


};

