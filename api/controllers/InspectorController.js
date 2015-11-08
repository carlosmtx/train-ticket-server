/**
 * InspectorController
 *
 * @description :: Server-side logic for managing Inspector
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  login : function(req,res){
    sails.models.inspector.findOne(req.body)
      .then(function(inspector) {
        if(!inspector){
          return res.badRequest("No inspector found. Please verify your credentials.");
        }
        inspector.token = sails.services.token.generate(inspector);
        return sails.models.inspector.update({id : inspector.id},inspector);
      })
      .then(function(inspector){
        inspector[0].publicKey = sails.services.key.getKeyPair().public;
        return res.ok(inspector[0]);
      })
      .catch(function(err){
        return res.badRequest(err);
      })
  },

  tickets: function(req,res){
    if(!req.body.departure) return res.badRequest("Missing departure parameter");
    else if (!req.body.arrival) return res.badRequest("Missing arrival parameter");
    else if (!req.body.departureTime) return res.badRequest("Missing departureTime parameter");

    sails.models.ticket.find({
      departure: req.body.departure,
      arrival: req.body.arrival,
      departureTime: new Date(parseInt(req.body.departureTime))
    })
      .then(function(tickets){
        return res.ok({
          size: tickets.length,
          tickets: tickets
        });
      })
      .catch(function(err){
        return res.error(err);
      })
  }
};
