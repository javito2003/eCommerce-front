import axios, { AxiosError, AxiosRequestHeaders } from "axios"
import { IResponse } from "../interfaces/Responses"

enum Urls {
    AUTH = "AUTH",
    PRODUCT = "PRODUCT",
    CATEGORY = "CATEGORY"
}

type TUrls = "AUTH" | "PRODUCT" | "CATEGORY"

function setUrl(urlType: string): string {
    switch (urlType) {
        case Urls.AUTH:
            return "http://localhost:3001/api/auth"
        case Urls.CATEGORY:
            return "http://localhost:3001/api/categories"
        case Urls.PRODUCT:
            return "http://localhost:3003/api/products"
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
        if(error instanceof AxiosError) {
            return error.response?.data.body as IResponse<string>
        } else {
            let toReturn: IResponse<string> = {
                body: "Error to create product",
                error: true,
                status: 500
            }
            return toReturn
        }
    }
}