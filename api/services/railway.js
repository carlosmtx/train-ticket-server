/**
 * Created by cteixeira on 03-10-2015.
 */

module.exports = function(){
  var yaml = require('js-yaml');
  var fs = require('fs');
  var RailwayManager = function(){};
  var PRICE_LENGTH_RELATION = 0.30;

  RailwayManager.prototype.get = function(){
    return yaml.safeLoad(fs.readFileSync('./railway/railway.yml','utf-8'));
  };

  RailwayManager.prototype.getTripPrice = function(dep, arr){
    var railway =this.get();
    for(var c in railway.connections){
      if(railway.connections[c].dStation == dep && railway.connections[c].aStation == arr){
        return railway.connections[c].length * PRICE_LENGTH_RELATION;
      }
    }
    return -1;

  };

  return new RailwayManager();
}();
