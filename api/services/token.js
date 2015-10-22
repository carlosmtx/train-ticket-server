/**
 * Created by cteixeira on 18-10-2015.
 */
module.exports = function(){
    var Token = function(){};
    Token.prototype.generate = function(user){
        return "" + user.id  + (new Date()).getTime();
    };
    Token.prototype.isValid = function(user,token){
        return true;
    };
    return new Token();
}();
