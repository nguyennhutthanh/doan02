import React from 'react';
import { Link } from 'react-router-dom';
import AddressMap from './AddressMap';

function Footer() {
    return (
        <div>
            {/* footer */}
            <footer className="footer-one" style={{ clear: 'both', position: 'relative' }}>
                <div className="inner-footer">
                    <div className="container" style={{ width: '90%', margin: '0 auto' }}>
                        <div className="footer-top col-lg-12 col-xs-12">
                            <div className="row">
                                <div className="tiva-html col-lg-4 col-md-12 col-xs-12">
                                    <div className="block">
                                        <div className="block-content">
                                            <p className="logo-footer">
                                                <img src="img/home/logo.png" className="w-75"
                                                    style={{ marginBottom: '-20px', marginLeft: '-26px' }}
                                                    alt="img" />
                                            </p>
                                            <p className="content-logo">Điều hiển nhiên đã đến thể hiện cao đàn ông đã làm cậu bé. Toàn bộ tình nhân hợp lý. Nhanh chóng có thể trang viên thông minh mon hy vọng giá trị. Sự tò mò có thể kết thúc không biết xấu hổ giải thích.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="block">
                                        <div className="block-content">
                                            <ul>
                                                <li>
                                                    <Link to="/About" >Giới thiệu</Link>
                                                </li>
                                                <li>
                                                    <Link to="/Product" >Sản phẩm</Link>
                                                </li>
                                                <li>
                                                    <Link to="/Contact" >Sản phẩm</Link>
                                                </li>
                                                <li>
                                                    <Link to="/" >Trảng chủ</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="block">
                                        <div className="block-content">
                                            <p className="img-payment ">
                                                <img className="img-fluid" src="img/home/payment-footer.png" alt="img" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tiva-html col-lg-4 col-md-6">
                                    <div className="block m-top">
                                        <div className="title-block">
                                            Liên hệ
                                        </div>
                                        <div className="block-content">
                                            <div className="contact-us">
                                                <div className="title-content">
                                                    <i className="fa fa-home" aria-hidden="true" />
                                                    <span>Địa chỉ :</span>
                                                </div>
                                                <div className="content-contact address-contact">
                                                    <p>123 Nguyễn văn trường, Phường an bình Quận ninh kiều, Thành phố cần thơ</p>
                                                </div>
                                            </div>
                                            <div className="contact-us">
                                                <div className="title-content">
                                                    <i className="fa fa-envelope" aria-hidden="true" />
                                                    <span>Email :</span>
                                                </div>
                                                <div className="content-contact mail-contact">
                                                    <p>boolap19@gmail.com</p>
                                                </div>
                                            </div>
                                            <div className="contact-us">
                                                <div className="title-content">
                                                    <i className="fa fa-phone" aria-hidden="true" />
                                                    <span>Số điện thoại :</span>
                                                </div>
                                                <div className="content-contact phone-contact">
                                                    <p>+0123-456-78910</p>
                                                </div>
                                            </div>
                                            <div className="contact-us">
                                                <div className="title-content">
                                                    <i className="fa fa-clock-o" aria-hidden="true" />
                                                    <span>Thời gian mở cửa :</span>
                                                </div>
                                                <div className="content-contact hours-contact">
                                                    <p>Thứ 2 - Chủ nhật / 08.00AM - 19.00</p>
                                                    <span>(Trừ ngày lễ)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tiva-modules col-lg-4 col-md-6">
                                    <div className="block m-top">
                                        <div className="block-content">
                                            <div className="title-block">Bản tin</div>
                                            <div className="sub-title">Hãy theo đỗi shop chúng tôi quá mạng xã hội Facebook để cập nhật những món hàng mới nhất.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="block m-top1">
                                        <div className="block-content">
                                            <div className="social-content">
                                                <div className="title-block">
                                                    THEO DÕI CHÚNG TÔI TẠI
                                                </div>
                                                <div id="social-block">
                                                    <div className="social">
                                                        <ul className="list-inline mb-0 justify-content-end">
                                                            <li className="list-inline-item mb-0">
                                                                <a href="#" target="_blank">
                                                                    <i className="fa fa-facebook" />
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item mb-0">
                                                                <a href="#" target="_blank">
                                                                    <i className="fa fa-twitter" />
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item mb-0">
                                                                <a href="#" target="_blank">
                                                                    <i className="fa fa-google" />
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item mb-0">
                                                                <a href="#" target="_blank">
                                                                    <i className="fa fa-instagram" />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="block m-top1">
                                        <div className="block-content">
                                            <div className="payment-content">
                                                <div className="title-block">
                                                    Chấp nhận thanh toán
                                                </div>
                                                <div className="payment-image">
                                                    <img className="img-fluid" src="img/home/payment.png" alt="img" />
                                                </div>
                                            </div>
                                            {/* Popup newsletter */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div>
                <ul className="giuseart-pc-contact-bar">
                    <li className="facebook2">
                        <a href="https://www.facebook.com/profile.php?id=100068587655163" target="_blank" rel="nofollow" />
                    </li>
                    <li className="map">
                        <a type="button" data-toggle="modal" data-target="#exampleModalCenter" target="_blank" rel="nofollow" />
                    </li>
                    <li className="facebook">
                        <a href="https://m.me/100068587655163" target="_blank" rel="nofollow" />
                    </li>
                    <li className="zalo mb-2">
                        <a href="https://zalo.me/0856059125" target="_blank" rel="nofollow" />
                    </li>
                    <li className="hotline">
                        <a href="tel:0856059125" target="_blank" rel="nofollow"
                            className="tooltip-test" title="Liên hệ: 0856059125" />
                    </li>
                </ul>
                <ul className="giuseart-mobile-contact-bar">
                    <li className="facebook2">
                        <a href="https://www.facebook.com/profile.php?id=100068587655163" target="_blank" rel="nofollow" />
                    </li>
                    <li className="map">
                        <a href="https://m.me/100068587655163" target="_blank" rel="nofollow" />
                    </li>
                    <li className="facebook">
                        <a href="https://m.me/100068587655163" target="_blank" rel="nofollow" />
                    </li>
                    <li className="zalo">
                        <a href="https://zalo.me/0856059125" target="_blank" rel="nofollow" />
                    </li>
                    <li className="hotline">
                        <a href="tel:0856059125" target="_blank" rel="nofollow" className="tooltip-test" title="Liên hệ: 0856059125" />
                    </li>
                </ul>
            </div>
            <AddressMap />
            {/* back top top */}
            <div className="back-to-top mb-5">
                <a href="#">
                    <i className="fa fa-long-arrow-up" />
                </a>
            </div>

            {/* menu mobie left */}
            <div className="mobile-top-menu d-md-none">
                <button type="button" className="close" aria-label="Close">
                    <i className="zmdi zmdi-close" />
                </button>
                <div className="tiva-verticalmenu block" data-count_showmore={17}>
                    <div className="box-content block-content">
                        <div className="verticalmenu" role="navigation">
                            <ul className="menu level1">
                                <li className="item  parent">
                                    <a href="#" className="hasicon" title="SIDE TABLE">
                                        <img src="img/home/table-lamp.png" alt="img" />SIDE TABLE</a>
                                    <span className="arrow collapsed" data-toggle="collapse" data-target="#SIDE-TABLE" aria-expanded="false" role="status">
                                        <i className="zmdi zmdi-minus" />
                                        <i className="zmdi zmdi-plus" />
                                    </span>
                                    <div className="subCategory collapse" id="SIDE-TABLE" aria-expanded="true" role="status">
                                        <div className="menu-items">
                                            <ul>
                                                <li className="item">
                                                    <a href="#" title="Aliquam lobortis">Aliquam lobortis</a>
                                                </li>
                                                <li className="item  parent-submenu">
                                                    <a href="#" title="Duis Reprehenderit">Duis Reprehenderit</a>
                                                    <span className="arrow collapsed" data-toggle="collapse" data-target="#sub-Category" aria-expanded="false" role="status">
                                                        <i className="zmdi zmdi-minus" />
                                                        <i className="zmdi zmdi-plus" />
                                                    </span>
                                                    <div className="subCategory collapse" id="sub-Category" aria-expanded="true" role="status">
                                                        <div className="menu-items">
                                                            <ul>
                                                                <li className="item">
                                                                    <a href="#" title="Aliquam lobortis">Aliquam lobortis</a>
                                                                </li>
                                                                <li className="item">
                                                                    <a href="#" title="Duis Reprehenderit">Duis Reprehenderit</a>
                                                                </li>
                                                                <li className="item">
                                                                    <a href="#" title="Voluptate">Voluptate</a>
                                                                </li>
                                                                <li className="item">
                                                                    <a href="#" title="Tongue Est">Tongue Est</a>
                                                                </li>
                                                                <li className="item">
                                                                    <a href="#" title="Venison Andouille">Venison Andouille</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="item">
                                                    <a href="#" title="Voluptate">Voluptate</a>
                                                </li>
                                                <li className="item">
                                                    <a href="#" title="Tongue Est">Tongue Est</a>
                                                </li>
                                                <li className="item">
                                                    <a href="#" title="Venison Andouille">Venison Andouille</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className="item  parent group">
                                    <a href="#" className="hasicon" title="FI">
                                        <img src="img/home/fireplace.png" alt="img" />FIREPLACE
                                    </a>
                                    <span className="arrow collapsed" data-toggle="collapse" data-target="#fi" aria-expanded="false" role="status">
                                        <i className="zmdi zmdi-minus" />
                                        <i className="zmdi zmdi-plus" />
                                    </span>
                                    <div className="subCategory collapse" id="fi" aria-expanded="true" role="status">
                                        <div className="item">
                                            <div className="menu-content">
                                                <div className="tags d-flex d-xs-flex-inherit">
                                                    <div className="title">
                                                        <b>DINNING ROOM</b>
                                                    </div>
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <a href="#">Toshiba</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Samsung</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">LG</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Sharp</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Electrolux</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Hitachi</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Panasonic</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Mitsubishi Electric</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Daikin</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Haier</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="tags d-flex d-xs-flex-inherit">
                                                    <div className="title">
                                                        <b>BATHROOM</b>
                                                    </div>
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <a href="#">Toshiba</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Samsung</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">LG</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Sharp</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Electrolux</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Hitachi</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Panasonic</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Mitsubishi Electric</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Daikin</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Haier Media</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Gee</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Digimart</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Vitivaa</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Sanaky</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Sunshine</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="tags d-flex d-xs-flex-inherit">
                                                    <div className="title">
                                                        <b>LIVING ROOM</b>
                                                    </div>
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <a href="#">Media</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Gee</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Digimart</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Vitivaa</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Sanaky</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Sunshine</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Toshiba</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Samsung</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">LG</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Sharp</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Electrolux</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Hitachi</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Panasonic</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Mitsubishi Electric</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Daikin</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Haier</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="tags d-flex d-xs-flex-inherit">
                                                    <div className="title">
                                                        <b>BEDROOM</b>
                                                    </div>
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <a href="#">LG</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Sharp</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Electrolux</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Hitachi</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Panasonic</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Mitsubishi Electric</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Daikin</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Haier</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="tags d-flex d-xs-flex-inherit">
                                                    <div className="title">
                                                        <b>KITCHEN</b>
                                                    </div>
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <a href="#">LG</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Sharp</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Electrolux</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Hitachi</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Panasonic</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Mitsubishi Electric</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Daikin</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Haier</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="tags d-flex d-xs-flex-inherit">
                                                    <div className="title">
                                                        <b>Blender</b>
                                                    </div>
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                            <a href="#">LG</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Sharp</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Electrolux</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Hitachi</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Panasonic</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Mitsubishi Electric</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Daikin</a>
                                                        </li>
                                                        <li className="list-inline-item">
                                                            <a href="#">Haier</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="item group-category-img parent group">
                                    <a href="#" className="hasicon" title="TABLE LAMP">
                                        <img src="img/home/table-lamp.png" alt="img" />TABLE LAMP</a>
                                    <span className="arrow collapsed" data-toggle="collapse" data-target="#table-lamp" aria-expanded="false" role="status">
                                        <i className="zmdi zmdi-minus" />
                                        <i className="zmdi zmdi-plus" />
                                    </span>
                                    <div className="subCategory collapse" id="table-lamp" aria-expanded="true" role="status">
                                        <div className="item">
                                            <div className="menu-content">
                                                <div className="col-xs-12">
                                                    <span className="menu-title">Coventry dining</span>
                                                    <ul>
                                                        <li>
                                                            <a href="#">Accessories</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Activewear</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">ASOS Basic Tops</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Bags &amp; Purses</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Beauty</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Coats &amp; Jackets</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Curve &amp; Plus Size</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-xs-12">
                                                    <span className="menu-title">Amara stools</span>
                                                    <ul>
                                                        <li>
                                                            <a href="#">Accessories</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Activewear</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">ASOS Basic Tops</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Bags &amp; Purses</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Beauty</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Coats &amp; Jackets</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Curve &amp; Plus Size</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-xs-12">
                                                    <span className="menu-title">Kingston dining</span>
                                                    <ul>
                                                        <li>
                                                            <a href="#">Accessories</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Activewear</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">ASOS Basic Tops</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Bags &amp; Purses</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Beauty</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Coats &amp; Jackets</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Curve &amp; Plus Size</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-xs-12">
                                                    <span className="menu-title">Ellinger dining</span>
                                                    <ul>
                                                        <li>
                                                            <a href="#">Accessories</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Activewear</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">ASOS Basic Tops</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Bags &amp; Purses</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Beauty</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Coats &amp; Jackets</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Curve &amp; Plus Size</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="OTTOMAN">
                                        <img src="img/home/ottoman.png" alt="img" />OTTOMAN
                                    </a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="ARMCHAIR">
                                        <img src="img/home/armchair.png" alt="img" />ARMCHAIR
                                    </a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="CUSHION">
                                        <img src="img/home/cushion.png" alt="img" />CUSHION
                                    </a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="COFFEE TABLE">
                                        <img src="img/home/coffee_table.png" alt="img" />COFFEE TABLE</a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="SHELF">
                                        <img src="img/home/shelf.png" alt="img" />SHELF
                                    </a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="SOFA">
                                        <img src="img/home/sofa.png" alt="img" />SOFA
                                    </a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="DRESSING TABLE">
                                        <img src="img/home/dressing.png" alt="img" />DRESSING TABLE</a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="WINDOWN CURTAIN">
                                        <img src="img/home/windown.png" alt="img" />WINDOWN CURTAIN</a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="CHANDELIER">
                                        <img src="img/home/chandelier.png" alt="img" />CHANDELIER
                                    </a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="CEILING FAN">
                                        <img src="img/home/ceiling_fan.png" alt="img" />CEILING FAN</a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="WARDROBE">
                                        <img src="img/home/wardrobe.png" alt="img" />WARDROBE
                                    </a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="FLOOR LAMP">
                                        <img src="img/home/floor_lamp.png" alt="img" />FLOOR LAMP</a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="VASE-FLOWER ">
                                        <img src="img/home/vase-flower.png" alt="img" />VASE-FLOWER
                                    </a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="BED">
                                        <img src="img/home/bed.png" alt="img" />BED
                                    </a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="BED GIRL">
                                        <img src="img/home/bed.png" alt="img" />BED GIRL</a>
                                </li>
                                <li className="item">
                                    <a href="#" className="hasicon" title="BED BOY">
                                        <img src="img/home/bed.png" alt="img" />BED BOY</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* menu mobie right */}
            <div id="mobile-pagemenu" className="mobile-boxpage d-flex hidden-md-up active d-md-none">
                <div className="content-boxpage col">
                    <div className="box-header d-flex justify-content-between align-items-center">
                        <div className="title-box">Menu</div>
                        <div className="close-box">Close</div>
                    </div>
                    <div className="box-content">
                        <nav>
                            {/* Brand and toggle get grouped for better mobile display */}
                            <div id="megamenu" className="clearfix">
                                <ul className="menu level1">
                                    <li className="item home-page has-sub">
                                        <span className="arrow collapsed" data-toggle="collapse" data-target="#home1" aria-expanded="true" role="status">
                                            <i className="zmdi zmdi-minus" />
                                            <i className="zmdi zmdi-plus" />
                                        </span>
                                        <a href="index-2.html" title="Home">
                                            <i className="fa fa-home" aria-hidden="true" />Home</a>
                                        <div className="subCategory collapse" id="home1" aria-expanded="true" role="status">
                                            <ul>
                                                <li className="item">
                                                    <a href="index-2.html" title="Home Page 1">Home Page 1</a>
                                                </li>
                                                <li className="item">
                                                    <a href="home2.html" title="Home Page 2">Home Page 2</a>
                                                </li>
                                                <li className="item">
                                                    <a href="home3.html" title="Home Page 3">Home Page 3</a>
                                                </li>
                                                <li className="item">
                                                    <a href="home4.html" title="Home Page 4">Home Page 4</a>
                                                </li>
                                                <li className="item">
                                                    <a href="home5.html" title="Home Page 5">Home Page 5</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="item has-sub">
                                        <span className="arrow collapsed" data-toggle="collapse" data-target="#blog" aria-expanded="false" role="status">
                                            <i className="zmdi zmdi-minus" />
                                            <i className="zmdi zmdi-plus" />
                                        </span>
                                        <a href="#" title="Blog">
                                            <i className="fa fa-address-book" aria-hidden="true" />Blog</a>
                                        <div className="subCategory collapse" id="blog" aria-expanded="true" role="status">
                                            <ul>
                                                <li className="item">
                                                    <a href="blog-list-sidebar-left.html" title="Blog List (Sidebar Left)">Blog List
                                                        (Sidebar Left)</a>
                                                </li>
                                                <li className="item">
                                                    <a href="blog-list-sidebar-left2.html" title="Blog List (Sidebar Left) 2">Blog List
                                                        (Sidebar Left) 2</a>
                                                </li>
                                                <li className="item">
                                                    <a href="blog-list-sidebar-right.html" title="Category Blog (Right column)">Blog List
                                                        (Sidebar Right)</a>
                                                </li>
                                                <li className="item">
                                                    <a href="blog-list-no-sidebar.html" title="Blog List (No Sidebar)">Blog List (No
                                                        Sidebar)</a>
                                                </li>
                                                <li className="item">
                                                    <a href="blog-grid-no-sidebar.html" title="Blog Grid (No Sidebar)">Blog Grid (No
                                                        Sidebar)</a>
                                                </li>
                                                <li className="item">
                                                    <a href="blog-detail.html" title="Blog Detail">Blog Detail</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="item group has-sub">
                                        <span className="arrow collapsed" data-toggle="collapse" data-target="#page" aria-expanded="false" role="status">
                                            <i className="zmdi zmdi-minus" />
                                            <i className="zmdi zmdi-plus" />
                                        </span>
                                        <a href="#" title="Page">
                                            <i className="fa fa-file-text-o" aria-hidden="true" />page</a>
                                        <div className="subCategory collapse" id="page" aria-expanded="true" role="status">
                                            <ul className="group-page">
                                                <li className="item container group">
                                                    <div>
                                                        <ul>
                                                            <li className="item col-md-4 ">
                                                                <span className="menu-title">Category Style</span>
                                                                <div className="menu-content">
                                                                    <ul className="col">
                                                                        <li>
                                                                            <a href="product-grid-sidebar-left.html">Product Grid (Sidebar
                                                                                Left)</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="product-grid-sidebar-right.html">Product Grid (Sidebar
                                                                                Right)</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="product-list-sidebar-left.html">Product List (Sidebar Left)
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                            <li className="item col-md-4 html">
                                                                <span className="menu-title">Product Detail Style</span>
                                                                <div className="menu-content">
                                                                    <ul>
                                                                        <li>
                                                                            <a href="product-detail.html">Product Detail (Sidebar Left)</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">Product Detail (Sidebar Right)</a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                            <li className="item col-md-4 html">
                                                                <span className="menu-title">Bonus Page</span>
                                                                <div className="menu-content">
                                                                    <ul>
                                                                        <li>
                                                                            <a href="404.html">404 Page</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="about-us.html">About Us Page</a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="item has-sub">
                                        <a href="contact.html" title="Contact us">
                                            <i className="fa fa-map-marker" aria-hidden="true" />Contact us</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Page Loader */}
            <div id="page-preloader">
                <div className="page-loading">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
            </div>
        </div>
    )
}

export default Footer;