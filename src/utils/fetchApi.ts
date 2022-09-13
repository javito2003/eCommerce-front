import axios, { AxiosError, AxiosRequestHeaders } from "axios"
import { IResponse } from "../interfaces/Responses"
import config from '../config'

enum Urls {
    AUTH = "AUTH",
    PRODUCT = "PRODUCT",
    CATEGORY = "CATEGORY",
    CART = "CART",
    USER = "USER"
}

type TUrls = "AUTH" | "PRODUCT" | "CATEGORY" | "CART" | "USER"
 
function setUrl(urlType: string): string {
    switch (urlType) {
        case Urls.AUTH:
            return `${config.API.URL}/api/auth`
        case Urls.CATEGORY:
            return `${config.API.URL}/api/categories`
        case Urls.PRODUCT:
            return `${config.products.URL}/api/products`
        case Urls.CART:
            return `${config.products.URL}/api/cart`
        case Urls.USER:
            return `${config.API.URL}/api/user`
        default:
            return ""
    }
}

interface IProp {
    urlDirec: TUrls
    method: string,
    url?: string
    body?: any,
    token?: string
    formData?: boolean
}

export default async function <T>({ urlDirec, url, method, body, token, formData = false }: IProp) {
    try {
        let headers: AxiosRequestHeaders = {}
        
        if (token) {
            headers.authorization = `Bearer ${token}`
        }
        if(formData) {
            headers["Content-Type"] = "multipart/form-data"
        }
        
        
        let { data } = await axios.request<IResponse<T>>({
            url: `${setUrl(urlDirec) + url}`,
            method: method,
            data: body,
            headers: headers
        })
        
        return data
    } catch (error) {
        let toReturn: IResponse<string> = {
            error: true,
            status: 500,
            body: ""
        }
        if(error instanceof AxiosError) {     
            toReturn.body = error.response?.data.body
            return toReturn
        } else {
            toReturn.body = "Error to get products"
            return toReturn
        }
    }
}