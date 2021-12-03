import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setRelatedProduct } from '../../redux/actions/productActions'
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { formatNumber } from '../../Common/index'
import { toast } from "react-toastify";
import { addToCart, getTotals, decreaseCart } from "../../features/cartSlice";

const BaseURL = "https://localhost:44336/api/Products/GetRelatedProduct/"

const RelatedProducts = () => {
    const options = {
        responsiveClass: true,
        nav: true,
        dots: false,
        autoplay: true,
        smartSpeed: 1000,
    };

    const Related = useSelector((state) => state.relatedProduct.related)
    const state = useSelector((state) => state.cart.cartItems);
    const { id } = useParams();

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

    const fetchRelatedProduct = async () => {
        const response = await axios
            .get(BaseURL + id)
            .catch((err) => console.log(err));
        dispatch(setRelatedProduct(response.data));
    }

    useEffect(() => {
        if (id && id !== '') {
            fetchRelatedProduct();
        }
    }, [id]);

    const renderListRelated = Related.map((Relatedproduct) => {
        const {
            tenSP, giaSP, urlAnhSanPham, soluong, giaKhuyenMai, khuyenMaiNavigation, danhMucHinhNavigation, } = Relatedproduct;
        return (
            <div className="item text-center col-md-4" style={{ maxWidth: '312px' }}>
                <div className="product-miniature js-product-miniature item-one first-item">
                    <div className="thumbnail-container border border">
                        <Link to={`/DetailProduct/${id}`}>
                            <img className="img-fluid image-cover" style={{ width: '280.88px', height: '260px', objectFit: 'contain' }} src={urlAnhSanPham} alt="img" />
                            {
                                danhMucHinhNavigation.map((item) => {
                                    return (
                                        <img className="img-fluid image-secondary" src={item.urlAnh} style={{ width: '280.88px', height: '260px', objectFit: 'contain' }} alt="img" />
                                    )
                                })
                            }
                        </Link>
                        {
                            khuyenMaiNavigation.sale > 0 ?
                                <div className="product-flags discount">-{khuyenMaiNavigation.sale}%</div>
                                : ""
                        }
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
                                    onClick={() => handleAddToCart(Relatedproduct)}
                                >
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
        <div className="related">
            <div className="title-tab-content  text-center">
                <div className="title-product justify-content-start">
                    <h2>Sản phẩm liên quan</h2>
                </div>
            </div>
            <div className="tab-content">
                <div className="row">
                    <OwlCarousel className='owl-nav owl-nav owl-theme' {...options} loop margin={10} nav>
                        {Related.length > 0 ? renderListRelated : <h4 className="text-center">...Loading data</h4>}
                    </OwlCarousel>

                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;