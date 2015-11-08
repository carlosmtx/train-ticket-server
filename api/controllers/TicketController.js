/**
 * TicketController
 *
 * @description :: Server-side logic for managing Purchases
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  index: function(req,res){
    Ticket
        .find()
        .then(function(tickets){
          var result = _.map(tickets,function(ticket){
            var encryptData = ticket.id + ticket.departure + ticket.arrival + ticket.departureTime ;
            ticket.signature = sails.services.key.getSign(encryptData);
            return ticket;
          });
          res.json(result);
        })
  },


  purchase: function(req,res){
    // Verify inputs
    if(!req.body.departure)     return res.badRequest("No departure station was passed as parameter.");
    else if(!req.body.arrival)  return res.badRequest("No arrival station was passed as parameter.");
    else if(!req.body.departureTime)  return res.badRequest("No departure time was passed as parameter.");

    // Get  Price of the requested trip
    var price = sails.services.railway.getTripPrice(req.body.departure, req.body.arrival);
    if(price == -1) return res.serverError("Connection doesn't exist.");

    // Create Ticket
    Ticket.create(
        {
          departure: req.body.departure,
          arrival: req.body.arrival,
          user: req.user.id,
          price: price,
          departureTime: new Date(parseInt(req.body.departureTime)),
          validated: false
        }
    )
        .then(function(ticket){
          var encryptData = ticket.departure + ticket.arrival + ticket.user;
          ticket.signature = sails.services.key.getSign(encryptData);
          return res.ok(ticket);
        })
        .catch(function(err){
          return res.serverError(err);
        })
  },

  info: function(req,res){
    if(!req.body.id) return res.badRequest("Ticket does not exist.");

    Ticket.findOne(req.body.id)
        .populate("user")
        .then(function(ticket){
          if(!ticket) return res.badRequest("Ticket does not exist.");
          else return res.ok(ticket);
        })
        .catch(function(err){
          return res.serverError(err);
        })
  },

  validate: function(req,res){
    Ticket.findOne(req.body.id)
        .then(function(ticket){
          if(!ticket) return res.badRequest("Ticket does not exist.");
          ticket.validated = true;
          ticket.save(function(err,newTicket){
            if(err) return res.serverError(err);
            return res.ok(newTicket);
          })
        })
        .catch(function(err){
          return res.serverError(err);
        })
  },

  teste: function(req,res){
    var data = sails.services.key.getSign("lool");
    return res.json(data);
  }
};
