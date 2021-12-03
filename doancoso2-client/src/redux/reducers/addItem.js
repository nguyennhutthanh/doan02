const addItem = []

const addItems = (state = addItem, action) => {
    switch (action.type) {
        case "ADDCART": return [
            ...state,
            action.payload,
        ]
            break;
        case "DELCART": return state = state.filter((x) => {
            return x.id !== action.payload.id
        })
            break;
        default: return state
            break;
    }
}

export default addItems;

// const product = action.payload;
// switch (action.type) {
//     case "ADDCART":
//         const exits = state.find((x) => x.id === product.id);
//         if (exits) {
//             return state.map((x) =>
//                 x.id === product.id ? { ...x, qty: x.qty + 1 } : x);
//         } else {
//             const product = action.payload;
//             return [
//                 ...state,
//                 { ...product, qty: 1 },
//             ]
//         }

//         break;
//     case "DELCART":
//         const exits1 = state.find((x) => x.id === product.id);
//         if (exits1.qty === 1) {
//             return state.filter((x) => x.id !== exits1.id);
//         } else {
//             return state.map((x) =>
//                 x.id === product.id
//                     ? { ...x, qty: x.qty - 1 } : x
//             );
//         }
//         break;
//     default:
//         return state
//         break;