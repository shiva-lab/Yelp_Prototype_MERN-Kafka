import { SET_MESSAGE,SEND_MESSAGE} from '../action/type'

  const initialState = {
     messages : [],
     selectedMessage: {
        chats:[],
        user1:{
          id:null,
          name:null
        },
        user2:{
          id:null,
          name:null
        }
      }
  };
  
  function userMessageReducer(state = initialState, action) {
      if(action.type === SET_MESSAGE){
        return Object.assign({}, state, {
            messages: action.payload,
            selectedMessage: action.payload[0]
        });
      }
      return state;
  }
  
export default userMessageReducer;