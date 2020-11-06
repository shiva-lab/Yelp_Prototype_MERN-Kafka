import { combineReducers } from 'redux';
 import profileReducer from './profileReducer';
import loginReducer from './loginReducer';
import registerreducer from './registerreducer';
import authReducer from './authReducer'
import menuReducer from './menuReducer'
import orderReducer from './orderReducer'

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerreducer,
   profile: profileReducer,
   auth:authReducer,
   menu:menuReducer,
   order:orderReducer



});
export default rootReducer;
