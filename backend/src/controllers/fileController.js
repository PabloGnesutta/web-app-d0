const fs = require('fs');
const path = require('path');
const { _json, _400 } = require('../server/responses');
const { COMMON_HEADERS } = require('../server/constants');

const uploadsPath = path.join(__dirname, '../', '../', 'uploads', '/');

const MAX_FILE_SIZE = 200000000;

module.exports = {
  uploadFile(req, res) {
    const reqSize = parseInt(req.headers['content-length']);
    if (reqSize >= MAX_FILE_SIZE) {
      return _400(res, 'Archivo demasiado grande');
    }
    const fileName = req.query.fileName;
    const filePath = path.join(uploadsPath + fileName);

    req.on('data', chunk => fs.appendFileSync(filePath, chunk));
    req.on('end', () => _json(res, { msg: 'archivo subido exitosamente' }));
  },

  downloadFile(req, res) {
    res.writeHead(200, {
      ...COMMON_HEADERS,
      'Content-Type': 'video/mp4',
      'Content-Disposition': 'attachment; fileName=un archivo equis.mp4',
      'Access-Control-Expose-Headers': 'Content-Type,Content-Disposition',
    });
    const filePath = path.join(uploadsPath, 'test.mp4');
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  },
};
