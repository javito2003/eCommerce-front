import { TInitialDataUser } from "../../interfaces/User";
import { ActionType } from "../action-types/user";

interface ILogIn {
    type: ActionType.LOGIN,
    payload: TInitialDataUser
}

export type Action = 
    | ILogIn