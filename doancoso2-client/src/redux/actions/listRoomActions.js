import { ActionTypes } from '../contants/action-type';

export const selectListRooms = (Rooms) => {
    return {
        type: ActionTypes.SELECT_PRODUCT_ROOM,
        payload: Rooms,
    }
}