import { combineReducers } from "redux";
import reducer from "./reducer";

const rootReducer = combineReducers({
  todos: reducer,
});

export default rootReducer;
