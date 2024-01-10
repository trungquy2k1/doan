import { combineReducers } from "redux";
import Reducer from "./categorySlice";

const rootReducer = combineReducers({ supply: Reducer })
export default rootReducer