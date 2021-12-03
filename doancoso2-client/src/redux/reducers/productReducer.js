import { ActionTypes } from '../contants/action-type';

const initialState = {
    product: [],
};

const discountState = {
    discount: []
}

const limitedState = {
    limited: []
}
const sellingState = {
    selling: []
}
const bestSellingState = {
    bestselling: []
}

const relatedState = {
    related: []
}
const comemntdState = {
    comment: []
}


export const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return { ...state, product: payload };
        default:
            return state;

    }
};

export const selectedProductReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECTED_PRODUCT:
            return { ...state, ...payload };
        default:
            return state;
    }
}

export const discountReducer = (state = discountState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECT_DISCOUNT:
            return { ...state, discount: payload };
        default:
            return state;
    }
}

export const limitedReducer = (state = limitedState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECT_LIMITED:
            return { ...state, limited: payload };
        default:
            return state;
    }
}

export const sellingReducer = (state = sellingState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECT_SELLING:
            return { ...state, selling: payload };
        default:
            return state;
    }
}

export const bestSellingReducer = (state = bestSellingState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECT_BEST_SELLING:
            return { ...state, bestselling: payload };
        default:
            return state;
    }
}

export const selectedRelatedProductReducer = (state = relatedState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECT_RELATED_PRODUCT:
            return { ...state, related: payload };
        default:
            return state;
    }
}

export const commentReducer = (state = comemntdState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECT_COMMENT:
            return { ...state, comment: payload };
        default:
            return state;
    }
}

export const userAccountReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECT_USER:
            return { ...state, user: payload };
        default:
            return state;
    }
}