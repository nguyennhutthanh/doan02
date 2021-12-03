import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { formatNumber } from '../../Common/index';
import { addToCart, getTotals } from "../../features/cartSlice";
import { toast } from "react-toastify";

const ListProductGid = () => {
    const productsgid = useSelector((state) => state.listAllProduct.products);
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
    const [pageNumber, setPageNumber] = useState(0)

    const productsPerPage = 9;
    const pagesVisited = pageNumber * productsPerPage;

    const displayProduct = productsgid.slice(pagesVisited, pagesVisited + productsPerPage).map((product) => {
        const {
            id, tenSP, giaSP, urlAnhSanPham, soluong, giaKhuyenMai, khuyenMaiNavigation, danhMucHinhNavigation } = product;

        return (
            <div className="item text-center col-md-4" key={id}>
                <div className="product-miniature js-product-miniature item-one first-item">
                    <div className="thumbnail-container border"
                        style={{ height: '260px' }}>
                        <Link to={`/DetailProduct/${id}`}>
                            <img className="img-fluid image-cover" style={{ width: '280.88px', height: '260px', objectFit: 'contain' }} src={urlAnhSanPham} alt="img" />
                            <img className="img-fluid image-secondary" src={danhMucHinhNavigation[0].urlAnh} style={{ width: '280.88px', height: '260px', objectFit: 'contain' }} alt="img" />
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

    const pageCount = Math.ceil(productsgid.length / productsPerPage)

    const handlePageClick = ({ selected }) => {
        setPageNumber(selected)
    }
    return (
        <>
            {productsgid.length > 0 ? displayProduct : <h1>...Loading</h1>}
            <div className="pagination col-md-12 mt-5">
                <div className="js-product-list-top ">
                    <div className="d-flex justify-content-around row">
                        <span>Trang {pageNumber + 1 + '-' + pageCount} trong {pageCount} Trang</span>
                        <div className="page-list col col-xs-12">
                            <ReactPaginate
                                breakLabel="..."
                                previousLabel={"Trước"}
                                nextLabel={"kế tiếp"}
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default ListProductGid;