var crypto = require('crypto');
var NodeRSA = require('node-rsa');

module.exports = function(){
  var KeyManager = function(){};

  KeyManager.prototype._generateKey = function(){
    return new NodeRSA("-----BEGIN RSA PRIVATE KEY-----\nMIIEpQIBAAKCAQEAjm+BgnqVc27vqc4QoWo20ERctxTuwt6ZA5+28yT7DofH0QL0\n+xvgDRsewB6AF49SqiVObeLa1sImHbeZuefmwWlRlvXxhGpxdQAmpn61oSNPmluR\nJZaVv3k5r/W6R34j8CJrc/rjEsacIo/4fjuPPleGsCrPagUeHcXl89dF6hOvMSSF\n4rOvxKt5tNEfhny7GxWvEFKm5y7ZarrEqKJj5Hw19IsVMs6DHnqO3zq+K7X1Scmz\nH4B2mhv6lZiYI03CzBKcnUUnhUJ58ZsXel8Hh4Uy9tS9Y3isjkl8DG+d8XDO8IBe\nF4rLupPaAtSy3sFUxLSui3dszFH/FwI5PL+ZJwIDAQABAoIBAHnXPqTbsY5N/mt1\n31oEnqDnaZwfJuLBQYkNDZXOM4hJdA8CBYfsX2s2oMZdENuWeXMceIudO+/romlX\nTgPuMMGQEwAcoJ3R4/3exDE2QK53ozd6Tp4lwzFIRKWVgOR5LcrT1rEekzHTfWo/\nV6S71BvTCV8XL9gUSp/TUpKUurSxGXUDKyLbnjH3D8E6DvrNQOFn5le8aoU+GSQT\nPE0ZDtXUmWNMeBU3wZcggcwqUcXAhwUki7w6PfheXl26+IRemGylzDnQzhW4n/2O\ns7AqwXmIYbNlqJv0aRaFte1/iChuu9qbJ41fNJfx2jblOB5jbSObHAhWsT+Zcekz\nUmgVeTECgYEA3mDOB7WEL6UUv3u+6WgLN0ao3l5BuukPpz6IiAtu9LKa3UOOaplh\nyn9lQ+0Jq7GlZkjreX+0ZsHyGTDEQcmiq2F87HRdnsmp7PZZl3eSdZlk7ZcuK8Cr\n9zyRGu8P7UURVYq+P0X3EIxYbLW4fSjNShYCE9CbFeRSwpYi0ytYAO8CgYEAo/iB\nkCCKyvSuYzQJAlFUtz2QaXDJAOrvc7NSClhSzTf5eFQGFKgaHWmo51uVvW0gZWeN\nJMiwmAEPKKTQJOhfw6FDLpfM9l3MNS+clgNA88wPm1/rHtdzZbnp+BAASOacA9P4\nORd1aPqqayD0hc7jYYJCp6V5Ad0jrvaUwdoT+0kCgYEAmOLTI0evTpZfUlqAYbYP\nZ/xjYyZIaHmNMn1ynp3FteQJRrAIfM9hBTha5b1U1b73qP/fLJQY8kDK8nitpVE8\nTjljCqniJ6Yb9ndUFye1ALbqRdKXgqsfT4ZLeMn9GDJQ/Y+6xoOSncTvkiXJZfsk\nUJga64aS6RUltPRFkwsMoO8CgYEAjXSjgY0xb2mq0BZh90fmx7Yq0WvlXA9RyATZ\nL+eGd1hktXP3Uva6oMk4V29hPOvZ2OF+mE8yWdAAHdYhYtW9V+3VIWr//UJqGzAZ\n7CiebjSK+kXDdvXzrby3pbNYK4wW6A6Dw+0C8y/cuVLS4GTdMI/JpQtR21PFpvk+\n2AWk21ECgYEA1yxeMfnCl6uG0FI/NNR2agjvAJqEHt18wZVNk+Z1lBmsx7x7X+Mh\ni+JVkoUnlCkqZ7uH4AzitWFoCG3HGNaARMnhwtWFCNXLH6jzGfOhFhQXEnGjx1ys\nI5/pbxx7Z7QJrfmW+LvURp08/4iOi9551t6F8GzpvOF2JtlyBUImHEU=\n-----END RSA PRIVATE KEY-----");
  };

  KeyManager.prototype.getKeyPair = function(){
    var key = this._generateKey();
    return { public: key.exportKey("public"), private: key.exportKey()};
  };

  KeyManager.prototype.getSign = function(data){
    var key = this._generateKey();
    return key.sign(data,'base64');
  };

  return new KeyManager();
}();
