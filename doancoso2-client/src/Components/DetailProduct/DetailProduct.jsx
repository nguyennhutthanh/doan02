import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { selectedProduct, setComment } from '../../redux/actions/productActions'
import RelatedProducts from './RelatedProducts';
import BestSellerProduct from './BestSellerProduct';
import { Link } from 'react-router-dom';
import CategoryRoom from './../Product/CategoryRoom';
import ThuongHieuProduct from '../Product/ThuongHieuProduct';
import Comment from './Comment';
import { getParsedDate, formatNumber } from '../../Common/index'
import { toast } from "react-toastify";
import { addToCart, getTotals, decreaseCart } from "../../features/cartSlice";
import { createAPI, MapAPI } from "../../../src/api/index";


const DetailProduct = () => {

  const product = useSelector((state) => state.product)
  const comment = useSelector((state) => state.comment.comment)
  const state = useSelector((state) => state.cart.cartItems);
  const dataCart = JSON.parse(localStorage.getItem("cartItems"))

  console.log(dataCart)
  const {
    maSP, tenSP, giaSP, urlAnhSanPham, soluong, danhMucHinhNavigation, mota, review, xuatXu, baoHanh, kichThuoc, giaKhuyenMai, danhmucNavigation, thuongHieuNavigation, chatLieuNavigation, size, khuyenMaiNavigation, commentsNavigation } = product;

  const { id } = useParams();

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    for (let i = 0; i < dataCart.length; i++) {
      if (product.soluong <= dataCart[i].cartQuantity && dataCart[i].id === product.id) {
        toast.warning(`${product.tenSP} chỉ còn ${product.soluong} sản phầm`, {
          position: "top-right",
        });
        return;
      }
    }
    product.size += 1
    dispatch(addToCart(product));
  };

  dispatch(getTotals());

  const handleDecreaseCart = (product) => {
    if (product.size <= 0) {
      toast.info(`${product.tenSP} đã giảm tối đa 0 sản phẩm `, {
        position: "top-right",
      });
      return;
    }
    product.size -= 1
    dispatch(decreaseCart(product));
  };

  const fetchProductDetail = async () => {
    const response = await axios
      .get(`https://localhost:44336/api/Home/${id}`)
      .catch((err) => console.log(err));

    dispatch(selectedProduct(response.data));
  }
  const fetchComment = async () => {
    const response = await axios
      .get(`https://localhost:44336/api/BinhLuan/ClientListBinhLuan/${id}`)
      .catch((err) => console.log(err));

    dispatch(setComment(response.data));
  }

  useEffect(() => {
    if (id && id !== '') {
      fetchProductDetail();
      fetchComment();
    }
  }, [id]);

  useEffect(() => {
    fetchComment();
  }, []);

  const Addcomment = (formDataComment, resetForm) => {
    createAPI(MapAPI.COMMENT).create(formDataComment)
      .then(res => {
        fetchComment();
        toast.success(`bình luận thành công`, {
          position: "top-right",
        });
      }).catch(err => console.log(err))
    resetForm();
  }

  return (
    <div id="product-detail">
      <div className="main-content">
        <div id="wrapper-site">
          <div id="content-wrapper">
            <div id="main">
              <div className="page-home">
                <div className="container" style={{ margin: '0 auto', marginTop: '140px' }}>
                  <div className="content">
                    <div className="row">
                      <div className="sidebar-3 sidebar-collection col-lg-3 col-md-3 col-sm-4">
                        {/* category */}
                        <CategoryRoom />
                        {/* best seller */}
                        <BestSellerProduct />
                        {/* product tag */}
                        <ThuongHieuProduct />
                      </div>
                      <div className="col-sm-8 col-lg-9 col-md-9">
                        {
                          Object.keys(product).length === 0 ? (
                            <div>...Loading</div>
                          ) : (
                            <div className="main-product-detail">
                              <h2>Sản phẩm #{maSP}</h2>
                              <div className="product-single row">
                                <div className="product-detail col-xs-12 col-md-5 col-sm-5">
                                  <div className="page-content" id="content">
                                    <div className="images-container">
                                      <div className="js-qv-mask mask tab-content border">
                                        <div className="tab-pane fade active in show">
                                          <img src={urlAnhSanPham} alt="img" style={{
                                            borderRadius: '0.104166667in', height: '343px', objectFit: 'fill'
                                          }} />
                                        </div>

                                      </div>
                                      <ul className="product-tab nav nav-tabs d-flex">
                                        {
                                          danhMucHinhNavigation.map((picture) => {
                                            return (
                                              <li className="active col" key={picture.id}>
                                                <a href="#" className="active show">
                                                  <img src={picture.urlAnh}
                                                    style={{ borderRadius: '5px' }}
                                                    alt="img" />
                                                </a>
                                              </li>
                                            );
                                          })
                                        }
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="product-info col-xs-12 col-md-7 col-sm-7" style={{ fontSize: '14px' }}>
                                  <div className="detail-description">
                                    <div className="price-del">
                                      {
                                        khuyenMaiNavigation.sale > 0 ?
                                          <>
                                            <span className="price"
                                              style={{ textDecoration: 'line-through', color: 'currentcolor' }}
                                            >{formatNumber(giaSP)} vnđ</span>
                                            <span className="price"
                                              style={{ marginLeft: '31px' }}
                                            >{formatNumber(giaKhuyenMai)} vnđ</span>
                                          </>
                                          : <span className="price"
                                          >{formatNumber(giaSP)} vnđ</span>
                                      }
                                    </div>
                                    <p className="description">{review}</p>
                                    <div className="option has-border d-lg-flex size-color pb-0">
                                      <div className="row w-100" >
                                        <div className="col-md-6">
                                          <span className="availb">Trạng thái : </span>
                                          {
                                            soluong > 0 ?
                                              <span className="check text-success">
                                                <i className="fa fa-check-square-o" aria-hidden="true" /> Còn hàng</span>
                                              : <span className="check text-danger" >
                                                <i className="fa fa-close" aria-hidden="true" /> Hết hàng</span>
                                          }
                                        </div>
                                        <div className="col-md-6">
                                          {
                                            khuyenMaiNavigation.sale > 0 ?
                                              <p>Khuyến mãi :
                                                <span className="content2 font-weight-bold">
                                                  {khuyenMaiNavigation.sale}%
                                                </span>
                                              </p>
                                              : ""
                                          }
                                        </div>
                                      </div>
                                    </div>
                                    <div className="option has-border d-lg-flex size-color pb-0">
                                      <div className="row w-100" >
                                        <div className="col-md-6">
                                          <p >Kích thước : <span className="font-weight-bold"> {kichThuoc}</span></p>
                                        </div>
                                        <div className="col-md-6">
                                          <p>Bảo hành : <span className="font-weight-bold"> {baoHanh}</span></p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="has-border cart-area">
                                      <div className="product-quantity">
                                        <div className="qty">
                                          <div className="input-group">
                                            <div className="quantity mt-0">
                                              <span className="control-label">SỐ LƯỢNG : </span>
                                              <input type="text" name="qty"
                                                readOnly
                                                id="quantity_wanted" defaultValue={0} value={size} min="0" max="100"
                                                className="input-group form-control" />
                                              <span className="input-group-btn-vertical">
                                                <button className="btn btn-touchspin js-touchspin bootstrap-touchspin-up" type="button"
                                                  onClick={() => handleAddToCart(product)}
                                                >
                                                  +
                                                </button>
                                                {size <= 0 ?
                                                  <button disabled className="btn btn-touchspin js-touchspin bootstrap-touchspin-down"
                                                    style={{ backgroundColor: "#191718" }}
                                                  >
                                                    -
                                                  </button> :
                                                  <button className="btn btn-touchspin js-touchspin bootstrap-touchspin-down" type="button"
                                                    onClick={() => handleDecreaseCart(product)}
                                                  >
                                                    -
                                                  </button>
                                                }
                                              </span>
                                            </div>
                                            <span className="add mt-0">
                                              <button className="btn btn-primary add-to-cart add-item"
                                                onClick={() => handleAddToCart(product)}
                                              >
                                                <i className="fa fa-shopping-cart" aria-hidden="true" />
                                                <span>Thêm vào giỏ</span>
                                              </button>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="clearfix" />
                                      <p className="product-minimal-quantity">
                                      </p>
                                    </div>
                                    <div className="rating-comment has-border d-flex">
                                      <div className="row w-100">
                                        <div className="col-md-7">
                                          <p className="mb-0">
                                            Tên sản phầm :
                                            <span className="font-weight-bold">{tenSP}</span>
                                          </p>
                                        </div>
                                        <div className="col-md-5">
                                          <p className="mb-0">
                                            Xuất xứ :
                                            <span className="font-weight-bold"> {xuatXu}</span>
                                          </p>
                                        </div>
                                      </div>

                                    </div>
                                    <div className="rating-comment has-border d-flex">
                                      <div className="review-description d-flex">
                                        <span>Bình luận :</span>
                                      </div>
                                      <div className="read after-has-border">
                                        <a href="#review">
                                          <i className="fa fa-commenting-o color" aria-hidden="true" />
                                          <span>Lược bình luận ({commentsNavigation.length})</span>
                                        </a>
                                      </div>
                                      <div className="apen after-has-border">
                                        <a href="#review">
                                          <i className="fa fa-pencil color" aria-hidden="true" />
                                          <span>Viết đánh giá</span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className="content">
                                      <p>Mã sản phẩm :
                                        <span className="content2 font-weight-bold">
                                          {maSP}
                                        </span>
                                      </p>
                                      <p>Danh mục :
                                        <span className="content2 font-weight-bold">
                                          {danhmucNavigation.tenLoai}
                                        </span>
                                      </p>
                                      <p>Thương hiệu :
                                        <span className="content2 font-weight-bold">
                                          {thuongHieuNavigation.tenThuongHieu}
                                        </span>
                                      </p>
                                      <p>Chất liệu :
                                        <span className="content2 font-weight-bold">
                                          {chatLieuNavigation.tenChatLieu}
                                        </span>
                                      </p>

                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="review">
                                <ul className="nav nav-tabs">
                                  <li className="active">
                                    <a data-toggle="tab" href="#description" className="active show">Chi tiết sản phầm</a>
                                  </li>
                                  <li>
                                    <a data-toggle="tab" href="#review">Bình luận ({commentsNavigation.length})</a>
                                  </li>
                                </ul>
                                <div className="tab-content">
                                  <div id="description" className="tab-pane fade in active show">
                                    <div dangerouslySetInnerHTML={{ __html: mota }} />
                                  </div>
                                  <div id="review" className="tab-pane fade">
                                    <div className="spr-form">
                                      <div className="user-comment">
                                        {comment.length <= 0 ? <h5 className="text-center text-info">Không có bình luận nào!</h5> : comment.map((item) => {
                                          return (
                                            item.spam === true ? "" :
                                              <div className="spr-review"
                                                style={{ padding: '9px 0px 0px 20px', border: '1px solid', marginBottom: '17px' }}
                                                key={item.id}>
                                                <div className="spr-review-header">
                                                  <span className="spr-review-header-byline">
                                                    <strong>{item.name}</strong> -
                                                    <span>{getParsedDate(item.ngayBinhLuan)}</span>
                                                  </span>
                                                </div>
                                                <div className="spr-review-content">
                                                  <p className="spr-review-content-body">{item.noiDung}</p>
                                                </div>
                                              </div>
                                          )
                                        })}
                                      </div>
                                    </div>
                                    <Comment addOrEdit={Addcomment} idComment={id} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        <RelatedProducts />
                      </div>
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

export default DetailProduct;