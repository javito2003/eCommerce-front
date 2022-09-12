import React from 'react'
import { ICartItem } from '../interfaces/Cart'
import { useAppDispatch } from '../redux'
import * as cartActions from '../redux/action-creators/cart'

const CartItem = ({ cart_item }: { cart_item: ICartItem }) => {
    const dispatch = useAppDispatch()

    const updateCart = async(Id:number, type: number) => {
        dispatch(cartActions.addCart(Id, type) as any)
    }

    return (
        <div>
            <h5>{cart_item.title ? cart_item.title : "NO TITLE"}</h5>
            <p>{cart_item.description}</p>
            <div className='d-flex align-items-center'>
                <p>Quantity:</p>
                <div className="input-group mb-3 mx-2">
                    <button className="btn btn-outline-secondary btn-sm" type="button" id="button-addon1" onClick={() => updateCart(cart_item.productId, -1)}>-</button>
                    <input type="text" contentEditable={false} className="form-control text-center" defaultValue={cart_item.quantity} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                    <button className="btn btn-outline-secondary btn-sm" type="button" id="button-addon1" onClick={() => updateCart(cart_item.productId, 1)}>+</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem