/**
 * Created by cteixeira on 03-10-2015.
 */

module.exports = function(){
    var yaml = require('js-yaml');
    var fs = require('fs');
    var RailwayManager = function(){};

    RailwayManager.prototype.get = function(){
        return yaml.safeLoad(fs.readFileSync('./railway/railway.yml','utf-8'));
    };

    return new RailwayManager();
}();