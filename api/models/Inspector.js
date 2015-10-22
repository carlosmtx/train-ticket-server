/**
 * Inspector.js
 *
 * @description :: Stores Inspector information.
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
    token: {
      type: 'string'
    }
  }
};

