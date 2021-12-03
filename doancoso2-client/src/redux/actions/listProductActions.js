import { ActionTypes } from '../contants/action-type';

export const selectListProduct = (products) => {
    return {
        type: ActionTypes.SELECT_LIST_PRODUCT,
        payload: products,
    }
}
