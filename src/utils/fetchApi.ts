import axios, { AxiosError, AxiosRequestHeaders } from "axios"
import { IResponse } from "../interfaces/Responses"
import config from '../config'

enum Urls {
    AUTH = "AUTH",
    PRODUCT = "PRODUCT",
    CATEGORY = "CATEGORY"
}

type TUrls = "AUTH" | "PRODUCT" | "CATEGORY"

function setUrl(urlType: string): string {
    switch (urlType) {
        case Urls.AUTH:
            return `${config.API.URL}/api/auth`
        case Urls.CATEGORY:
            return `${config.API.URL}/api/categories`
        case Urls.PRODUCT:
            return `${config.products.URL}/api/products`
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
}

export default async function <T>({ urlDirec, url, method, body, token }: IProp) {
    try {
        let headers: AxiosRequestHeaders = {}
        if (token) {
            headers.authorization = `Bearer ${token}`
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