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
    const ong_id = req.headers.authorization;
    if (!ong_id) return resp.status(401).json({message: "Unauthorized"});

    const { page, count } = req.query;
    const [rows] = await conn(DB_NAME).where('ong_id', ong_id).count();
    const countValue = rows['count(*)'];

    const response = {};

    const dbResp = await conn(DB_NAME)
                          .where('ong_id', ong_id)
                          .select('*')
                          .limit(count)
                          .offset((page-1) * count);
    
    if (countValue > dbResp.length + ((page - 1) * count)) {
      const nextPage = 'http://' + req.headers.host + '/incident/' + ong_id + '/list?page=' + (Number(page)+1) + '&count=' + count;
      response['next'] = nextPage;
    }

    if (page > 1) {
      const previousPage = 'http://' + req.headers.host + '/incident/' + ong_id + '/list?page=' + (Number(page)-1) + '&count=' + count;
      response['previous'] = previousPage;
    }

    response['data'] = dbResp;
    response['totalCount'] = countValue;
    response['currentPage'] = Number(page);
    return resp.json(response);
  },

  // POST - Route /search
  SEARCH: async (req, resp) => {
    const { ong_id } = req.params;
    const query = req.body;
    const dbResp = await conn(DB_NAME).where({ong_id, ...query}).select('*');
    return resp.json(dbResp);
  },

  // GET - Route /find
  FIND_BYID: async (req, resp) => {
    const { id } = req.params;
    const dbResp = await conn(DB_NAME).where('id', id).select('*').first();
    return resp.json(dbResp);
  },

  // GET - Route /all
  ALL: async (req, resp) => {
    const dbResp = await conn(DB_NAME).select('*');
    return resp.json(dbResp);
  },

  // GET - Route /delete/:id
  DELETE: async (req, resp) => {
    const { id } = req.params;
    const ong_id = req.headers.authorization
    const checkContent =  await conn(DB_NAME).where({id}).select('*').first();
    if (!checkContent) resp.status(404).json({message: "Document Not Found"});
    if (checkContent.ong_id !== ong_id) resp.status(401).json({message: "Unauthorized"});

    return resp.json({ok: true});
  }
};