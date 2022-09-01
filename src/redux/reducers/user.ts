import { TInitialDataUser } from "../../interfaces/User"
import { ActionType } from "../action-types/user"
import { Action } from "../actions/user"

interface IState extends TInitialDataUser {
    fetched: boolean
}

const initalState:IState = {
    user: null,
    token: "",
    isLoggedIn: false,
    fetched: false
}

export const userReducer = (state = initalState, action: Action) => {
    switch(action.type) {
        case ActionType.LOGIN:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isLoggedIn: action.payload.isLoggedIn,
                fetched: true
            }
        default:
            return state
    }
}