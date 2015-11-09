var NodeRSA = require('node-rsa');
var crypto = require('crypto')

module.exports = function(){
    var KeyManager = function(){};

    KeyManager.prototype._generateKey = function(){
        return new NodeRSA(
            "-----BEGIN RSA PRIVATE KEY-----\nMIIBOgIBAAJBAL2N2KM0oOsV+LFNnFCRr/+oMoN2zp1ICq5mFqPNQccTHhCnFWG2\nlN0oxNvJwoPg0y+m1a6VDKBxaTW7JnCTNKUCAwEAAQJAYcfdO/t3Ey4HVvcRLqKo\npnoObLCJzqqOD/7LqP3F87muoGMsT55kfqOdMHMvQ/Powd2AiDIVBJ7OlyjIWTxM\nVQIhANxg61Es8i0IY56EBF48eUBKP6gLK8/73kXQHyJm4Ra3AiEA3DFvWwzBxQBs\nlZakT2DJMwgBxfeJJyWnt+wR1LHzE4MCICWGHytQQuAmGIhKJFBDbcXjnpknZcth\nMISknliGOfdbAiEAvggsAnhQAqULEU6hH6B4BAK1BRVM2Ow2gxTJjrbFAeECIF6Y\nWWMbGZX8UCbplHiCfKfwA5O07SFlXOMG+434ZrI7\n-----END RSA PRIVATE KEY-----",
            {
                "signingScheme" : "sha1"
            }
        );
    };

    KeyManager.prototype.getKeyPair = function(){
        var key = this._generateKey();
        return { public: key.exportKey("public"), private: key.exportKey()};
    };

    KeyManager.prototype.getSign = function(data){
        var key = this._generateKey();
/*
        shasum = crypto.createHash('sha1');
        shasum.update(data);

        var hash = shasum.digest('base64');*/
        return key.sign(data,'base64');
    };

    return new KeyManager();
}();
