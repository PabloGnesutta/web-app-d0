const { users } = require('../../data/users');
const { _json, _400 } = require('../server/responses');

module.exports = {
  login(req, res) {
    console.log(req.body);
    const { name, password } = req.body;

    const user = users.list.find(
      user => user.name === name && user.password === password
    );

    if (user) {
      const accessToken = '###' + user.id + '###';
      _json(res, {
        msg: 'Usuario encontrado',
        accessToken,
        data: user,
      });
    } else {
      _400(res, 'Usuario o contraseña incorrectos');
    }
  },
};
