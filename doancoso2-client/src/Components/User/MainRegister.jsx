import React, { useState, useEffect } from 'react'
import Register from './Register';
import { createAPI, MapAPI } from "../../api/index";
import { toast } from "react-toastify";

const MainRegister = () => {
    const AddUser = (FormUser, resetForm) => {
        if (FormUser.get('idKhach') == 0)
            createAPI(MapAPI.USERACCOUNT + "/SignUpUser").create(FormUser)
                .then(res => {
                    toast.success(`Tạo tài khoản thành công`, {
                        position: "top-right",
                    });
                    console.log("data: ", res.data);
                    localStorage.setItem('info_user', JSON.stringify(res.data));
                }).catch(err => console.log(err)
                )
        resetForm()
    }

    return (
        <div className="user-register blog">
            <div className="main-content">
                <div className="wrap-banner">
                </div>
                <div id="wrapper-site">
                    <div className="container" style={{ maxWidth: '95%', margin: '0 auto', marginTop: '80px' }}>
                        <div className="row">
                            <div id="content-wrapper" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 onecol">
                                <div id="main">
                                    <div id="content" className="page-content">
                                        <div className="register-form text-center">
                                            <h1 className="text-center title-page">Tạo tài khoản</h1>
                                            <Register AddUser={AddUser} />
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

export default MainRegister;