const OngController = require('./OngsController');

module.exports = {
  // POST
  START: async (req, resp) => {
    const { id } = req.params;
    const response = await OngController.FIND_BYID(id);
    if (!response) return resp.status(500).json({ message: 'ONG not Found' });
    return resp.json(response);
  }
};