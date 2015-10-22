/**
 * Ticket.js
 *
 * @description :: Stores ticket purchases of all users.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    // Start and End Stations
    start: {
      type: 'string',
      required: 'true'
    },
    end : {
      type: 'string',
      required: 'true'
    },

    user : {
      model: 'User',
      required: true
    },

    // Validated or not
    validated : {
      type: 'boolean',
    },

    price: {
      type: 'float'
    },

    train: {
      type: 'integer'
    }
  }
};

