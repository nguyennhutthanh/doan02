import React, { useState, useEffect } from 'react'
import { Grid, Card, IconButton, Icon } from '@material-ui/core'
import { createAPIEndpoint, ENDPIONTS } from "../../../api";

const StarCardRight = () => {
    const statList = {
        icon1: 'account_circle',
        icon2: 'comment',
        icon3: 'local_library',
        icon4: 'shop',
    }
    const [countkhachhang, setCountKhachHang] = useState(0)
    const [countbinhluan, setCountBinhLuan] = useState(0)
    const [countthuonghieu, setCountThuongHieu] = useState(0)
    const [countSPKM, setCountSPKhuyenMai] = useState(0)

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.THONGKE + '/CountKhachHang').fetchAll()
            .then(res => {
                setCountKhachHang(res.data);
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.THONGKE + '/CountBinhLuan').fetchAll()
            .then(res => {
                setCountBinhLuan(res.data);
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.THONGKE + '/CountThuongHieu').fetchAll()
            .then(res => {
                setCountThuongHieu(res.data);
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.THONGKE + '/CountSanPhamKhuyenMai').fetchAll()
            .then(res => {
                setCountSPKhuyenMai(res.data);
            }).catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                    <Card
                        elevation={3}
                        className="p-5 flex-column justify-center items-center">
                        <div className="mb-6px">
                            <IconButton className="p-3 bg-light-gray">
                                <Icon className="text-muted">
                                    {statList.icon1}
                                </Icon>
                            </IconButton>
                        </div>
                        <h3 className="mt-1 text-32">
                            {countkhachhang}
                        </h3>
                        <p className="m-0 text-muted">Khách hàng</p>
                    </Card>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Card
                        elevation={3}
                        className="p-5 flex-column justify-center items-center"
                    >
                        <div className="mb-6px">
                            <IconButton className="p-3 bg-light-gray">
                                <Icon className="text-muted">
                                    {statList.icon2}
                                </Icon>
                            </IconButton>
                        </div>

                        <h3 className="mt-1 text-32">
                            {countbinhluan}
                        </h3>
                        <p className="m-0 text-muted">Bình luận</p>
                    </Card>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Card
                        elevation={3}
                        className="p-5 flex-column justify-center items-center"
                    >
                        <div className="mb-6px">
                            <IconButton className="p-3 bg-light-gray">
                                <Icon className="text-muted">
                                    {statList.icon3}
                                </Icon>
                            </IconButton>
                        </div>

                        <h3 className="mt-1 text-32">
                            {countthuonghieu}
                        </h3>
                        <p className="m-0 text-muted">Thương hiệu</p>
                    </Card>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Card
                        elevation={3}
                        className="p-5 flex-column justify-center items-center"
                    >
                        <div className="mb-6px">
                            <IconButton className="p-3 bg-light-gray">
                                <Icon className="text-muted">
                                    {statList.icon4}
                                </Icon>
                            </IconButton>
                        </div>

                        <h3 className="mt-1 text-32">
                            {countSPKM}
                        </h3>
                        <p className="m-0 text-muted">Sản phẩm Sale</p>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default StarCardRight
