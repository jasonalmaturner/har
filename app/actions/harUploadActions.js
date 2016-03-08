import axios from 'axios';
import { receiveHarData } from './harDisplayActions';
import { defer, all } from 'q';

export const ADD_FILE = 'ADD_FILE';
export const REQUEST_FILE_SEND = 'REQUEST_FILE_SEND';
export const RECEIVE_UPLOAD_RESPONSE = 'RECEIVE_UPLOAD_RESPONSE';
export const HANDLE_UPLOAD_ERROR = 'HANDLE_UPLOAD_ERROR';

export function addFile(files = [], aOrB) {
  return {
    type: ADD_FILE,
    files,
    aOrB,
  };
}

export function requestFileSend() {
  return {
    type: REQUEST_FILE_SEND,
  };
}

export function receiveUploadResponse() {
  return {
    type: RECEIVE_UPLOAD_RESPONSE,
  };
}

export function handleUploadError(uploadError) {
  return {
    type: HANDLE_UPLOAD_ERROR,
    uploadError,
  };
}

export function sendFile() {
  return (dispatch, getState) => {
    dispatch(requestFileSend());
    const { harsA, harsB } = getState().uploadFiles;
    let harsAFiles = readFiles(harsA);
    let harsBFiles = readFiles(harsB);
    all([harsAFiles, harsBFiles]).then(res => {
      console.log(res);
      return axios.post('/api/files', {
        harsA: res[0],
        harsB: res[1],
      });
    }).then(res => {
      dispatch(receiveHarData(res.data.a, res.data.b));
      return dispatch(receiveUploadResponse());
    }).catch(err => {
      console.log('upload err', err);
      return dispatch(handleUploadError(err));
    });
  };
}

function readFiles(files) {
  return all(files.map(file => readFile(file)));
}

function readFile(file) {
  let dfd = defer();
  let reader = new FileReader();
  reader.onload = function (event) {
    console.log(reader.result);
    dfd.resolve(reader.result);
  };

  reader.onerror = function (event) {
    dfd.reject('read error');
  };

  reader.readAsArrayBuffer(file);
  return dfd.promise;
};
