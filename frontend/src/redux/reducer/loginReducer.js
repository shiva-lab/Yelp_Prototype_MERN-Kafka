import {
  USER_LOGIN, USER_LOGOUT, RESTAURANT_LOGIN, RESTAURANT_LOGOUT
} from '../action/type';

const initialState = {
  user: {}

};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state,  {
        user: action.payload
      });
    case USER_LOGOUT:
      return Object.assign({}, state,  {
        user: {}
      });
    case RESTAURANT_LOGIN:
      return Object.assign({}, state,  {
        user: action.payload
      });
    case RESTAURANT_LOGOUT:
      return Object.assign({}, state,  {
        user: {}
      });

    default:
      return state;
  }
}
