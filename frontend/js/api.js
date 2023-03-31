const BASE_URL = 'http://localhost:3000';

function getAuthHeader() {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return 'Bearer ' + accessToken;
  } else {
    return '';
  }
}

function get(path, query = '') {
  return fetch(BASE_URL + path + query, {
    headers: {
      Authorization: getAuthHeader(),
    },
  })
    .then(res => res.json())
    .then(data => data);
}

function post(path, body) {
  return fetch(BASE_URL + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
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
      Authorization: getAuthHeader(),
    },
    mode: 'cors',
    body: buffer,
  })
    .then(res => res.json())
    .then(data => data);
}

function download() {
  let fileName = '';
  return fetch(BASE_URL + '/downloads', {
    headers: {
      Authorization: getAuthHeader(),
    },
  })
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
