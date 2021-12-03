import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { formatNumber } from '../../Common/index';
import {
    addToCart, clearCart, decreaseCart, getTotals, removeFromCart,
} from "../../features/cartSlice";

const Cart = () => {
    const state = useSelector((state) => state.cart.cartItems);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };
    const { cartTotalAmount, cartTotalQuantity } = cart;

    const renderCart = state.map((cartItem) => {
        const {
            id, tenSP, giaSP, urlAnhSanPham, giaKhuyenMai, khuyenMaiNavigation, cartQuantity,
        } = cartItem;
        return (
            <tr>
                <td className="product-image">
                    <Link to={`/DetailProduct/${id}`}>
                        <img src={urlAnhSanPham} alt="Product" />
                    </Link>
                </td>
                <td>
                    <div className="product-name">
                        <Link to={`/DetailProduct/${id}`}>{tenSP}</Link>
                    </div>
                    <div>
                        {cartQuantity} x <span className="product-price">
                            {
                                khuyenMaiNavigation.sale > 0 ?
                                    formatNumber(giaKhuyenMai)
                                    : formatNumber(giaSP)
                            } VNĐ
                        </span>
                    </div>
                </td>
                <td className="action">
                    <button className="remove-from-cart"
                        style={{ background: 'none', color: 'red', border: 'none', cursor: 'pointer' }}
                        onClick={() => handleRemoveFromCart(cartItem)}
                    >
                        <i
                            style={{ fontSize: '20px' }}
                            className="fa fa-trash-o" aria-hidden="true" />
                    </button>
                </td>
            </tr>
        );
    });

    const emtyCart = () => {
        return (
            <div className="container">
                <h5 className="text-center">
                    ! Giỏ hàng rỗng, bạn chưa thêm sản phẩm nào
                </h5>
            </div>
        );
    }

    return (
        <div className="desktop_cart">
            <div className="blockcart block-cart cart-preview tiva-toggle">
                <div className="header-cart tiva-toggle-btn">
                    <span className="cart-products-count"
                        style={{ top: '-10px', left: '1.125pc' }}
                    >{state.length}</span>
                    <i className="fa fa-shopping-cart"
                        style={{ fontSize: '25px' }}
                        aria-hidden="true" />
                </div>
                <div className="dropdown-content">
                    <div className="cart-content">
                        <table>
                            <tbody>
                                {state.length > 0 ? renderCart : emtyCart()}
                                {state.length > 0 ?
                                    <>
                                        <tr className="total">
                                            <td colSpan={2}>Tổng đơn : </td>
                                            <td>{formatNumber(cartTotalAmount)} VNĐ</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3} className="d-flex justify-content-center">
                                                <div className="cart-button">
                                                    <Link to="/Viewcart" title="View Cart">Giỏ hàng</Link>
                                                    <Link to="/Checkout" title="Checkout">Đặt hàng</Link>
                                                </div>
                                            </td>
                                        </tr>
                                    </> : ""}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;