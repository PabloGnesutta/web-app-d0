const BASE_URL = 'http://localhost:3000';

function get(path, query = '') {
  return fetch(BASE_URL + path + query)
    .then((res) => res.json())
    .then((data) => data);
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
    .then((res) => res.json())
    .then((data) => data);
}

export { get, post };
