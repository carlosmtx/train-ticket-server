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
        return res.ok(inspector[0]);
      })
      .catch(function(err){
        return res.badRequest(err);
      })
  }
};
