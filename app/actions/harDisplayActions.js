export const RECEIVE_HAR_DATA = 'RECEIVE_HAR_DATA';

export function receiveHarData(a = {}, b = {}) {
  return {
    type: RECEIVE_HAR_DATA,
    a,
    b,
  };
}
