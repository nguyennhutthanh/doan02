import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Common/Logo';

const SuccessCheckout = () => {
    return (
        <div id="page-404" className="blog">
            <div className="main-content">
                <div id="wrapper-site">
                    <div id="content-wrapper">
                        <section className="page-home"
                            style={{ marginTop: '145px', marginBottom: '-20px' }}>
                            <div className="container">
                                <div className="text-center">
                                    <Logo />
                                </div>
                                <div className="row center"
                                    style={{ height: '330px', marginTop: '-33px', marginBottom: '31px' }}
                                >
                                    <div className="content-404 col-lg-12 col-sm-12 text-center">
                                        <h2 className="h4">Cảm ơn bạn đã tin tưởng và mua sẳm ở shop chúng tôi</h2>
                                        <div className="info">
                                            <p>Chúng tôi thực sự biết ơn bạn vì đã chọn chúng tôi làm nhà cung cấp dịch vụ và cho chúng tôi cơ hội phát triển. Không có thành tựu nào của chúng tôi có thể đạt được nếu không có bạn và sự hỗ trợ vững chắc của bạn.</p>
                                        </div>
                                        <Link to="/" className="btn btn-default" href="index-2.html">
                                            <i className="fa fa-home" aria-hidden="true" />
                                            <span>Về trang chủ</span>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SuccessCheckout;