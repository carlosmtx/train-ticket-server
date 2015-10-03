/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    username : {
      type: 'string',
      required: true
    },
    email : {
      type: 'email',
      required: true

    },
    password : {
      type: 'string',
      required: true
    },
    cardType : {
      type: 'string',
      required: true
    },
    cardNumber: {
      type: 'string',
      required: true
    },
    cardExpiration : {
      type: 'string',
      required: true
    }
  }
};
