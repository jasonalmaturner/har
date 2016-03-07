import axios from 'axios';
import { receiveHarData } from './harDisplayActions';

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

export function handleUploadError(err) {
  return {
    type: HANDLE_UPLOAD_ERROR,
    err,
  };
}

export function requestFileSend(filesA, filesB) {
  return (dispatch, getState) => {
    axios.post('/api/files', {
      filesA,
      filesB,
    }).then(res => {
      dispatch(receiveHarData(res.data.a, res.data.b));
      dispatch(receiveUploadResponse());
    }).catch(err => {
      dispatch(handleUploadError(err));
    });
  };
}
