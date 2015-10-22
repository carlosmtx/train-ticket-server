/**
 * Created by cteixeira on 18-10-2015.
 */
module.exports = function(req, res, next) {
    var token = req.allParams().token;
    if(!token){
        return res.forbidden('You are not permitted to perform this action.');
    }
    sails.models.user.findOne({
        token: token
    }).then(function(user){
        if(user && sails.services.token.isValid(user,token)){
            req.user = user;
            return next();
        } else {
            return res.forbidden('You are not permitted to perform this action.');
        }
    });
};
