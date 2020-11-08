import{ORDER_PLACED} from '../action/type'

console.log("hello From Order reducer");
const initialState = {
    items: [],
    data: [],
    deliverymode:""    
};

export default function orderReducer(state = [], action) {
  switch (action.type) {
      case ORDER_PLACED:
          {
              const order = action.payload;
              return {
                  ...state,
                  order
              };
          }
      default:
          return state;
  }
}