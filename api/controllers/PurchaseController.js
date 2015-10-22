/**
 * PurchaseController
 *
 * @description :: Server-side logic for managing Purchases
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  purchase: function(req,res){
    Purchase.create(
      {
        start: req.body.start,
        end: req.body.end,
        user: req.user.id,
        price: 15, //TODO: vai ser calculada no serviço
        validated: "false"
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
    Purchase.findOne(req.params.id)
      .populate("user")
      .then(function(ticket){
        if(!ticket) return res.badRequest("Ticket does not exist.");
        else return res.ok(ticket);
      })
      .catch(function(err){
        return res.serverError(err);
      })
  }
};
