import { createUser, getUsers, getUser } from './userController.js';
import { upload, download } from './api.js';

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

const downloadBtn = document.getElementById('download');

downloadBtn.addEventListener('click', async function (e) {
  const { blob, fileName } = await download();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
