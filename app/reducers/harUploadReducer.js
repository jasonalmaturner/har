import {
  ADD_FILE, REQUEST_FILE_SEND, RECEIVE_UPLOAD_RESPONSE, HANDLE_UPLOAD_ERROR,
} from '../actions/harUploadActions';

export function uploadFiles(state = {
  isUploading: false,
  uploadError: null,
  harsA: [],
  harsB: [],
}, action) {
  switch (action.type) {
    case ADD_FILE:
      return {
        ...state,
        ...{
          [action.aOrB]: action.files,
        },
      };
    case REQUEST_FILE_SEND:
      return {
        ...state,
        ...{
          isUploading: true,
        },
      };
    case RECEIVE_UPLOAD_RESPONSE:
      return {
        ...state,
        ...{
          isUploading: false,
          harsA: [],
          harsB: [],
        },
      };
    case HANDLE_UPLOAD_ERROR:
      return {
        ...state,
        ...{
          isUploading: false,
          uploadError: action.uploadError,
        },
      };
    default:
      return state;
  }
}
