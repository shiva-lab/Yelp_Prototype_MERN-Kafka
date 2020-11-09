import{SET_LOADED_ORDER_STATE} from '../action/type'
import isEmpty from '../../validation/is-empty';


const initialState = {
  isOrderPlaced: false,
  deliverymode: null,
  updatestatus: null,
  isOrderStatusChanged: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADED_ORDER_STATE:
      console.log(action.payload,state)
      return Object.assign({}, state, {
        
        isOrderPlaced: !isEmpty(action.payload),
        deliverymode: action.payload.deliverymode
      });
      case SET_ORDER_STATUS:
      console.log(action.payload, state)
      return Object.assign({}, state, {
        isOrderStatusChanged: !isEmpty(action.payload),
        updatestatus: action.payload.orderstatus
      });
    default:
      return state;
  }
}


// console.log("hello From menu reducer");
// const initialState = {
//     order: [],
//     filter: "",
//     value:""
    
// };
// export function setLoadedOrderState(order) {
//   return {
//     type: SET_LOADED_ORDER_STATE,
//     order,
 
//   };
// }
// export default function (state = initialState, action) {
//   switch (action.type) {
//     case SET_LOADED_ORDER_STATE:
      
//         return   {
//           ... state,
//           order:action.order
//       };
     

//     default:
//       return state;
//   }
// }
