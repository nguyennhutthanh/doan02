import { ActionTypes } from '../contants/action-type';

const initialState = {
    caterogy: []
};
const map = {
    spcaterogy: []
}
const initialRooms = {
    roomsType: []
}
const initialMaterial = {
    material: []
}

const initialThuonghieu = {
    thuonghieu: []
}

export const categoryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECT_CATEGORY:
            return { ...state, caterogy: payload };
        default:
            return state;

    }
};

export const selectedCategoryReducer = (state = map, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECT_OF_CATEGORY:
            return { ...state, spcaterogy: payload };
        default:
            return state;
    }
}

export const selectedRoomTypesReducer = (state = initialRooms, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECT_ROOM_TYPES:
            return { ...state, roomsType: payload };
        default:
            return state;
    }
}

export const selectedProductByMaterialReducer = (state = initialMaterial, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECT_PRODUCT_BY_MATERIAL:
            return { ...state, material: payload };
        default:
            return state;
    }
}

export const selectedProductByThuongHieuReducer = (state = initialThuonghieu, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECT_PRODUCT_BY_THUONGHIEU:
            return { ...state, thuonghieu: payload };
        default:
            return state;
    }
}