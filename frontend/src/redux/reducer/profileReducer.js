import { GET_PROFILE, UPDATE_PROFILE, UPDATE_USER_PROFILE} from '../action/type';

const initialState = {
  bio: "",
  headline:"",
  fname: "",
  lname: "",
  dob:"",
  city: "",
  ustate:"",
  country:"",
  nick_name:"",
  emailid:"",
  mobile: "",
  address: "",
  favorites: "",
  myblog:"",
  things_ilove:"",
  find_me_in:"",

  file: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        user: action.payload
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: action.payload
      };
      case UPDATE_USER_PROFILE:
        return {...state, user: Object.assign({}, action.payload)};
        
    default:
      return state;
  }
}
