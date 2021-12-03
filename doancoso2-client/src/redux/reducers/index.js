import { combineReducers } from 'redux';
import { productReducer, selectedProductReducer, discountReducer, limitedReducer, sellingReducer, bestSellingReducer, selectedRelatedProductReducer, commentReducer, userAccountReducer } from './productReducer';
import addItem from './addItem'
import { categoryReducer, selectedCategoryReducer, selectedRoomTypesReducer, selectedProductByMaterialReducer, selectedProductByThuongHieuReducer } from './categoryReducer';
import { listPoductReducer } from './listProductReducer'
import { listProductRoomReducer } from './listProductRoomReducer'
import cartReducer, { getTotals } from "../../features/cartSlice";
const Reducer = combineReducers({
    addItem,
    allProduct: productReducer,
    product: selectedProductReducer,
    allcategoty: categoryReducer,
    spCategory: selectedCategoryReducer,
    allDiscount: discountReducer,
    allLimited: limitedReducer,
    allSelling: sellingReducer,
    listAllProduct: listPoductReducer,
    allListRooms: listProductRoomReducer,
    allRoomTypes: selectedRoomTypesReducer,
    allProductMaterial: selectedProductByMaterialReducer,
    allProductThuonghieu: selectedProductByThuongHieuReducer,
    bestSelling: bestSellingReducer,
    relatedProduct: selectedRelatedProductReducer,
    comment: commentReducer,
    cart: cartReducer,
    user: userAccountReducer,
});

export default Reducer;