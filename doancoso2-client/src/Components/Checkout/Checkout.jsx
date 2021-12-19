import React, { useState, useEffect } from 'react'
import FormCheckout from './FormCheckout';
import { createAPI, MapAPI } from "../../../src/api/index";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { formatNumber } from '../../Common/index';
import { useHistory } from "react-router-dom";
import Login from '../User/Login';
import { setUserAccount } from '../../redux/actions/productActions';
import axios from 'axios';
import PaypalCheckout from './PaypalCheckout';

const Checkout = () => {
  const [checkout, setCheckout] = useState([])
  const dataCart = JSON.parse(localStorage.getItem("cartItems"))
  const state = useSelector((state) => state.cart.cartItems);
  const cart = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem("info_user"))

  const [tinhThanhPho, settinhThanhPho] = useState([])

  const listtinhthanh = async () => {
    const response = await axios.get("https://localhost:44336/ApiTinhThanhPho/data.json").catch(err => console.error(err));
    let listTinh = response.data.map(item => ({
      id: item.Id,
      name: item.Name,
      province: item.Districts
    }));
    settinhThanhPho(listTinh);
  }

  useEffect(() => {
    listtinhthanh();
  }, []);

  let history = useHistory();

  const dispatch = useDispatch();

  const { cartTotalAmount, cartTotalQuantity } = cart;

  const CheckoutMap = (formDataCheckout, resetForm) => {
    // chưa đăng nhập
    if (user === null) {
      if (formDataCheckout.get('idKhach') == 0)
        createAPI(MapAPI.CHECKOUT + "/CheckoutNotAccount").create(formDataCheckout)
          .then(res => {
            toast.success(`đặt hàng thành công`, {
              position: "top-right",
            });
            console.log("data: ", formDataCheckout);
          }).catch(err => console.log(err))
      history.push("/Success");
      resetForm()
    }
    else {
      createAPI(MapAPI.CHECKOUT + "/CheckoutAccount").create(formDataCheckout)
        .then(res => {
          toast.success(`đặt hàng thành công`, {
            position: "top-right",
          });
          console.log("data: ", formDataCheckout);
        }).catch(err => console.log(err))
      history.push("/Success");
      resetForm()
    }
  }

  const payCheckout = (formDataPaypal) => {
    createAPI(MapAPI.CHECKOUT + "/CheckoutAccount").create(formDataPaypal)
      .then(res => {
        toast.success(`Thanh toán thành công`, {
          position: "top-right",
        });
        console.log("data: ", formDataPaypal);
      }).catch(err => console.log(err))
    history.push("/Success");
  }

  const UserLogin = (FormUser) => {
    createAPI(MapAPI.USERACCOUNT + "/SignInUser").create(FormUser)
      .then(res => {
        toast.success(`Đăng nhập thành công`, {
          position: "top-right",
        });
        localStorage.setItem("info_user", JSON.stringify(res.data));
        dispatch(setUserAccount(res.data));
        history.push("/Checkout")
      }).catch(err => console.log(err))
  }

  return (
    <div className="product-checkout checkout-cart">
      <div id="checkout" className="main-content">
        <div className="wrap-banner">
          {/* main */}
          <div id="wrapper-site">
            <div className="container" style={{ maxWidth: '90%', margin: '0 auto', marginTop: '70px' }}>
              <div className="row">
                <div id="content-wrapper" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 onecol">
                  <div id="main">
                    <div className="cart-grid row">
                      <div className="col-md-9 check-info">
                        <div className="checkout-personal-step">
                          <h3 className="step-title h3 info">
                            <span className="step-number">1</span>Thông tin cá nhân
                          </h3>
                        </div>
                        <div className="content">
                          <ul className="nav nav-inline">
                            <li className="nav-item">
                              <a className="nav-link active" data-toggle="tab" href="#checkout-guest-form">
                                Đặt hàng như khách
                              </a>
                            </li>
                            {user === null ? <li className="nav-item">
                              <a className="nav-link" data-toggle="tab" href="#checkout-login-form">
                                Đăng nhập
                              </a>
                            </li> : ""}
                            <li className="nav-item">
                              <a className="nav-link" data-toggle="tab" href="#checkoutpaypal">
                                Thanh toán trưc tuyến
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content" style={{ marginTop: '0px' }}>
                            <div className="tab-pane fade in active show" id="checkout-guest-form" role="tabpanel">
                              <FormCheckout addOrEdit={CheckoutMap} selectThanhPho={tinhThanhPho} />
                            </div>
                            <div className="tab-pane fade" id="checkout-login-form" role="tabpanel">
                              <Login UserLogin={UserLogin} />
                            </div>
                            {/* thánh toán paylal */}
                            <PaypalCheckout cartTotalAmount={cartTotalAmount}
                              addOrEdit={payCheckout} />
                            {/* thánh toán paylal */}
                          </div>
                        </div>
                      </div>
                      <div className="cart-grid-right col-xs-12 col-lg-3">
                        <div className="cart-summary"
                          style={{ borderRadius: '6px' }}
                        >
                          <div className="cart-detailed-totals">
                            <div className="cart-summary-products">
                              <div className="summary-label text-center">Có {state.length} sản phẩm trong giỏ hàng</div>
                            </div>
                            <div className="cart-summary-line" id="cart-subtotal-products">
                              <span className="label js-subtotal">
                                Tổng đơn :
                              </span>
                              <span className="value"> {formatNumber(cartTotalAmount)} VNĐ</span>
                            </div>
                            <div className="cart-summary-line" id="cart-subtotal-shipping">
                              <span className="label">
                                Số lượng sản phẩm :
                              </span>
                              <span className="value">{cartTotalQuantity}</span>
                              <div>
                                <small className="value" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="block-reassurance"
                          style={{
                            borderRadius: '6px', marginTop: '15px'
                          }}>
                          <ul>
                            <li>
                              <div className="block-reassurance-item">
                                <img src="img/product/check1.png" alt="Security policy (edit with Customer reassurance module)" />
                                <span>Chính sách bảo mật (đóng gói cẩn thận có niêm phong của shop)</span>
                              </div>
                            </li>
                            <li>
                              <div className="block-reassurance-item">
                                <img src="img/product/check2.png" alt="Delivery policy (edit with Customer reassurance module)" />
                                <span>Chính sách giao hàng (giao hàng tận nơi, phục vụ tận tình)</span>
                              </div>
                            </li>
                            <li>
                              <div className="block-reassurance-item">
                                <img src="img/product/check3.png" alt="Return policy (edit with Customer reassurance module)" />
                                <span>Chính sách hoàn trả (không vừa ý hoặc do lỗi của nhà sản phẩm 1 đổi 1)</span>
                              </div>
                            </li>
                          </ul>
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

    </div>
  );
};

export default Checkout;