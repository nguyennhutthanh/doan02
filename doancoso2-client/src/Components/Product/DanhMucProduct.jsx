import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { selectedCategorys } from '../../redux/actions/categoryActions'
import CategoryRoom from './CategoryRoom';
import ProductChatLieu from './ProductChatLieu';
import ThuongHieuProduct from './ThuongHieuProduct';
import ReactPaginate from 'react-paginate';
import { formatNumber } from '../../Common/index'
import { addToCart, getTotals } from "../../features/cartSlice";
import { toast } from "react-toastify";

const DanhMucProduct = () => {
  const category = useSelector((state) => state.spCategory.spcaterogy);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  dispatch(getTotals());
  const { id } = useParams();

  const fetchProductOfType = async () => {
    const response = await axios
      .get(`https://localhost:44336/api/Home/SanPhamtheoLoai/${id}`)
      .catch((err) => console.log(err));

    dispatch(selectedCategorys(response.data));
  }

  const [pageNumber, setPageNumber] = useState(0)

  const productsPerPage = 6;
  const pagesVisited = pageNumber * productsPerPage;

  const pageCount = Math.ceil(category.length / productsPerPage)

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected)
  }

  const renderListGrid = category.map((category) => {
    const {
      id, tenSP, giaSP, urlAnhSanPham, soluong, giaKhuyenMai, khuyenMaiNavigation, danhMucHinhNavigation } = category;

    return (
      <div className="item text-center col-md-4" key={id}>
        <div className="product-miniature js-product-miniature item-one first-item"

        >
          <div className="thumbnail-container border"
            style={{ height: '260px' }}
          >
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
                  onClick={() => handleAddToCart(category)}
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

  const renderList = category.map((category) => {
    const {
      id, tenSP, giaSP, urlAnhSanPham, soluong, review, giaKhuyenMai, khuyenMaiNavigation, danhMucHinhNavigation, } = category;

    return (
      <div className="item col-md-12" key={id}>
        <div className="product-miniature item-one first-item">
          <div className="row">
            <div className="col-md-4">
              <div className="thumbnail-container border"
                style={{ height: '250px' }}
              >
                <Link to={`/DetailProduct/${id}`}>
                  <img className="img-fluid image-cover" style={{ width: '282.88px', height: '250px', objectFit: 'contain' }} src={urlAnhSanPham} alt="img" />
                  <img className="img-fluid image-secondary" src={danhMucHinhNavigation[0].urlAnh} style={{ width: '282.88px', height: '250px', objectFit: 'contain' }} alt="img" />
                </Link>
                {
                  khuyenMaiNavigation.sale > 0 ?
                    <div className="product-flags discount">-{khuyenMaiNavigation.sale}%</div>
                    : ""
                }
              </div>
            </div>
            <div className="col-md-8">
              <div className="product-description">
                <div className="product-groups">
                  <div className="product-title">
                    <Link to={`/DetailProduct/${id}`}>{tenSP}</Link>
                    {
                      soluong > 0 ? <span className="info-stock">
                        <i className="fa fa-check-square-o" aria-hidden="true" />Còn hàng</span>
                        : <span className="info-stock text-danger" ><i className="fa fa-close" aria-hidden="true" /> Hết hàng</span>
                    }
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
                  <div className="discription">
                    {review}
                  </div>
                </div>
                <div className="product-buttons d-flex">
                  <div className="formAddToCart">
                    <button type="click" style={{ cursor: 'pointer' }} className="add-to-cart" name="id_product"
                      onClick={() => handleAddToCart(category)}>
                      <i className="fa fa-shopping-cart" aria-hidden="true" />
                      Thêm vào giỏ
                    </button>
                  </div>
                  <Link to={`/DetailProduct/${id}`} className="quick-view hidden-sm-down" data-link-action="quickview">
                    <i className="fa fa-eye" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  })

  useEffect(() => {
    if (id && id !== '') {
      fetchProductOfType();
    }
  }, [id]);

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
                        {/* category menu */}
                        <CategoryRoom />
                        {/* best seller */}
                        <div className="sidebar-block">
                          <ProductChatLieu />
                        </div>
                        {/* product tag */}
                        <ThuongHieuProduct />
                      </div>
                      <div className="col-sm-8 col-lg-9 col-md-8 product-container">
                        <h1>Sản phẩm theo danh mục</h1>
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
                                <p>Có ({category.length}) sản phẩm thuộc danh mục này</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* list sanr pham */}
                        <div className="tab-content product-items">
                          <div id="grid" className="related tab-pane fade in active show">
                            <div className="row">
                              {renderListGrid}
                            </div>
                          </div>
                          <div id="list" className="related tab-pane fade">
                            <div className="row">
                              {renderList}
                            </div>
                          </div>
                        </div>
                        {/* pagination */}
                        <div className="pagination">
                          <div className="js-product-list-top ">
                            <div className="d-flex justify-content-around row">
                              <div className="showing col col-xs-12">
                                <span>Trang {pageNumber + 1 + '-' + pageCount} trong {pageCount} Trang</span>
                              </div>
                              <div className="page-list col col-xs-12">
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
                        </div>
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

export default DanhMucProduct;