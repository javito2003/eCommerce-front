export interface IUser {
    Id: number
    name: string
    subject: string
    origin: string
    createdAt: Date
}

export type TInitialDataUser = {
    user: IUser | null
    token: string
    isLoggedIn?: boolean
}