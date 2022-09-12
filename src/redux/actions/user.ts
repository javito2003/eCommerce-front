import { IUser, TInitialDataUser } from "../../interfaces/User";
import { ActionType } from "../action-types/user";

interface ILogIn {
    type: ActionType.LOGIN,
    payload: TInitialDataUser
}

interface ISetUser {
    type: ActionType.SETUSER,
    payload: IUser
}

export type Action = 
    | ILogIn
    | ISetUser