import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import { categoryReducer } from "./category";
import { userReducer } from "./user";


const reducers = combineReducers({
    auth: userReducer,
    category: categoryReducer,
    cart: cartReducer
})

export default reducers