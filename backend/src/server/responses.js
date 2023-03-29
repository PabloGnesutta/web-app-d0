const { COMMON_HEADERS } = require('./constants');

module.exports = {
  _json(res, data) {
    res.writeHead(200, COMMON_HEADER);
    res.end(JSON.stringify(data));
  },

  _400(res, msg) {
    res.writeHead(400, COMMON_HEADER);
    res.end(JSON.stringify({ msg }));
  },

  _404(res, msg) {
    res.writeHead(404, COMMON_HEADER);
    res.end(JSON.stringify({ msg }));
  },
};
