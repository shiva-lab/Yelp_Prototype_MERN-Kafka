import { combineReducers } from 'redux';
 import profileReducer from './profileReducer';
import loginReducer from './loginReducer';
import registerreducer from './registerreducer';
import authReducer from './authReducer'
import menuReducer from './menuReducer'
import orderReducer from './orderReducer'
import restaurantMessageReducer from './restaurantMessageReducer'
import userMessageReducer from './userMessageReducer'

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerreducer,
   profile: profileReducer,
   auth:authReducer,
   menu:menuReducer,
   order:orderReducer,
   restaurantMessage:restaurantMessageReducer,
   userMessage:userMessageReducer
   



});
export default rootReducer;
