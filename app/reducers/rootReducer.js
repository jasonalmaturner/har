import { combineReducers } from 'redux';
import { uploadFiles } from './harUploadReducer';
import { displayData } from './harDataReducer';

const rootReducer = combineReducers({
  uploadFiles,
  displayData,
});

export default rootReducer;
