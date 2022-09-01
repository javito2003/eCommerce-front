import axios from "axios"
import { Dispatch } from "react"
import config from "../../config"
import ICategory from "../../interfaces/Categories"
import { IResponse } from "../../interfaces/Responses"
import { ActionTypeCategories } from "../action-types/categories"
import { ActionCategory } from "../actions/categories"

type TDispatch = Dispatch<ActionCategory>
export const getCategories = () => async(dispatch: TDispatch) => {
    try {
        let { data } = await axios.get<IResponse<ICategory[]>>(`${config.API.URL}/api/categories`)
        dispatch({ type: ActionTypeCategories.GET, payload: data.body })
    } catch (error) {
        console.log(error);
    }
}