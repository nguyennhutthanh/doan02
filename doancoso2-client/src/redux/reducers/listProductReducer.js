import { ActionTypes } from '../contants/action-type';

const initialState = {
    products: []
};

export const listPoductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECT_LIST_PRODUCT:
            return { ...state, products: payload };
        default:
            return state;
    }
}