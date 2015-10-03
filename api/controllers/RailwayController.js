/**
 * Created by cteixeira on 03-10-2015.
 */

module.exports = {
    index: function(req,res){
        var railway = sails.services.railway.get();
        res.json(railway);
    }
};