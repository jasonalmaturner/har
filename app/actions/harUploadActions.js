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

export function handleUploadError(uploadError) {
  return {
    type: HANDLE_UPLOAD_ERROR,
    uploadError,
  };
}

export function sendFile() {
  return (dispatch, getState) => {
    const { harsA, harsB } = getState().uploadFiles;
    dispatch(requestFileSend());
    axios.post('/api/files', {
      harsA,
      harsB,
    }).then(res => {
      dispatch(receiveHarData(res.data.a, res.data.b));
      return dispatch(receiveUploadResponse());
    }).catch(err => {
      console.log('upload err', err);
      return dispatch(handleUploadError(err));
    });
  };
}
