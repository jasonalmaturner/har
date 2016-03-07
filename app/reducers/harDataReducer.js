import {
  RECEIVE_HAR_DATA,
} from '../actions/harDisplayActions';

export function displayData(state = {
  aData: {},
  bData: {},
}, action) {
  switch (action.type) {
    case RECEIVE_HAR_DATA:
      return {
        ...state,
        ...{
          aData: action.a,
          bData: action.b,
        },
      };
    default:
      return state;
  }
}
