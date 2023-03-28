import { createUser, getUsers, getUser } from './userController.js';
import { upload } from './api.js';
console.log('main');

const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('input', uploadFile);

function uploadFile(e) {
  const file = e.target.files[0];
  const fileReader = new FileReader();

  fileReader.readAsArrayBuffer(file);
  fileReader.onload = async function (event) {
    const buffer = event.target.result;
    const fileName = Date.now() + '__' + file.name;

    const response = await upload(buffer, fileName);
    console.log('response', response);
  };
}
