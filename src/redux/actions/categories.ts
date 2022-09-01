import ICategory from "../../interfaces/Categories";
import { ActionTypeCategories } from "../action-types/categories";

interface IGet {
    type: ActionTypeCategories.GET,
    payload: ICategory[]
}

export type ActionCategory =
    | IGet