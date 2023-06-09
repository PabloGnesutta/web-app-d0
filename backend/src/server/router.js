const {
  createUser,
  getUsers,
  getUser,
} = require('../controllers/userController');
const { uploadFile, downloadFile } = require('../controllers/fileController');
const { login } = require('../controllers/authController');
const { _404, _json } = require('./responses');

module.exports = {
  router(req, res, url, method) {
    const pathname = url.pathname;
    switch (method) {
      case 'POST':
        if (pathname === '/users') return createUser(req, res);
        else if (pathname === '/uploads') return uploadFile(req, res);
        else if (pathname === '/login') return login(req, res);
        break;
      case 'GET':
        if (pathname === '/users') return getUsers(req, res);
        else if (pathname === '/user') return getUser(req, res);
        else if (pathname === '/downloads') return downloadFile(req, res);
        break;
      case 'OPTIONS':
        return _json(res);
      default:
    }
    _404(res, 'Recurso no encontrado');
  },
};
