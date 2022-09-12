import { ICart, ICartItem } from "../../interfaces/Cart";
import { ActionTypeCart } from "../action-types/cart";
import { ActionCart } from "../actions/cart";

type TInitialData = {
    cart: ICart | null,
    cartItems: number,
    cartTotal: number
}

const initialState:TInitialData = {
    cart: null,
    cartItems: 0,
    cartTotal: 0
}

export const cartReducer = (state = initialState, action: ActionCart) => {
    switch(action.type) {
        case ActionTypeCart.GET:
            return {
                ...state,
                cart: action.payload,
                cartItems: action.payload.items.reduce((a, b) => a + b.quantity, 0),
                cartTotal: getTotalCart(action.payload.items)
            }
        case ActionTypeCart.UPDATE:
            return {
                ...state,
                cart: action.payload,
                cartItems: action.payload.items.reduce((a, b) => a + b.quantity, 0),
                cartTotal: getTotalCart(action.payload.items)
            }
        default: {
            return state
        }
    }
}

function getTotalCart(items: ICartItem[]) {
    return items.map(i => i.quantity * i.price).reduce((a, b) => a + b, 0)
}