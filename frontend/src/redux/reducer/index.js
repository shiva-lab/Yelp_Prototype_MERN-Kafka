import { combineReducers } from 'redux';
 import profileReducer from './profileReducer';
import loginReducer from './loginReducer';
import registerreducer from './registerreducer';

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerreducer,
   profile: profileReducer,


});
export default rootReducer;
