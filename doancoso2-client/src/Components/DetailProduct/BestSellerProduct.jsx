import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setProductBestSelling } from '../../redux/actions/productActions'
import { formatNumber } from '../../Common/index'
const BaseURL = "https://localhost:44336/api/Products/";

const BestSellerProduct = () => {

    const dispatch = useDispatch();

    const fetchBestSelling = async () => {
        const response = await axios.get(BaseURL + "GetBestSelling")
            .catch((err) => console.log(err));
        dispatch(setProductBestSelling(response.data));
    };

    useEffect(() => {
        fetchBestSelling();
    }, []);


    const bestselling = useSelector((state) => state.bestSelling.bestselling);

    const renderBestSelling = bestselling.map((bestselling) => {
        const { id, tenSP, giaSP, soluong, urlAnhSanPham, giaKhuyenMai,
            khuyenMaiNavigation, danhMucHinhNavigation } = bestselling;
        return (
            <div className="item col-md-12">
                <Link to={`/DetailProduct/${id}`}>
                    <div className="product-miniature item-one first-item d-flex">

                        <div className="thumbnail-container border">
                            <Link to={`/DetailProduct/${id}`}>
                                <img className="img-fluid image-cover" src={urlAnhSanPham} alt="img" />
                                {
                                    danhMucHinhNavigation.map((item) => {
                                        return (

                                            <img className="img-fluid image-secondary" src={item.urlAnh} alt="img" />
                                        )
                                    })
                                }
                            </Link>
                            {
                                khuyenMaiNavigation.sale > 0 ?
                                    <div className="product-flags discount"
                                        style={{ fontSize: '10px', width: '30px', marginTop: '-13px', height: '30px', lineHeight: '30px', marginLeft: '-13px', }}
                                    >-{khuyenMaiNavigation.sale}%</div>
                                    : ""
                            }
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
                                                    <span className="price">{formatNumber(giaKhuyenMai)}
                                                        vnđ    <del className="regular-price">{formatNumber(giaSP)} vnđ</del>
                                                    </span>

                                                </>
                                                : <span className="price">{formatNumber(giaSP)} vnđ</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    })

    return (
        <div className="sidebar-block">
            <div className="title-block">
                Giá tốt
            </div>
            <div className="product-content tab-content">
                <div className="row">
                    {bestselling.length > 0 ? renderBestSelling : <h4 className="text-center">...Loading data</h4>}
                </div>
            </div>
        </div>
    );
};

export default BestSellerProduct;