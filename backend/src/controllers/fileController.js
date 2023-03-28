const fs = require('fs');
const path = require('path');

const uploadsPath = path.join(__dirname, '../', '../', 'uploads', '/');

module.exports = {
  uploadFile(req, res) {
    const fileName = req.query.fileName;
    const filePath = path.join(uploadsPath + fileName);
    req.on('data', chunk => fs.appendFileSync(filePath, chunk));
    req.on('end', () => _json(res, { msg: 'archivo subido exitosamente' }));
  },
};
