import { createStore } from "redux";

const initial = {
  user: "loading",
  productsdetailed:'',
  search : "",
  cardUserId:""
};

const Reducer = (state = initial, action) => {
  switch (action.type) {
    case "user":
      return { ...state, user: action.payload };

    case "logout":
      return { ...state, user: action.payload };

    case "username":
      return { ...state, user: { ...state?.user, userName: action.payload } };

    case "productsdetailed":
        return {...state,productsdetailed:action.payload}

    case "search":
      return { ...state,search:action.payload}

    case "classUserId":
      console.log("hello", action.payload)
      return{...state,cardUserId:action.payload}
    default:    
      return state;
  }
};

let store = createStore(Reducer);
export default store;
