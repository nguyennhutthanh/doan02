import React from 'react';
import FormContact from './FormContact';
import { createAPI, MapAPI } from "../../../src/api/index";
import { toast } from "react-toastify";

const Contact = () => {

  const Contact = (FormContact, resetForm) => {
    createAPI(MapAPI.CONTACT).create(FormContact)
      .then(res => {
        toast.success(`Liên hệ thành công`, {
          position: "top-right",
        });
      }).catch(err => console.log(err))
    resetForm();
  }

  return (
    <div id="contact" className="blog">
      <div className="main-content">
        <div id="wrapper-site">
          <div id="content-wrapper">
            <div id="main">
              <div className="page-home" style={{ maxWidth: '95%', margin: '0 auto', marginTop: '141px' }}>
                <div className="container">
                  <div className="row-inhert">
                    <div className="header-contact">
                      <div className="row">
                        <div className="col-xs-12 col-sm-4 col-md-4">
                          <div className="item d-flex">
                            <div className="item-left">
                              <div className="icon">
                                <i className="zmdi zmdi-email" />
                              </div>
                            </div>
                            <div className="item-right d-flex">
                              <div className="title">Email:</div>
                              <div className="contact-content">
                                <a href="mailto:support@domain.com">thanhnguyendt2000@gmail.com</a>
                                <br />
                                <a href="mailto:contact@domain.com">boolap19@gmail.com</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4">
                          <div className="item d-flex">
                            <div className="item-left">
                              <div className="icon">
                                <i className="zmdi zmdi-home" />
                              </div>
                            </div>
                            <div className="item-right d-flex">
                              <div className="title">Địa chỉ:</div>
                              <div className="contact-content">
                                123 Nguyễn văn trường, Phường an bình
                                <br />Quận ninh kiều, Thành phố cần thơ
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-md-4">
                          <div className="item d-flex justify-content-end  last">
                            <div className="item-left">
                              <div className="icon">
                                <i className="zmdi zmdi-phone" />
                              </div>
                            </div>
                            <div className="item-right d-flex">
                              <div className="title">Liên hệ:</div>
                              <div className="contact-content">
                                0123-456-78910
                                <br />0987-654-32100
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="contact-map">
                      <div id="map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.996286386055!2d105.72304103732426!3d10.017164328154678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a088fce82e2211%3A0xae8e7241c20f0569!2zMTIzIE5ndXnhu4VuIFbEg24gVHLGsOG7nW5nLCBMb25nIFR1eeG7gW4sIE5pbmggS2nhu4F1LCBD4bqnbiBUaMahLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1637151712260!5m2!1svi!2s" allowfullscreen loading="lazy"></iframe>
                      </div>
                    </div>
                    <div className="input-contact">
                      <p className="text-intro text-center">“Bạn cần gì ở chung tôi, nếu bạn có thắc mắc hay thiếu nại gì xin mời bạn hãy liên hệ với chúng tôi bằng cách gữi tin dưới đây.”
                      </p>
                      <p className="icon text-center">
                        <a href="#">
                          <img src="img/other/contact_mess.png" alt="img" />
                        </a>
                      </p>
                      <div className="d-flex justify-content-center">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                          <div className="contact-form">
                            <FormContact Contact={Contact} />
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
    </div>
  );
};

export default Contact;