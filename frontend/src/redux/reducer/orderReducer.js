
import{SET_LOADED_ORDER_STATE} from '../action/type'
//import {paginate, pages} from '../../helperFunctions/paginate'


console.log("hello From menu reducer");
const initialState = {
    order: [],
    filter: "",
    value:""
    
};
export function setLoadedOrderState(order) {
  return {
    type: SET_LOADED_ORDER_STATE,
    order,
 
  };
}
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADED_ORDER_STATE:
      
        return   {
          ... state,
          order:action.order
      };
     

    default:
      return state;
  }
}
