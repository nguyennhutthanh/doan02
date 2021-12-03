import React from 'react';
import { Link } from 'react-router-dom';
const Erro404 = () => {
  return (
    <div id="page-404" className="blog">
      <div className="main-content">
        <div id="wrapper-site">
          <div id="content-wrapper">
            <section className="page-home"
              style={{ marginTop: '145px', marginBottom: '-20px' }}>
              <div className="container">
                <div className="row center">
                  <div className="content-404 col-lg-6 col-sm-6 text-center">
                    <div className="image">
                      <img className="img-fluid" src="img/other/image-404.png" alt="Image 404" />
                    </div>
                    <h2 className="h4">Chúng tôi xin lỗi - đã xảy ra sự cố với phía chúng tôi.</h2>
                    <div className="info">
                      <p>Nếu khó khăn vẫn tiếp diễn, vui lòng liên hệ với Quản trị viên hệ thống của trang web này và báo cáo
                        lỗi bên dưới.</p>
                    </div>
                    <Link to="/" className="btn btn-default" >
                      <i className="fa fa-home" aria-hidden="true" />
                      <span>Về trang chủ</span>
                    </Link>
                  </div>
                  <div className="content-right-404 col-lg-6 col-sm-6 text-center">
                    <a href="#">
                      <img className="img-fluid" src="img/other/background.jpg" alt="image 404 right" />
                    </a>
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

export default Erro404;