const { COMMON_HEADERS } = require('./constants');

module.exports = {
  _json(res, data) {
    res.writeHead(200, COMMON_HEADERS);
    res.end(JSON.stringify(data));
  },

  _400(res, msg) {
    res.writeHead(400, COMMON_HEADERS);
    res.end(JSON.stringify({ msg }));
  },

  _401(res, msg) {
    res.writeHead(401, COMMON_HEADERS);
    res.end(JSON.stringify({ msg }));
  },

  _404(res, msg) {
    res.writeHead(404, COMMON_HEADERS);
    res.end(JSON.stringify({ msg }));
  },
};
