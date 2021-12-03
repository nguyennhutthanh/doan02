import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { formatNumber } from '../../Common/index';
import {
	addToCart, clearCart, decreaseCart, getTotals, removeFromCart,
} from "../../features/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {

	const state = useSelector((state) => state.cart.cartItems);
	const cart = useSelector((state) => state.cart);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTotals());
	}, [cart, dispatch]);

	const handleAddToCart = (product) => {
		if (product.soluong <= product.cartQuantity) {
			toast.warning(`${product.tenSP} chỉ còn ${product.soluong} sản phầm`, {
				position: "top-right",
			});
		}
		else {
			dispatch(addToCart(product));
		}
	};

	const handleDecreaseCart = (product) => {
		dispatch(decreaseCart(product));
	};

	const handleRemoveFromCart = (product) => {
		dispatch(removeFromCart(product));
	};

	const handleClearCart = () => {
		dispatch(clearCart());
	};
	const { cartTotalAmount, cartTotalQuantity } = cart;

	const renderCart = state.map((cartItem) => {
		const {
			id, tenSP, giaSP, urlAnhSanPham, giaKhuyenMai, khuyenMaiNavigation, cartQuantity, kichThuoc, chatLieuNavigation
		} = cartItem;

		return (
			<li className="cart-item" key={id}>
				<div className="product-line-grid row justify-content-between">
					<div className="product-line-grid-left col-md-2">
						<span className="product-image media-middle">
							<Link to={`/DetailProduct/${id}`}>
								<img className="img-fluid" src={urlAnhSanPham} alt="Organic Strawberry Fruits" />
							</Link>
						</span>
					</div>
					<div className="product-line-grid-body col-md-6">
						<div className="product-line-info">
							<Link to={`/DetailProduct/${id}`} className="label" >{tenSP}</Link>
						</div>
						<div className="product-line-info product-price">
							{
								khuyenMaiNavigation.sale > 0 ?
									<span className="value">{formatNumber(giaKhuyenMai)} VNĐ</span> :
									<span className="value">{formatNumber(giaSP)} VNĐ</span>
							}
						</div>
						<div className="product-line-info">
							<span className="label-atrr">Kích thước : </span>
							<span className="value">{kichThuoc}</span>
						</div>
						<div className="product-line-info">
							<span className="label-atrr">Chất liệu : </span>
							<span className="value">{chatLieuNavigation.tenChatLieu}</span>
						</div>
					</div>
					<div className="product-line-grid-right text-center product-line-actions col-md-4">
						<div className="row">
							<div className="col-md-5 col qty">
								<div className="label">Số lượng:</div>
								<div className="quantity">
									<input type="text" name="qty"
										value={cartQuantity}
										className="input-group form-control" />
									<span className="input-group-btn-vertical">
										<button className="btn btn-touchspin js-touchspin bootstrap-touchspin-up"
											onClick={() => handleAddToCart(cartItem)}
											type="button">
											+
										</button>
										<button className="btn btn-touchspin js-touchspin bootstrap-touchspin-down"
											onClick={() => handleDecreaseCart(cartItem)}
											type="button">
											-
										</button>
									</span>
								</div>
							</div>
							<div className="col-md-5 col price">
								<div className="label">Tổng</div>
								<div className="product-price total"
									style={{ margin: '21px 0px 0px 0px' }}
								>
									{
										khuyenMaiNavigation.sale > 0 ?
											formatNumber(giaKhuyenMai * cartQuantity)
											: formatNumber(giaSP * cartQuantity)
									} đ
								</div>
							</div>
							<div className="col-md-2 col text-xs-right align-self-end">
								<div className="cart-line-product-actions ">
									<button className="remove-from-cart"
										type=""
										style={{ background: 'none', color: 'red', border: 'none' }}
										onClick={() => handleRemoveFromCart(cartItem)}
									>
										<i className="fa fa-trash-o" aria-hidden="true" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</li>
		)
	})

	const emtyCart = () => {
		return (
			<>
				<div className="container">
					<h6 className="text-center" style={{ fontSize: '14px' }}>
						! Giỏ hàng rỗng, bạn chưa thêm sản phẩm nào
					</h6>
				</div>
				<div>
					<Link to="/"
						style={{ marginTop: '18px', marginLeft: '41%' }}
						className="continue btn btn-primary pull-xs-right">
						Mua hàng tiếp
					</Link>
				</div>
			</>
		);
	}

	const Checkout = () => {
		return (
			<>
				<Link to="Checkout" className="continue btn btn-primary pull-xs-right">
					Đặt ngay
				</Link>
				<button
					style={{ marginLeft: '14px' }}
					className="continue btn btn-primary pull-xs-right"
					onClick={() => handleClearCart()}
				>
					Xóa tất cả
				</button>
			</>

		)
	}
	return (
		<div className="product-cart checkout-cart blog">
			<div className="main-content" id="cart" style={{ margin: '0 auto', width: '1140px', marginTop: '65px' }}>
				{/* main */}
				<div id="wrapper-site">
					<div className="container">
						<div className="row">
							<div id="content-wrapper" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 onecol">
								<section id="main">
									<div className="cart-grid row">
										<div className="col-md-9 col-xs-12 check-info">
											<h1 className="title-page">Giỏ hàng của bạn</h1>
											<div className="cart-container">
												<div className="cart-overview js-cart">
													<ul className="cart-items">
														{
															state.length === 0 ? emtyCart() : renderCart
														}
													</ul>
												</div>
											</div>
											{
												state.length === 0 ? "" : Checkout()
											}
										</div>
										<div className="cart-grid-right col-xs-12 col-lg-3">
											<div className="cart-summary"
												style={{ borderRadius: '6px' }}
											>
												<div className="cart-detailed-totals">
													<div className="cart-summary-products">
														<div className="summary-label text-center">Có {state.length} sản phẩm trong giỏ hàng</div>
													</div>
													<div className="cart-summary-line" id="cart-subtotal-products">
														<span className="label js-subtotal">
															Tổng đơn :
														</span>
														<span className="value"> {formatNumber(cartTotalAmount)} VNĐ</span>
													</div>
													<div className="cart-summary-line" id="cart-subtotal-shipping">
														<span className="label">
															Số lượng sản phẩm :
														</span>
														<span className="value">{cartTotalQuantity}</span>
														<div>
															<small className="value" />
														</div>
													</div>
												</div>
											</div>
											<div id="block-reassurance"
												style={{
													borderRadius: '6px', marginTop: '15px'
												}}
											>
												<ul>
													<li>
														<div className="block-reassurance-item">
															<img src="img/product/check1.png" alt="Security policy (edit with Customer reassurance module)" />
															<span>Chính sách bảo mật (đóng gói cẩn thận có niêm phong của shop)</span>
														</div>
													</li>
													<li>
														<div className="block-reassurance-item">
															<img src="img/product/check2.png" alt="Delivery policy (edit with Customer reassurance module)" />
															<span>Chính sách giao hàng (giao hàng tận nơi, phục vụ tận tình)</span>
														</div>
													</li>
													<li>
														<div className="block-reassurance-item">
															<img src="img/product/check3.png" alt="Return policy (edit with Customer reassurance module)" />
															<span>Chính sách hoàn trả (không vừa ý hoặc do lỗi của nhà sản phẩm 1 đổi 1)</span>
														</div>
													</li>
												</ul>
											</div>
											{state.length > 0 ?
												<Link to="/"
													style={{ marginTop: '10px', marginLeft: '23%' }}
													className="continue btn btn-primary pull-xs-right">
													Mua hàng tiếp
												</Link>
												: ""
											}
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;