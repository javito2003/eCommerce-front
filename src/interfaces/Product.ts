export interface IProductInput {
    title: string
    description: string
    price: number
    categoryId: number
    userId: number,
    imageUrl?: string
}

export interface IProduct extends IProductInput {
    Id: number
}