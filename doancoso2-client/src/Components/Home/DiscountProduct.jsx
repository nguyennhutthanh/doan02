import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { formatNumber } from '../../Common/index'
import { addToCart, getTotals } from "../../features/cartSlice";
import { toast } from "react-toastify";
import { Skeleton } from 'react-skeleton-generator';

const options = {
	responsiveClass: true,
	nav: true,
	dots: false,
	autoplay: true,
	smartSpeed: 1000,
};

const DiscountProduct = () => {

	const discount = useSelector((state) => state.allDiscount.discount);
	const state = useSelector((state) => state.cart.cartItems);

	const dispatch = useDispatch();
	const handleAddToCart = (product) => {
		for (let i = 0; i < state.length; i++) {
			if (product.soluong <= state[i].cartQuantity && state[i].id === product.id) {
				toast.warning(`${product.tenSP} chỉ còn ${product.soluong} sản phầm`, {
					position: "top-right",
				});
				return;
			}
		}
		dispatch(addToCart(product));
	};
	dispatch(getTotals());

	const renderList = discount.map((discount) => {
		const {
			id, tenSP, giaSP, urlAnhSanPham, soluong, giaKhuyenMai, khuyenMaiNavigation, danhMucHinhNavigation,
		} = discount;
		return (
			<div className="item text-center" key={id}
				style={{ borderRadius: '0.083333333in' }}>
				<div className="product-miniature js-product-miniature item-one first-item"
					style={{ borderRadius: '0.1333in', width: '350px', background: 'white', height: '485px' }}>
					<div className="thumbnail-container"
						style={{ width: '350px', height: '350px' }}>
						<Link to={`/DetailProduct/${id}`}>
							<img className="img-fluid image-cover" src={urlAnhSanPham} alt="img"
								style={{ width: '350px', height: '350px', objectFit: 'fill' }} />

							<img className="img-fluid image-secondary" src={danhMucHinhNavigation[0].urlAnh} alt="img"
								style={{ width: '350px', height: '350px', objectFit: 'fill' }} />
						</Link>
						<div className="product-flags discount">-{khuyenMaiNavigation.sale}%</div>
						<div className="highlighted-informations">
							<div className="variant-links">
								<a href="#" className="color beige" title="Beige" />
								<a href="#" className="color orange" title="Orange" />
								<a href="#" className="color green" title="Green" />
							</div>
						</div>
					</div>
					<div className="product-description">
						<div className="product-groups">
							<div className="product-title">
								<Link to={`/DetailProduct/${id}`}>{tenSP}</Link>
							</div>
							<div className="rating">
								<div className="star-content" style={{ marginTop: '6px', color: 'green', fontSize: '15px' }}>
									{
										soluong > 0 ? <span className="info-stock">
											<i className="fa fa-check-square-o" aria-hidden="true" />Còn hàng</span>
											: <span className="info-stock text-danger" ><i className="fa fa-close" aria-hidden="true" /> Hết hàng</span>
									}
								</div>
							</div>
							<div className="product-group-price">
								<div className="product-price-and-shipping">
									{
										khuyenMaiNavigation.sale > 0 ?
											<>
												<span className="price">{formatNumber(giaKhuyenMai)} vnđ</span>
												<del className="regular-price">{formatNumber(giaSP)} vnđ</del>
											</>
											: <span className="price">{formatNumber(giaSP)} vnđ</span>
									}
								</div>
							</div>
						</div>
						<div className="product-buttons d-flex justify-content-center">
							<div className="formAddToCart">
								<button type="click" style={{ cursor: 'pointer' }} className="add-to-cart" name="id_product"
									onClick={() => handleAddToCart(discount)}>
									<i className="fa fa-shopping-cart" aria-hidden="true" />
								</button>
							</div>
							<Link to={`/DetailProduct/${id}`} className="quick-view hidden-sm-down" data-link-action="quickview">
								<i className="fa fa-eye" aria-hidden="true" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	})

	return (
		<div className="section product-living-room"
			style={{ height: '590px', marginBottom: '3rem', paddingTop: '1rem' }}
		>
			<div className="container">
				<div className="row">
					<div className="new-arrivals product-tab col">
						<div className="tab-content">
							<div className="tab-content"
								style={{ width: '1110px', margin: '0 auto', height: '468px' }}
							>
								<div id="new1" className="tab-pane fade in active show">
									<OwlCarousel className='category-product owl-nav owl-nav owl-theme' {...options} loop margin={10} nav>
										{
											discount.length > 0 ? renderList
												: <Skeleton.SkeletonThemeProvider >
													<div className="item text-center">
														<div className="product-miniature js-product-miniature item-one first-item"
															style={{ borderRadius: '0.1333in', width: '350px', height: '485px' }}>
															<Skeleton width="330px" height="358px" style={{ marginBottom: "30px !important", background: "#c9bcc9" }} />
															<Skeleton count={3} widthMultiple={['275px', '275px', '275px']} heightMultiple={['28px', '28px', '28px']}
																style={{
																	margin: '0px 30px 10px 30px !important', background: "#c9bcc9"
																}}
															/>
														</div>
													</div>
												</Skeleton.SkeletonThemeProvider>
										}
									</OwlCarousel>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	);
};

export default DiscountProduct;