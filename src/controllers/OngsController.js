const conn = require('../connection');
const crypto = require('crypto');
const DB_NAME = 'ongs';

module.exports = {
  CREATE: async (name, email, whatsapp, city, uf) => {
    const hexId = crypto.randomBytes(4).toString('HEX');

    return conn(DB_NAME).insert({id: hexId, name, email, whatsapp, city, uf});
  },


  ALL: async () => {
    const hexId = crypto.randomBytes(4).toString('HEX');

    return conn(DB_NAME).select('*');
  }
};