import { IProduct } from "./Product";

export interface ICartItem extends IProduct {
    quantity: number,
    cartId: number,
    productId: number,
    updatedDate: Date,
}

export interface ICart {
    Id: number,
    userId: number,
    items: ICartItem[]
}