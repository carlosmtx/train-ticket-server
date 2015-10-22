/**
* User.js
*
* @description :: Stores User information, including their credit card.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    email : {
      type: 'string',
      unique: true
    },
    password : {
      type: 'string',
      required: true
    },
    cardType : {
      type: 'string'
    },
    cardNumber: {
      type: 'string'
    },
    cardExpiration : {
      type: 'string'
    },
    token: {
      type: 'string'
    }
  }
};

