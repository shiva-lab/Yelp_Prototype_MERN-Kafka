import { GET_PROFILE, UPDATE_PROFILE, UPDATE_USER_PROFILE} from '../action/type';

const initialState = {
  bio: null,
  headline:null,
  fname: null,
  lname: null,
  dob:null,
  city: null,
  ustate:null,
  country:null,
  nick_name:null,
  emailid:null,
  mobile: null,
  address: null,
  favorites: null,
  myblog:null,
  things_ilove:null,
  find_me_in:null,

  file: null,
  restuser:{}
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
        restuser: action.payload
      };
      case UPDATE_USER_PROFILE:
        // return {...state, 
        //   user: Object.assign({}, action.payload)};
        return Object.assign({}, state, {
          bio:action.payload.bio,
          fname: action.payload.fname,
          lname: action.payload.lname,
          dob: action.payload.dob,
          city: action.payload.city,
          ustate: action.payload.ustate,
          country: action.payload.country,
          nick_name: action.payload.nick_name,
          emailid: action.payload.Emailid,
          mobile: action.payload.mobile,
          address: action.payload.address,
          favorites: action.payload.favorites,
          myblog: action.payload.myblog,
          things_ilove: action.payload.things_ilove,
          find_me_in: action.payload.find_me_in,
          file:action.payload.path
      });
    
        
    default:
      return state;
  }
}
