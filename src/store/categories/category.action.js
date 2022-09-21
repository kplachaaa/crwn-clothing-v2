import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_INITIAL_STATE } from "./category.reducer";


export const setCategoriesMap = (categoriesMap) => createAction(CATEGORIES_INITIAL_STATE.SET_CATEGORIES_MAP, categoriesMap);