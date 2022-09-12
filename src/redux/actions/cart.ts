import { ICart } from "../../interfaces/Cart";
import { ActionTypeCart } from "../action-types/cart";

interface IGet {
    type: ActionTypeCart.GET,
    payload: ICart
}

interface IAdd {
    type: ActionTypeCart.UPDATE,
    payload: ICart
}

export type ActionCart =
    | IGet
    | IAdd