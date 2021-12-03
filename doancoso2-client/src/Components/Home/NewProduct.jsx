import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../Common/index';
import { addToCart, getTotals } from "../../features/cartSlice";
import { toast } from "react-toastify";

const NewProduct = () => {
    const product = useSelector((state) => state.allProduct.product);
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

    const renderList = product.map((product) => {
        const {
            id, tenSP, giaSP, urlAnhSanPham, soluong, giaKhuyenMai, khuyenMaiNavigation, danhMucHinhNavigation,
        } = product;
        return (
            <div className="item text-center col-20" key={id}>

                <div className="product-miniature js-product-miniature item-one first-item">
                    <div className="thumbnail-container" style={{ border: '1px solid #dee2e6' }}>
                        <Link to={`/DetailProduct/${id}`}>
                            <img className="img-fluid image-cover" style={{ width: '227.8px', height: '227.8px', objectFit: 'contain' }} src={urlAnhSanPham} alt="img" />
                            <img className="img-fluid image-secondary" src={danhMucHinhNavigation[0].urlAnh} style={{ width: '227.8px', height: '227.8px', objectFit: 'contain' }} alt="img" />
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
                                    onClick={() => handleAddToCart(product)}
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
        <>
            {
                Object.keys(product).length === 0 ? <h4 className="text-center">...Loading data</h4> : renderList
            }
        </>
    );
};

export default NewProduct;