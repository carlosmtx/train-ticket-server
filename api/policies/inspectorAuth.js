module.exports = function(req, res, next) {
  var token = req.allParams().token;
  if(!token){
    return res.forbidden('You are not permitted to perform this action.');
  }
  sails.models.inspector.findOne({
    token: token
  }).then(function(inspector){
    if(inspector && sails.services.token.isValid(inspector,token)){
      req.user = inspector;
      return next();
    } else {
      return res.forbidden('You are not permitted to perform this action.');
    }
  });
};
