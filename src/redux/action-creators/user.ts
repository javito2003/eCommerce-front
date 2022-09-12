import { IUser, TInitialDataUser } from "../../interfaces/User";
import { Dispatch } from 'redux'
import { Action } from "../actions/user";
import axios from "axios";
import { IResponse } from "../../interfaces/Responses";
import { ActionType } from "../action-types/user";
import * as cartActions from './cart'
import config from '../../config'
import fetchApi from "../../utils/fetchApi";


type TDispatch = Dispatch<Action>

type AuthResponse = {
    token: string
    user: IUser
}

export const logIn = () => async (dispatch: TDispatch) => {
    try {
        
        let res = await axios.get<IResponse<AuthResponse>>(`${config.API.URL}/api/auth/login/success`, { withCredentials: true })
        let user = res.data.body.user
        let toSend: TInitialDataUser = {
            user,
            token: res.data.body.token,
            isLoggedIn: true
        }
        
        dispatch({ type: ActionType.LOGIN, payload: toSend })
        dispatch(getUser(toSend.token) as any)
        dispatch(cartActions.getCart() as any)
    } catch (error) { 
        let toSend: TInitialDataUser = {
            user: null,
            token: "",
            isLoggedIn: false
        }
        dispatch({ type: ActionType.LOGIN, payload: toSend })
    }
}

const getUser = (token: string) => async(dispatch: TDispatch) => {
    try {
        let res = await fetchApi<IUser>({ urlDirec: "USER", url: "/", method: "get", token: token})
        if(!res.error) {
            if(typeof res.body != "string"){
                dispatch({ type: ActionType.SETUSER, payload: res.body })
            }
        }
    } catch (error) {
        console.log(error);
    }
}