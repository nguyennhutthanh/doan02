import { ActionTypes } from '../contants/action-type';

export const setProducts = (product) => {
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload: product,
    }
}

export const selectedProduct = (product) => {
    return {
        type: ActionTypes.SELECTED_PRODUCT,
        payload: product,
    }
}

export const setProductDiscount = (discount) => {
    return {
        type: ActionTypes.SELECT_DISCOUNT,
        payload: discount,
    }
}

export const setProductLimited = (limit) => {
    return {
        type: ActionTypes.SELECT_LIMITED,
        payload: limit,
    }
}

export const setProductSelling = (selling) => {
    return {
        type: ActionTypes.SELECT_SELLING,
        payload: selling,
    }
}


export const setProductBestSelling = (bestselling) => {
    return {
        type: ActionTypes.SELECT_BEST_SELLING,
        payload: bestselling,
    }
}

export const setRelatedProduct = (ralated) => {
    return {
        type: ActionTypes.SELECT_RELATED_PRODUCT,
        payload: ralated,
    }
}

export const setComment = (comemmnt) => {
    return {
        type: ActionTypes.SELECT_COMMENT,
        payload: comemmnt,
    }
}

export const setUserAccount = (user) => {
    return {
        type: ActionTypes.SELECT_USER,
        payload: user,
    }
}
