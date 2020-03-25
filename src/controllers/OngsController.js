const conn = require('../connection');
const crypto = require('crypto');
const DB_NAME = 'ongs';

module.exports = {
  // POST
  CREATE: async (req, resp) => {
    const hexId = crypto.randomBytes(4).toString('HEX');
    const body = req.body;
    try {
      const dbResp = await conn(DB_NAME).insert({id: hexId, ...body});
      return resp.json(dbResp);
    } catch(e) {
      return resp.json(e);
    }
  },

  // POST
  SEARCH: async (req, resp) => {
    const query = req.body;
    const dbResp = await conn(DB_NAME).where(query).select('*');
    return resp.json(dbResp);
  },

  // GET
  FIND_BYID: async (req, resp) => {
    const dbResp = await conn(DB_NAME).where('id', req.query.id).select('*').first();
    return resp.json(dbResp);
  },

  // GET
  ALL: async (req, resp) => {
    const dbResp = await conn(DB_NAME).select('*');
    return resp.json(dbResp);
  }
};