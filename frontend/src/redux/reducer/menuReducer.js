import{ADD_MENU,VIEW_MENU,EDIT_MENU} from '../action/type'
import {paginate, pages} from '../../helperFunctions/paginate'


console.log("hello From menu reducer");
const initialState = {
  menuitem: [],
  filteredMenu:[]

};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_MENU:
      return {
        ...state,
        menuitem:  [].concat(action.payload)
      };
      case EDIT_MENU:
        return {
          ...state,
          menuitem:  [].concat(action.payload),

          
        };
    case VIEW_MENU:
      return {
        ...state,
        menuitem:  [].concat(action.payload),
        filteredMenu : paginate(action.payload.data,1,10),
            pages: pages(action.payload.data, 10)
        
      };

    default:
      return state;
  }
}
