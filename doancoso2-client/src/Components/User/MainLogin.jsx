import React, { useState, useEffect } from 'react'
import Login from './Login';
import { createAPI, MapAPI } from "../../api/index";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { setUserAccount } from '../../redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';

const MainLogin = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const UserLogin = (FormUser) => {
        createAPI(MapAPI.USERACCOUNT + "/SignInUser").create(FormUser)
            .then(res => {
                toast.success(`Đăng nhập thành công`, {
                    position: "top-right",
                });
                localStorage.setItem("info_user", JSON.stringify(res.data));
                dispatch(setUserAccount(res.data));
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        if (localStorage.getItem('info_user')) {
            history.push("/")
        }
    }, [])

    return (
        <div className="user-login blog">
            <div className="main-content">
                <div className="wrap-banner">
                </div>
                {/* main */}
                <div id="wrapper-site">
                    <div id="content-wrapper" className="full-width">
                        <div id="main">
                            <div className="container" style={{ maxWidth: '95%', margin: '0 auto', marginTop: '141px' }}>
                                <h1 className="text-center title-page">Đăng nhập</h1>
                                <div className="login-form">
                                    <Login UserLogin={UserLogin} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MainLogin;