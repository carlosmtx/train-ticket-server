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

        sails.models.user.findOne({email: req.email})
            .then(function(user){
                if(user){
                    return res.badRequest('user already exists');
                }
                var newUser = req.allParams();
                newUser.token = sails.services.token.generate(newUser);
                return sails.models.user.create(newUser);
            })
            .then(function(user){
                delete user.password;
                return res.ok(user);
            }).catch(function(err){
                sails.log.error(err);
                return res.badRequest(err);
            });
        /*

         sails.models.user.findOrCreate({email: req.email}, req.allParams())
         .then(function(user){
         delete user.password;
         user.token = req.sessionID;
         return res.ok(user);
         })
         .catch(function(err){
         sails.log.error(err);
         return res.badRequest(err);
         })*/
    },

    login : function(req,res){
        debug('Login Action');
        sails.models.user.findOne(req.body)
            .then(function(user) {
                if(!user){
                    return res.badRequest("No user found. Please verify your credentials.");
                }
                user.token = sails.services.token.generate(user);
                return sails.models.user.update({id : user.id},user);
            })
            .then(function(user){
                return res.ok(user[0]);
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
    },

    tickets: function(req,res){
      async.parallel({
          active: function(cb){
            Ticket.find({ user: req.user.id, validated: false}).sort("departureTime DESC")
              .then(function(tickets){
                async.each(tickets,
                function(ticket,asyncCB){
                    var encryptData =  ticket.id.toString() + ticket.departure.toString() + ticket.arrival.toString() + new Date(ticket.departureTime).getTime();
                  ticket.signature = sails.services.key.getSign(encryptData);
                  asyncCB(null,ticket);
                },
                function(err){
                  cb(null,tickets);
                });
              })
              .catch(function(err){
                cb(err,null);
              })
          },
          used: function(cb){
            Ticket.find({ user: req.user.id, validated: true}).sort("departureTime ASC")
              .then(function(tickets){
                async.each(tickets,
                  function(ticket,asyncCB){
                    var encryptData = ticket.departure + ticket.arrival + ticket.user;
                    ticket.signature = sails.services.key.getSign(encryptData);
                    asyncCB(null,ticket);
                  },
                  function(err){
                    cb(null,tickets);
                  });
              })
              .catch(function(err){
                cb(err,null);
              })
          }
        },
        function(err,results){
          if(err) return res.serverError(err);
          else return res.ok(results);
        });

    }
};

