const BASE_URL = 'http://localhost:3000';

function get(path, query = '') {
  return fetch(BASE_URL + path + query)
    .then(res => res.json())
    .then(data => data);
}

function post(path, body) {
  return fetch(BASE_URL + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(data => data);
}

function upload(buffer, fileName) {
  return fetch(BASE_URL + '/uploads?fileName=' + fileName, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    mode: 'cors',
    body: buffer,
  })
    .then(res => res.json())
    .then(data => data);
}

function download() {
  let fileName = '';
  return fetch(BASE_URL + '/downloads')
    .then(res => {
      const contentDisposition = res.headers
        .get('content-disposition')
        .split(';');
      fileName = contentDisposition[1].split('=')[1];
      return res.blob();
    })
    .then(data => {
      return {
        data,
        fileName,
      };
    });
}

export { get, post, upload, download };
