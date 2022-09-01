import { IUser, TInitialDataUser } from "../../interfaces/User";
import { Dispatch } from 'redux'
import { Action } from "../actions/user";
import axios from "axios";
import { IResponse } from "../../interfaces/Responses";
import { ActionType } from "../action-types/user";


type TDispatch = Dispatch<Action>

type AuthResponse = {
    token: string
    user: IUser
}

export const logIn = () => async (dispatch: TDispatch) => {
    console.log("Exec");
    try {
        
        let res = await axios.get<IResponse<AuthResponse>>("http://localhost:3001/api/auth/login/success", { withCredentials: true })
        let user = res.data.body.user
        let toSend: TInitialDataUser = {
            user,
            token: res.data.body.token,
            isLoggedIn: true
        }
        
        dispatch({ type: ActionType.LOGIN, payload: toSend })
    } catch (error) { 
        let toSend: TInitialDataUser = {
            user: null,
            token: "",
            isLoggedIn: false
        }
        dispatch({ type: ActionType.LOGIN, payload: toSend })
    }
}