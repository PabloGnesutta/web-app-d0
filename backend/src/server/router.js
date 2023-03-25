const {
  createUser,
  getUsers,
  getUser,
} = require('../controllers/userController');
const { _404, _json } = require('./responses');

module.exports = {
  router(req, res, url, method) {
    switch (method) {
      case 'POST':
        if (url.pathname === '/users') return createUser(req, res);
        break;
      case 'GET':
        if (url.pathname === '/users') return getUsers(req, res);
        else if (url.pathname === '/user') return getUser(req, res);
        break;
      case 'OPTIONS':
        return _json(res);
      default:
    }
    _404(res, 'Recurso no encontrado');
  },
};
