import { ActionTypes } from '../contants/action-type';

const initialState = {
    Rooms: []
};

export const listProductRoomReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECT_PRODUCT_ROOM:
            return { ...state, Rooms: payload };
        default:
            return state;

    }
};