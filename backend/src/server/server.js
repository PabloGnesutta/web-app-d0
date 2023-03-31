const http = require('http');
const { URL } = require('url');
const { router } = require('./router');

const PORT = process.env.PORT;
const BASE_DOMAIN = process.env.BASE_DOMAIN;

module.exports = {
  startServer() {
    const server = http.createServer((req, res) => {
      console.log(req.url, req.method);
      const { headers, method } = req;
      const contentType = headers['content-type'];
      const url = new URL(req.url, BASE_DOMAIN);

      const authHeader = req.headers['authorization'];
      console.log('authheader', authHeader);
      if (authHeader) {
        const splitHeader = authHeader.split('Bearer ');
        if (splitHeader.length === 2) {
          const accessToken = splitHeader[1];
          req.userId = accessToken.substring(3, accessToken.length - 3);
        }
      }

      req.query = {};
      for (const [key, value] of url.searchParams.entries()) {
        req.query[key] = value;
      }

      if (contentType === 'application/json') {
        let data = '';
        req.on('data', chunk => (data += chunk));
        req.on('end', () => {
          try {
            req.body = JSON.parse(data);
          } catch (error) {
            console.log('JSON incorrecto');
            return res.end('JSON incorrecto');
          }

          router(req, res, url, method);
        });
      } else {
        router(req, res, url, method);
      }
    });

    server.listen(PORT, () => {
      console.log('servidor escuchando en puerto', PORT);
    });
  },
};
