/**
 * TicketController
 *
 * @description :: Server-side logic for managing Purchases
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  purchase: function(req,res){
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
        departureTime: req.body.time,
        departureDate: req.body.date,
        validated: false
      }
    )
      .then(function(ticket){
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
  }
};
