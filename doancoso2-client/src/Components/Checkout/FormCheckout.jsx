import React, { useState, useEffect } from 'react';
import { useForm, Form } from '../../../src/hooks/useForm';
import { useSelector } from 'react-redux';

const initialFValues = {
    idKhach: 0,
    hoTen: '',
    sdt: '',
    diaChi: '',
    email: '',
    ghiChu: '',
    soLuong: 0,
    thanhTien: 0,
    idCheckout: 0,
    idSanPham: 0,
    tongHoaDon: 0,
    tongLuongSanPham: 0,
    checkoutProduct: [],
    tinh: '',
    huyen: '',
}

const FormCheckout = (props) => {
    const { addOrEdit, selectThanhPho } = props;
    const dataCart = JSON.parse(localStorage.getItem("cartItems"))
    const dataCarts = useSelector((state) => state.cart)
    const user = JSON.parse(localStorage.getItem("info_user"))

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if (user === null) {
            if ('hoTen' in fieldValues)
                temp.hoTen = fieldValues.hoTen ? "" : "This field is required."
            if ('sdt' in fieldValues)
                temp.sdt = fieldValues.sdt ? "" : "This field is required."
            if ('diaChi' in fieldValues)
                temp.diaChi = fieldValues.diaChi ? "" : "This field is required."
            if ('email' in fieldValues)
                temp.email = fieldValues.email ? "" : "This field is required."
        } else {
            if ('ghiChu' in fieldValues)
                temp.ghiChu = fieldValues.ghiChu ? "" : "This field is required."
        }
        setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const [currentTinh, setCurrentTinh] = useState('')
    const changeTinh = (newTinh) => {
        setCurrentTinh(newTinh)
    }

    const [currentHuyen, setCurrentHuyen] = useState('')
    const changeHuyen = (newHuyen) => {
        setCurrentHuyen(newHuyen)
    }
    const {
        values, setValues,
        errors, setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const map = [];
    for (const key in selectThanhPho) {
        if (selectThanhPho[key].name === currentTinh) {
            map.push(selectThanhPho[key].province)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            if (user === null) {
                const formDataCheckout = new FormData()
                formDataCheckout.append('idKhach', values.idKhach)
                formDataCheckout.append('hoTen', values.hoTen)
                formDataCheckout.append('diaChi', values.diaChi)
                formDataCheckout.append('ghiChu', values.ghiChu)
                formDataCheckout.append('sdt', values.sdt)
                formDataCheckout.append('email', values.email)
                formDataCheckout.append('tinh', currentTinh)
                formDataCheckout.append('huyen', currentHuyen)
                if (dataCart != null) {
                    for (const key of Object.keys(dataCart)) {
                        formDataCheckout.append('idSanPham', dataCart[key].id)
                        formDataCheckout.append('soLuong', dataCart[key].cartQuantity)
                        formDataCheckout.append('checkoutProduct', JSON.stringify(dataCart[key]))
                        if (dataCart[key].khuyenMaiNavigation.sale > 0) {
                            formDataCheckout.append('thanhTien', dataCart[key].giaKhuyenMai * dataCart[key].cartQuantity)
                        }
                        else {
                            formDataCheckout.append('thanhTien', dataCart[key].giaSP * dataCart[key].cartQuantity)
                        }
                    }
                } else {
                    formDataCheckout.append('idSanPham', dataCart[0].id)
                    formDataCheckout.append('soLuong', dataCart[0].cartQuantity)
                }
                formDataCheckout.append('tongHoaDon', [dataCarts.cartTotalAmount])
                formDataCheckout.append('tongLuongSanPham', [dataCarts.cartTotalQuantity])
                addOrEdit(formDataCheckout, resetForm);
            } else {
                const formDataCheckout = new FormData()
                formDataCheckout.append('idKhach', user.idKhach)
                formDataCheckout.append('hoTen', user.hoTen)
                formDataCheckout.append('diaChi', user.diaChi)
                formDataCheckout.append('ghiChu', values.ghiChu)
                formDataCheckout.append('sdt', user.sdt)
                formDataCheckout.append('email', user.email)
                if (dataCart != null) {
                    for (const key of Object.keys(dataCart)) {
                        formDataCheckout.append('idSanPham', dataCart[key].id)
                        formDataCheckout.append('soLuong', dataCart[key].cartQuantity)
                        formDataCheckout.append('checkoutProduct', JSON.stringify(dataCart[key]))
                    }
                } else {
                    formDataCheckout.append('idSanPham', dataCart[0].id)
                    formDataCheckout.append('soLuong', dataCart[0].cartQuantity)
                }
                formDataCheckout.append('tongHoaDon', [dataCarts.cartTotalAmount])
                formDataCheckout.append('tongLuongSanPham', [dataCarts.cartTotalQuantity]
                )
                addOrEdit(formDataCheckout, resetForm);
            }
        }
    }


    return (
        <form id="customer-form" onSubmit={handleSubmit} className="js-customer-form" >
            {
                user === null ?
                    <div>
                        <input type="hidden" name="id_customer" defaultValue />
                        <div className="form-group row">
                            <input
                                className="form-control"
                                name="hoTen" type="text"
                                placeholder="Nhập họ và tên"
                                value={values.hoTen}
                                onChange={handleInputChange}
                                error={errors.hoTen}
                            />
                        </div>
                        <div className="form-group row">
                            <input
                                className="form-control"
                                name="sdt" type="text"
                                placeholder="Nhập Số điện thoại"
                                value={values.sdt}
                                onChange={handleInputChange}
                                error={errors.sdt}
                            />
                        </div>
                        <div className="form-group row">
                            <input
                                className="form-control"
                                name="email" type="text"
                                placeholder="Nhập địa chỉ email"
                                value={values.email}
                                onChange={handleInputChange}
                                error={errors.email}
                            />
                        </div>
                        <div className="form-group row">
                            <input
                                className="form-control"
                                name="diaChi" type="text"
                                placeholder="Nhập địa chỉ nhà, đường, hẻm"
                                value={values.diaChi}
                                onChange={handleInputChange}
                                error={errors.diaChi}
                            />
                        </div>
                        <div className="form-group row">
                            <div className="col-md-6 pl-0">
                                <select className="custom-select"
                                    onChange={(event) => changeTinh(event.target.value)}
                                    value={currentTinh}
                                    name="tinh"
                                    placeholder="Tỉnh / Thành phố">
                                    {
                                        selectThanhPho.map((item) => {
                                            return (
                                                <option selected value={item.name}>
                                                    {item.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-6 pr-0">
                                <select className="custom-select"
                                    onChange={(event) => changeHuyen(event.target.value)}
                                    name="huyen"
                                    value={currentHuyen}
                                    placeholder="Quận / Huyện">
                                    {
                                        currentTinh === '' ? '' :
                                            map[0].map((item) => {
                                                return (
                                                    <option value={item.Name}>
                                                        {item.Name}
                                                    </option>
                                                )
                                            })
                                    }
                                </select>
                            </div>
                        </div>
                        <textarea
                            className="form-control"
                            name="ghiChu" type="text"
                            placeholder="Nhập địa chỉ"
                            value={values.ghiChu}
                            onChange={handleInputChange}
                            error={errors.ghiChu}
                            placeholder="Nhập ghi chú"
                            style={{ width: '570px', marginLeft: '-16px' }}
                            rows={5}
                        />
                    </div> :
                    <textarea
                        className="form-control"
                        name="ghiChu" type="text"
                        placeholder="Nhập địa chỉ"
                        value={values.ghiChu}
                        onChange={handleInputChange}
                        error={errors.ghiChu}
                        placeholder="Nhập ghi chú"
                        style={{ width: '570px', marginLeft: '-16px' }}
                        rows={5}
                    />
            }

            <div className="clearfix">
                <div className="row">
                    <input type="hidden" name="submitCreate" />
                    <button className="continue btn btn-primary pull-xs-right" name="Đặt hàng" type="submit">
                        Đặt hàng
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormCheckout;