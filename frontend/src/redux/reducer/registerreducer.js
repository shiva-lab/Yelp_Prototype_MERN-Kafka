import { USER_REGISTER, RESTAURANT_REGISTER } from "../action/type";


console.log("hello From reducer");
const initialState = {
  user: {}


};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_REGISTER:
      return {
        ...state,
        user: action.payload
      };
    case RESTAURANT_REGISTER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}
