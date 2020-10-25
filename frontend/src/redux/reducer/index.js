import { combineReducers } from 'redux';
 import profileReducer from './profileReducer';
import loginReducer from './loginReducer';
import registerreducer from './registerreducer';
import authReducer from './authReducer'

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerreducer,
   profile: profileReducer,
   auth:authReducer,


});
export default rootReducer;
