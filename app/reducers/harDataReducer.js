import {
  RECEIVE_HAR_DATA,
} from '../actions/harDisplayActions';

export function displayData(state = {
  aData: {},
  bData: {},
  loaded: false,
}, action) {
  switch (action.type) {
    case RECEIVE_HAR_DATA:
      return {
        ...state,
        ...{
          aData: action.a,
          bData: action.b,
          loaded: true,
        },
      };
    default:
      return state;
  }
}
