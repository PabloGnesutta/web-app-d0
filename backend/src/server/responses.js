const COMMON_HEADER = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
};

module.exports = {
  _json(res, data) {
    res.writeHead(200, COMMON_HEADER);
    res.end(JSON.stringify(data));
  },

  _404(res, msg) {
    res.writeHead(404, COMMON_HEADER);
    res.end(JSON.stringify({ msg }));
  },
};
