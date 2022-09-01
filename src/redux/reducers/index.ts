import { combineReducers } from "redux";
import { categoryReducer } from "./category";
import { userReducer } from "./user";


const reducers = combineReducers({
    auth: userReducer,
    category: categoryReducer
})

export default reducers