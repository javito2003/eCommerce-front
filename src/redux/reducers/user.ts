import { TInitialDataUser } from "../../interfaces/User"
import { ActionType } from "../action-types/user"
import { Action } from "../actions/user"

const initalState:TInitialDataUser = {
    user: null,
    token: "",
    isLoggedIn: false
}

export const userReducer = (state = initalState, action: Action) => {
    switch(action.type) {
        case ActionType.LOGIN:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isLoggedIn: action.payload.isLoggedIn
            }
        default:
            return state
    }
}