import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { selectListProduct } from '../../redux/actions/listProductActions'
import ListProductGid from './ListProductGid';
import ListProductTab from './ListProductTab';
import CategoryRoom from './CategoryRoom';
import { selectedRoomTypes, selectedProductByMaterial, selectedProductByThuongHieu } from '../../redux/actions/categoryActions';
import ProductChatLieu from './ProductChatLieu';
import ThuongHieuProduct from './ThuongHieuProduct';


const BaseURL = "https://localhost:44336/api/Products/";

function Product() {
	const productsgid = useSelector((state) => state.listAllProduct.products);

	const dispatch = useDispatch();

	const fetchListProducts = async () => {
		const response = await axios.get(BaseURL + "GetAllSanPham")
			.catch((err) => console.log(err));
		dispatch(selectListProduct(response.data));
	};

	const fetchRoomTypes = async () => {
		const response = await axios.get(BaseURL + "GetRoomsProduct")
			.catch((err) => console.log(err));
		dispatch(selectedRoomTypes(response.data));
	}

	const fetchProductByMaterial = async () => {
		const response = await axios.get(BaseURL + "GetProductByMaterial")
			.catch((err) => console.log(err));
		dispatch(selectedProductByMaterial(response.data));
	}

	const fetchProductByThuonghieu = async () => {
		const response = await axios.get(BaseURL + "GetProductBythuongHieu")
			.catch((err) => console.log(err));
		dispatch(selectedProductByThuongHieu(response.data));
	}

	useEffect(() => {
		fetchListProducts();
	}, []);

	useEffect(() => {
		fetchRoomTypes();
	}, []);

	useEffect(() => {
		fetchProductByMaterial();
	}, []);

	useEffect(() => {
		fetchProductByThuonghieu();
	}, []);

	return (
		<div id="product-sidebar-left" className="product-grid-sidebar-left">
			<div className="main-content">
				<div id="wrapper-site">
					<div id="content-wrapper" className="full-width">
						<div id="main">
							<div className="page-home" style={{ maxWidth: '95%', margin: '0 auto', marginTop: '141px' }} >
								<div className="container">
									<div className="content">
										<div className="row">
											<div className="sidebar-3 sidebar-collection col-lg-3 col-md-4 col-sm-4">
												{/* CategoryRoom */}
												<CategoryRoom />
												{/* ProductChatLieu */}
												<div className="sidebar-block">
													<ProductChatLieu />
												</div>
												{/* ThuongHieuProduct */}
												<ThuongHieuProduct />
											</div>
											<div className="col-sm-8 col-lg-9 col-md-8 product-container">
												<h1>Danh sách sản phẩm</h1>
												<div className="js-product-list-top firt nav-top">
													<div className="d-flex justify-content-around row">
														<div className="col col-xs-12">
															<ul className="nav nav-tabs">
																<li>
																	<a href="#grid" data-toggle="tab" className="active show fa fa-th-large" />
																</li>
																<li>
																	<a href="#list" data-toggle="tab" className="fa fa-list-ul" />
																</li>
															</ul>
															<div className="hidden-sm-down total-products">
																<p>Tổng có ({productsgid.length}) sản phẩm trên hệ thống</p>
															</div>
														</div>
													</div>
												</div>
												{/* list sanr pham */}
												<div className="tab-content product-items">
													<div id="grid" className="related tab-pane fade in active show">
														<div className="row">
															<ListProductGid />
														</div>
													</div>
													<div id="list" className="related tab-pane fade">
														<div className="row">
															<ListProductTab />
														</div>
													</div>
												</div>
												{/* end list sanr pham */}
											</div>
											{/* end col-md-9-1 */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;