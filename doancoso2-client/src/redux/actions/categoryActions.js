import { ActionTypes } from '../contants/action-type';

export const setCategorys = (category) => {
    return {
        type: ActionTypes.SELECT_CATEGORY,
        payload: category,
    }
}

export const selectedCategorys = (category) => {
    return {
        type: ActionTypes.SELECT_OF_CATEGORY,
        payload: category,
    }
}

export const selectedRoomTypes = (roomsType) => {
    return {
        type: ActionTypes.SELECT_ROOM_TYPES,
        payload: roomsType,
    }
}

export const selectedProductByMaterial = (material) => {
    return {
        type: ActionTypes.SELECT_PRODUCT_BY_MATERIAL,
        payload: material,
    }
}

export const selectedProductByThuongHieu = (thuonghieu) => {
    return {
        type: ActionTypes.SELECT_PRODUCT_BY_THUONGHIEU,
        payload: thuonghieu,
    }
}