import { Dispatch } from "redux";
import fetchApi from "../../utils/fetchApi";
import { ActionTypeCart } from "../action-types/cart";
import { ActionCart } from "../actions/cart";
import { State } from "../store";
import callToast from '../../utils/toast'
import { ICart } from "../../interfaces/Cart";

type TDispatch = Dispatch<ActionCart>
export const getCart = () => async(dispatch: TDispatch, getState: () => State) => {
    try {
        let token = getState().auth.token
        
        let res = await fetchApi<ICart>({ urlDirec: "CART", url: "/", method: "get", token: token })
        if(res.error) {
            callToast("Error to get cart", "error")
        } else {
            if(typeof res.body !== "string") {
                dispatch({ type: ActionTypeCart.GET, payload: res.body})
            }

        }

    } catch (error) {
    }
}

export const addCart = (productId: number, num: number) => async(dispatch: TDispatch, getState: () => State) => {
    try {
        let token = getState().auth.token
        
        let res = await fetchApi<ICart>({ urlDirec: "CART", url: "/add", body: {productId, num}, method: "post", token: token })
        if(res.error) {
            callToast("Error to add to cart", "error")
        } else {
            callToast("Product added to cart", "success")
            dispatch({ type: ActionTypeCart.UPDATE, payload: res.body as ICart })
        }
    } catch (error) {
        console.log(error);
    }
}