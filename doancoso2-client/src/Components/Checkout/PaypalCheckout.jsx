import React, { useState, useEffect } from 'react';
import { useForm, Form } from '../../../src/hooks/useForm';
import { useSelector } from 'react-redux';
import { PayPalButton } from "react-paypal-button-v2";
import { formatNumber } from '../../Common/index';

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

const PaypalCheckout = (props) => {
    const { addOrEdit, cartTotalAmount } = props;
    const dataCart = JSON.parse(localStorage.getItem("cartItems"))
    const dataCarts = useSelector((state) => state.cart)
    const amounts = (cartTotalAmount / 22982.50);
    const amountsPaypal = amounts.toFixed(2);

    const handleSubmit = (details, data) => {
        const formDataPaypal = new FormData()
        formDataPaypal.append('hoTen', details.purchase_units[0].shipping.name.full_name)
        formDataPaypal.append('diaChi',
            details.purchase_units[0].shipping.address.address_line_1 + " "
            + details.purchase_units[0].shipping.address.admin_area_1 + " "
            + details.purchase_units[0].shipping.address.admin_area_2 + " "
            + details.purchase_units[0].shipping.address.country_code + " ")
        //formDataPaypal.append('sdt', values.sdt)
        formDataPaypal.append('email', details.purchase_units[0].payee.email_address)
        if (dataCart != null) {
            for (const key of Object.keys(dataCart)) {
                formDataPaypal.append('idSanPham', dataCart[key].id)
                formDataPaypal.append('soLuong', dataCart[key].cartQuantity)
                formDataPaypal.append('checkoutProduct', JSON.stringify(dataCart[key]))
                if (dataCart[key].khuyenMaiNavigation.sale > 0) {
                    formDataPaypal.append('thanhTien', dataCart[key].giaKhuyenMai * dataCart[key].cartQuantity)
                }
                else {
                    formDataPaypal.append('thanhTien', dataCart[key].giaSP * dataCart[key].cartQuantity)
                }
            }
        } else {
            formDataPaypal.append('idSanPham', dataCart[0].id)
            formDataPaypal.append('soLuong', dataCart[0].cartQuantity)
        }
        formDataPaypal.append('tongHoaDon', [dataCarts.cartTotalAmount])
        formDataPaypal.append('tongLuongSanPham', [dataCarts.cartTotalQuantity])
        addOrEdit(formDataPaypal);
    }
    return (
        <div style={{ width: '80%', margin: '0 auto' }} className="tab-pane fade" id="checkoutpaypal" role="tabpanel">
            <PayPalButton
                options={{
                    clientId: "AeCubu-Dyd33nGgOhHsE_LSmnvQaQGcgTiOrkHN7WlIFtuQUVYQp0E5pLi30fFZCk1AB6FOixyOhxEKf",
                    currency: "USD"
                }}
                amount={amountsPaypal}
                onSuccess={(details, data) => handleSubmit(details, data)}
            />
        </div>
    );
};

export default PaypalCheckout;