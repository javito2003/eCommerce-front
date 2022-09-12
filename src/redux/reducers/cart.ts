import { ICart } from "../../interfaces/Cart";
import { ActionTypeCart } from "../action-types/cart";
import { ActionCart } from "../actions/cart";

type TInitialData = {
    cart: ICart | null,
    cartItems: number
}

const initialState:TInitialData = {
    cart: null,
    cartItems: 0,
}

export const cartReducer = (state = initialState, action: ActionCart) => {
    switch(action.type) {
        case ActionTypeCart.GET:
            let cartItems = action.payload.items.reduce((a, b) => a + b.quantity, 0)
            return {
                ...state,
                cart: action.payload,
                cartItems
            }
        case ActionTypeCart.UPDATE:
            return {
                ...state,
                cart: action.payload
            }
        default: {
            return state
        }
    }
}