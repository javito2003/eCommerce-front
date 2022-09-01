import ICategory from "../../interfaces/Categories"
import { ActionTypeCategories } from "../action-types/categories"
import { ActionCategory } from "../actions/categories"


type TInitialState = {
    categories: ICategory[]
}
const initialState:TInitialState = {
    categories: []
}

export const categoryReducer = (state = initialState, action: ActionCategory ) => {
    switch(action.type) {
        case ActionTypeCategories.GET:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state
    }
}