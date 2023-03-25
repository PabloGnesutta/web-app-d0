const { users } = require('../../data/users');
const { _json, _404 } = require('../server/responses');

module.exports = {
  createUser(req, res) {
    users.idCount++;
    users[users.idCount] = {
      name: req.body.name,
      age: req.body.age,
    };
    _json(res, {
      msg: 'Usuario creado exitosamente',
      data: users[users.idCount],
    });
  },

  getUsers(req, res) {
    const returnValue = { ...users };
    delete returnValue.idCount;
    _json(res, {
      msg: 'Usuarios obtenidos exitosamente',
      data: returnValue,
    });
  },

  getUser(req, res) {
    const id = req.query.id;
    if (!id) {
      res.statusCode = 400;
      return res.end('falta parámetro id');
    }
    const user = users[id];
    if (user) {
      _json(res, {
        msg: 'Usuario obtenido exitosamente',
        data: user,
      });
    } else {
      _404(res, 'Usuario no encontrado');
    }
  },
};
