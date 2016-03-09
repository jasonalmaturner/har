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

    // let data = new FormData();
    // console.log(1111, data);
    // appendFiles(data, harsA, 'aFiles');
    // appendFiles(data, harsB, 'bFiles');
    // for (var pair of data) {
    //   console.log(pair[0], pair[1], pair)
    // }
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // axios.post('/api/files', {
    //   harsA,
    //   harsB,
    // }, options).then(res => {
    //   dispatch(receiveHarData(res.data.a, res.data.b));
    //   return dispatch(receiveUploadResponse());
    // }).catch(err => {
    //   console.log('upload err', err);
    //   return dispatch(handleUploadError(err));
    // });

    let harsAFiles = readFiles(harsA);
    let harsBFiles = readFiles(harsB);
    all([harsAFiles, harsBFiles]).then(res => (
      axios.post('/api/files', {
        harsA: res[0],
        harsB: res[1],
      }, options)
    )).then(res => {
      dispatch(receiveHarData(res.data.aData, res.data.bData));
      return dispatch(receiveUploadResponse());
    }).catch(err => {
      console.log('upload err', err);
      return dispatch(handleUploadError(err));
    });
  };
}

function appendFiles(data, files, aOrB) {
  let num = 1;
  files.forEach(file => {
    data.append(`${aOrB}${num}`, file);
    num++;
  });
}

function readFiles(files) {
  return all(files.map(file => readFile(file)));
}

function readFile(file) {
  let dfd = defer();
  let reader = new FileReader();
  reader.onload = function (event) {
    dfd.resolve(reader.result);
  };

  reader.onerror = function (event) {
    dfd.reject('read error');
  };

  reader.readAsText(file);
  return dfd.promise;
};
