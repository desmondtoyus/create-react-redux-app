import { combineReducers} from "redux";
import { userReducer } from "./reducers/index";

const rootReducer = combineReducers({
  users: userReducer
});
export default rootReducer;
