export interface IResponse<T> {
    error: boolean
    status: number
    body: T 
}