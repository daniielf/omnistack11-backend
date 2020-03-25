const conn = require('../connection');
const crypto = require('crypto');
const DB_NAME = 'incidents';

module.exports = {
  CREATE: async (title, description, value, ong_id) => {
    return conn(DB_NAME).insert({title, description, value, ong_id});
  },

  FIND_BYONG: async (ong_id) => {
    console.log('ongID', ong_id);
    return conn(DB_NAME).where('ong_id', ong_id).select('*');
  },

  SEARCH: async (ong_id, query) => {
    return conn(DB_NAME).where({ong_id, ...query}).select('*');
  },

  FIND: async (query) => {
    return conn(DB_NAME).where(query).select('*');
  },

  FIND_BYID: async (id) => {
    return conn(DB_NAME).where('id', id).select('*').first();
  },

  ALL: async () => {
    return conn(DB_NAME).select('*');
  }
};