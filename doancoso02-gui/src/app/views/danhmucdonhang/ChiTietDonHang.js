import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import { formatNumber, getParsedDate } from '../../common/index';

const defaultImageSrc = '/img/imagesDefault.png'

const useStyles = makeStyles(theme => ({
    MarTop: {
        marginTop: '25px',
    },
    BoxShadow: {
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 6%), 0px 1px 1px 0px rgb(0 0 0 / 4%), 0px 1px 3px 0px rgb(0 0 0 / 4%)',
        borderRadius: '4px',
        color: 'rgba(52, 49, 76, 1)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: '#fff',
        marginTop: '17px',
        padding: '19px !important',
        fontSize: '1rem',
    },
    BorderCart: {
        borderRadius: '4px',
        objectFit: 'contain',
    },
    WidthMap: {
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 6%), 0px 1px 1px 0px rgb(0 0 0 / 4%), 0px 1px 3px 0px rgb(0 0 0 / 4%)',
        borderRadius: '4px',
        color: 'rgba(52, 49, 76, 1)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: '#fff',
        marginTop: '17px',
        marginLeft: '20px',
        padding: '19px !important',
        fontSize: '1rem',
        maxWidth: '39.333333% !important',
        flexBasis: '39.333333% !important',
    },
    WidthMap1: {
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 6%), 0px 1px 1px 0px rgb(0 0 0 / 4%), 0px 1px 3px 0px rgb(0 0 0 / 4%)',
        borderRadius: '4px',
        color: 'rgba(52, 49, 76, 1)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: '#fff',
        marginTop: '17px',
        marginLeft: '20px',
        padding: '19px !important',
        fontSize: '1rem',
        maxWidth: '39.333333% !important',
        flexBasis: '39.333333% !important',
        marginTop: '-674px',
        height: '329px',
        width: '34%',
        position: 'fixed',
        marginLeft: '51%',
        marginTop: '16px',
    }
}));

export default function ChiTietDonHang(props) {
    const { chitietdonhang, chitietkhachang } = props;
    const classes = useStyles();

    const [values, setValues] = useState(chitietdonhang);
    const [value, setValue] = useState(chitietkhachang);
    useEffect(() => {
        if (chitietdonhang != null)
            setValues({
                ...values, ...chitietdonhang,
            })
        setValue({ ...value, ...chitietkhachang })
    }, [chitietdonhang], [chitietkhachang])

    return (
        <Grid container spacing={3} columns={16}>
            {
                <>
                    {chitietdonhang.map(data => (
                        <>
                            <Grid item xs={7} className={classes.BoxShadow}>
                                <h4>Th??ng tin s???n ph???m</h4>
                                <Grid container spacing={3}>
                                    <Grid item xs>
                                        <CardMedia
                                            className={classes.BorderCart}
                                            component="img"
                                            height="140"
                                            image={data.checkoutProduct.urlAnhSanPham === null ? defaultImageSrc : data.checkoutProduct.urlAnhSanPham}
                                            alt="green iguana"
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <h5>M?? s???n ph???m</h5>
                                        <span>{data.checkoutProduct.maSP === null ? "kh??ng c?? m??" : data.checkoutProduct.maSP}</span>
                                        <div className={classes.MarTop}>
                                            <h5>S??? l?????ng</h5>
                                            <span>{data.soLuong === 0 ? "0" : data.soLuong}</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs>
                                        <h5>B???o h??nh</h5>
                                        <span>{data.checkoutProduct.baoHanh === null ? "Kh??ng c?? b???o h??nh" : data.checkoutProduct.baoHanh}</span>
                                        <div className={classes.MarTop}>
                                            <h5>Th??nh ti???n</h5>
                                            <span>{formatNumber(data.thanhTien)} VN??</span>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs>
                                        <h5>T??n s???n ph???m</h5>
                                        <span>{data.checkoutProduct.tenSP}</span>
                                    </Grid>
                                    <Grid item xs>
                                        <h5>Gi?? G???c</h5>
                                        <span>{formatNumber(data.checkoutProduct.giaSP)}</span>
                                    </Grid>
                                    <Grid item xs>
                                        <h5>K??ch th?????c</h5>
                                        <span>{data.checkoutProduct.kichThuoc}</span>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs>
                                        <h5>Xu???t x???</h5>
                                        <span>{data.checkoutProduct.xuatXu === null ? "Kh??ng c?? xu???t x???" : data.checkoutProduct.xuatXu}</span>
                                    </Grid>
                                    <Grid item xs>
                                        <h5>B???o h??nh</h5>
                                        <span>{data.checkoutProduct.baoHanh === null ? "Kh??ng c?? b???o h??nh" : data.checkoutProduct.baoHanh}</span>
                                    </Grid>
                                    <Grid item xs>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    ))
                    }
                    {
                        chitietkhachang.map(data => (
                            <>
                                <Grid item xs={4} className={classes.WidthMap1}>
                                    <h4>Th??ng tin kh??ch h??ng</h4>
                                    <Grid container spacing={3}>
                                        <Grid item xs>
                                            <h5>H??? t??n</h5>
                                            <span>{data.hoTen === null ? "???n t??n" : data.hoTen}</span>
                                        </Grid>
                                        <Grid item xs>
                                            <h5>T???ng h??a ????n</h5>
                                            <span>{formatNumber(data.tongHoaDon)} VN??</span>

                                        </Grid>
                                        <Grid item xs>
                                            <h5>S??? ??i???n tho???i</h5>
                                            <span>{data.sdt === null ? "???n S??T" : data.sdt}</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3}>
                                        <Grid item xs>
                                            <h5>Ng??y ?????t</h5>
                                            <span>{getParsedDate(data.ngayDat)}</span>
                                        </Grid>
                                        <Grid item xs>
                                            <h5>Email</h5>
                                            <span>{data.email === null ? "???n Email" : data.email}</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3}>
                                        <Grid item xs={5}>
                                            <h5>?????a ch???</h5>
                                            <span>{data.diaChi}</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3}>
                                        <Grid item xs>
                                            <h5>Ghi ch?? t??? kh??ch h??ng</h5>
                                            <span>{data.ghiChu === null ? "Kh??ng c?? ghi ch?? g?? t??? kh??ch h??ng" : data.ghiChu}</span>
                                        </Grid>
                                        <Grid item xs>
                                            <h5>T???ng s???n ph???m</h5>
                                            <span>{data.tongSanPhamMua}</span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        ))
                    }
                </>
            }
        </Grid>
    )
}
