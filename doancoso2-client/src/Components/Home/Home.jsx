import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import NewProduct from './NewProduct';
import { setProducts, setProductDiscount, setProductLimited, setProductSelling } from '../../redux/actions/productActions';
import { setCategorys } from '../../redux/actions/categoryActions';
import { selectListProduct } from '../../redux/actions/listProductActions'
import ListDanhmuc from './ListDanhmuc';
import Baner from './Baner';
import Policy from './Policy';
import DiscountProduct from './DiscountProduct';
import ProductLimited from './ProductLimited';
import ProductSelling from './ProductSelling';

const BaseURL = "https://localhost:44336/api/Home/";

function Home() {
	const product = useSelector((state) => state);

	const dispatch = useDispatch();

	const fetchProducts = async () => {
		const response = await axios.get(BaseURL + "SanPhamMoiNhat")
			.catch((err) => console.log(err));
		dispatch(setProducts(response.data));
	};

	const fetchCategory = async () => {
		const response = await axios.get(BaseURL + "ListDanhMucSp")
			.catch((err) => console.log(err));
		dispatch(setCategorys(response.data));
	};

	const fetchDiscount = async () => {
		const response = await axios.get(BaseURL + "SanPhamKhuyenMai")
			.catch((err) => console.log(err));
		dispatch(setProductDiscount(response.data));
	}

	const fetchLimited = async () => {
		const response = await axios.get(BaseURL + "SanPhamCoHan")
			.catch(err => console.error(err));

		dispatch(setProductLimited(response.data));
	}

	const fetchSelling = async () => {
		const response = await axios.get(BaseURL + "SanPhamBanChay")
			.catch(err => console.error(err));
		dispatch(setProductSelling(response.data));
	}

	useEffect(() => {
		fetchCategory();
	}, []);

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		fetchDiscount();
	}, []);

	useEffect(() => {
		fetchLimited();
	}, []);

	useEffect(() => {
		fetchSelling();
	}, []);

	return (
		<div className="main-content">
			<div className="wrap-banner">
				<div className="container">
					<Baner />
					<Policy />
				</div>
			</div>
			{/* main */}
			<div id="wrapper-site">
				<div id="content-wrapper" className="full-width">
					<div id="main">
						<section className="page-home">
							<ListDanhmuc />
							<div className="featured-product">
								<div className="container">
									<div className="title-tab-content  text-center">
										<div className="title-product justify-content-between">
											<h2>S???N PH???M M???I NH???T</h2>
											<p>B???N C?? L???A CH???N S???N PH???M PH?? H???P CHO B???N CH??A </p>
										</div>
									</div>
									<div className="tab-content">
										<NewProduct />
									</div>
								</div>
							</div>
							<div className="featured-product" id="home3" style={{
								clear: 'both',
								position: 'relative',
								backgroundColor: '#eee'
							}}>
								<div className="container">
									<div className="title-tab-content  text-center">
										<div className="title-product justify-content-between">
											<h2 style={{ marginTop: '35px' }}>S???N PH???M KHUY???N M??I</h2>
											<p>KHUY???N M??I ?????N T???N TAY RINH NGAY QU?? KH???NG</p>
										</div>
									</div>
									<div className="tab-content">
										<DiscountProduct />
									</div>
								</div>
							</div>
							<div className="featured-product" style={{
								clear: 'both',
								position: 'relative',

							}}>
								<div className="container">
									<div className="title-tab-content  text-center">
										<div className="title-product justify-content-between">
											<h2>S???N PH???M GI???I H???N</h2>
											<p>NH???NG PHI??N B???N PH?? H???P V???I B???N</p>
										</div>
									</div>
									<div className="tab-content">
										<ProductLimited />
									</div>
								</div>
							</div>
							<div className="featured-product" style={{
								clear: 'both',
								position: 'relative',
								backgroundColor: '#eee'
							}}>
								<div className="container">
									<div className="title-tab-content  text-center">
										<div className="title-product justify-content-between">
											<h2 style={{ marginTop: '35px' }}>S???N PH???M ???????C B??N NHI???U NH???T</h2>
											<p>NH???NG S???N PH???M ???????C M???I NG?????I L???A CH???N V?? Y??U TH??CH</p>
										</div>
									</div>
									<div className="tab-content">
										<ProductSelling />
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Home;