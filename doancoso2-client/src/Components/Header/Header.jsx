import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart'
import TabSlider from './TabSlider';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { selectListRooms } from '../../redux/actions/listRoomActions';
import SearchProduct from './SearchProduct';
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const BaseURL = "https://localhost:44336/api/Home/";

function Header() {
	const history = useHistory();
	const dataUser = JSON.parse(localStorage.getItem("info_user"));
	const map = useSelector(state => state.user.user)
	const dispatch = useDispatch();

	const fetchListRooms = async () => {
		const response = await axios.get(BaseURL + "GetListSanPhamLoai")
			.catch((err) => console.log(err));
		dispatch(selectListRooms(response.data));
	};


	const LogoutUser = () => {
		history.push("/")
		window.localStorage.removeItem('info_user');
		toast.success(`Đăng xuất thành công`, {
			position: "top-right",
		});
		userMap()
		window.location = ""
	}

	const userMap = () => {
		return (
			<div className="account-list-content">
				{
					dataUser === null ?
						<>
							<div>
								<Link className="login" to="Login" title="Log in to your customer account">
									<i className="fa fa-sign-in" />
									<span>Đăng nhập</span>
								</Link>
							</div>
							<div>
								<Link className="register" to="Register" title="Register Account">
									<i className="fa fa-user" />
									<span>Đăng ký</span>
								</Link>
							</div>
						</>
						:
						<>
							<div>
								<button
									style={{
										background: ' none',
										fontSize: ' 10pt',
										border: 'none',
										paddingLeft: '3px',
										cursor: 'pointer'
									}}
									className="register"
									onClick={() => LogoutUser()}
									title="Đăng xuất">
									<i className="fa fa-user" />
									<span>Đăng xuất</span>
								</button>
							</div>
						</>
				}
			</div>
		);
	}

	useEffect(() => {
		fetchListRooms();
		userMap();
	}, []);

	return (
		<div id="home4">
			<header>
				{/* header left mobie */}
				<div className="header-mobile d-md-none">
					<div className="mobile hidden-md-up text-xs-center d-flex align-items-center justify-content-around">
						{/* menu left */}
						<div id="mobile_mainmenu" className="item-mobile-top">
							<i className="fa fa-bars" aria-hidden="true" />
						</div>
						{/* logo */}
						<div className="mobile-logo">
							<Link to="/">
								<img className="logo-mobile img-fluid" src="img/home/logo-mobie.png" alt="Prestashop_Furnitica" />
							</Link>
						</div>
						{/* menu right */}
						<div className="mobile-menutop" data-target="#mobile-pagemenu">
							<i className="zmdi zmdi-more" />
						</div>
					</div>
					{/* search */}
					<div id="mobile_search" className="d-flex">
						<div id="mobile_search_content">
							<form method="get">
								<input type="text"
									autoComplete="off" placeholder="Search"
								/>
								<button type="submit">
									<i className="fa fa-search" />
								</button>
							</form>
						</div>
						<div className="desktop_cart">
							<div className="blockcart block-cart cart-preview tiva-toggle">
								<div className="header-cart tiva-toggle-btn">
									<span className="cart-products-count">3</span>
									<i className="fa fa-shopping-cart" aria-hidden="true" />
								</div>
								<div className="dropdown-content">
									<div className="cart-content">
										<table>
											<tbody>
												<tr>
													<td className="product-image">
														<a href="product-detail.html">
															<img src="img/product/5.jpg" alt="Product" />
														</a>
													</td>
													<td>
														<div className="product-name">
															<a href="product-detail.html">Organic Strawberry Fruits</a>
														</div>
														<div>
															2 x
															<span className="product-price">£28.98</span>
														</div>
													</td>
													<td className="action">
														<a className="remove" href="#">
															<i className="fa fa-trash-o" aria-hidden="true" />
														</a>
													</td>
												</tr>
												<tr className="total">
													<td colSpan={2}>Total:</td>
													<td>£92.96</td>
												</tr>
												<tr>
													<td colSpan={3} className="d-flex justify-content-center">
														<div className="cart-button">
															<Link to="/Viewcart" title="View Cart">View Cart</Link>
															<Link to="/Checkout" title="Checkout">Checkout</Link>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* header desktop */}
				<div className="header-top d-xs-none">
					<div className="container">
						<div className="row margin-0">
							{/* menu */}
							<div className="d-flex icon-menu align-items-center justify-content-center">
								<div className="has-showmore dropdown vertical-dropdown">
									<div data-toggle="collapse" data-target="#show-menu" aria-expanded="true" role="status">
										<div id="nav_icon3">
											<span />
											<span />
											<span />
										</div>
									</div>
								</div>
							</div>
							<div className="main-menu d-flex align-items-center justify-content-start navbar-expand-md">
								<div className="menu navbar collapse navbar-collapse">
									<ul className="menu-top navbar-nav">
										<li className="nav-link">
											<Link to="/" className="parent">Trang Chủ</Link>
										</li>
										<li>
											<Link to="/About" className="parent">Giới Thiệu</Link>

										</li>
										<li>
											<Link to="/Product" className="parent">Sản Phẩm</Link>
										</li>
										<li>
											<Link to="/Contact" className="parent">Liên Hệ</Link>
										</li>
									</ul>
								</div>
							</div>
							{/* logo */}
							<div className="flex-2 d-flex  align-items-center justify-content-center">
								<div id="logo">
									<Link to="/">
										<img src="img/home/logo.png" alt="logo" className="img-fluid" />
									</Link>
								</div>
							</div>
							{/* search */}
							<div id="search_widget" className="d-flex align-items-center justify-content-end float-right"
								style={{ marginLeft: '30px' }}
							>
								<SearchProduct />
								<div id="block_myaccount_infos">
									<div className="myaccount-title hidden-sm-down dropdown d-flex align-items-center justify-content-center">
										<a href="#acount" data-toggle="collapse" className="acount" aria-expanded="true">
											<i className="fa fa-user" aria-hidden="true" />
											<span className="ml-1"
												style={{ fontSize: '13px' }}
											>	{dataUser === null ? "" : dataUser.hoTen}</span>
										</a>
									</div>
									<div id="acount" className="collapse">
										{userMap()}
									</div>
								</div>
								<Cart />
							</div>
						</div>
					</div>
				</div>
				<TabSlider />
			</header>
		</div>

	);
}

export default Header;