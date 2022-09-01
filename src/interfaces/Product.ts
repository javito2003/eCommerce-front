export interface IProductInput {
    title: string
    description: string
    price: number
    categoryId: number
    userId: number
}

export interface IProduct extends IProductInput {
    Id: number
}