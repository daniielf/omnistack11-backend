const conn = require('../connection');
const DB_NAME = 'incidents';

module.exports = {
  // POST - Route /create
  CREATE: async (req, resp) => {
    const {title, description, value, ong_id} = req.body;
    try {
      const dbResp = await conn(DB_NAME).insert({title, description, value, ong_id});
      return resp.json(dbResp);
    } catch(e) {
      return resp.json(e);
    }
  },

  // GET - Route /list
  FIND_BYONG: async (req, resp) => {
    const dbResp = await conn(DB_NAME).where('ong_id', req.query.ong_id).select('*');
    return resp.json(dbResp);
  },

  // POST - Route /search
  SEARCH: async (req, resp) => {
    const { ong_id } = req.query;
    const query = req.body;
    const dbResp = await conn(DB_NAME).where({ong_id, ...query}).select('*');
    return resp.json(dbResp);
  },

  // GET - Route /
  // FIND: async (query) => {
  //   return conn(DB_NAME).where(query).select('*');
  // },

  // GET - Route /find
  FIND_BYID: async (req, resp) => {
    const dbResp = await conn(DB_NAME).where('id', req.query.id).select('*').first();
    return resp.json(dbResp);
  },

  // GEt - Route /all
  ALL: async (req, resp) => {
    const dbResp = await conn(DB_NAME).select('*');
    return resp.json(dbResp);
  }
};