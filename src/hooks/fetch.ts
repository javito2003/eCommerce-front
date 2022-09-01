import axios, { AxiosRequestHeaders } from "axios"
import { useState } from "react"
import { IResponse } from "../interfaces/Responses"


enum Methods {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

enum Urls {
    AUTH = "AUTH",
    PRODUCT = "PRODUCT"
}

function setUrl(urlType: Urls): string {
    switch(urlType) {
        case Urls.AUTH:
            return "http://localhost:3001/api/auth"
        default:
            return ""
    }
}



const useFetch = <T extends any>(urlDirec: Urls, url: string, method: Methods, body?: any, token?: string) => {
    const [ data, setData ] = useState<IResponse<T>>()
    let headers: AxiosRequestHeaders = {}
    if(token) {
        headers.authorization = `Bearer ${token}`
    }
    axios({
        url: `${setUrl(urlDirec) + url}`,
        method: method,
        data: body,
        headers: headers
    })
    .then((res) => {
        setData(res.data)
    })
    .catch(err => {
        setData(err.data)
    })
    .finally(() => {
        return [data]
    })
}

export default useFetch