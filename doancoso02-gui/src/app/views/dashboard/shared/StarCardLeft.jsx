import React, { useState, useEffect } from 'react'
import { Grid, Card, IconButton, Icon } from '@material-ui/core'
import { createAPIEndpoint, ENDPIONTS } from "../../../api";

const StarCardLeft = () => {
    const statList = {
        icon1: 'all_out',
        icon2: 'local_shipping',
        icon3: 'assignment_turned_in',
        icon4: 'assignment',
    }

    const [countchitietdonhang, setCountCTDonHang] = useState(0)
    const [countsanpham, setCountSanPham] = useState(0)
    const [countdanhmuc, setCountDanhMuc] = useState(0)
    const [countlienhe, setCountLienHe] = useState(0)

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.THONGKE + '/CountLienHe').fetchAll()
            .then(res => {
                setCountLienHe(res.data);
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.THONGKE + '/CountChiTietDon').fetchAll()
            .then(res => {
                setCountCTDonHang(res.data);
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.THONGKE + '/CountSanPham').fetchAll()
            .then(res => {
                setCountSanPham(res.data);
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.THONGKE + '/CountDanhMuc').fetchAll()
            .then(res => {
                setCountDanhMuc(res.data);
            }).catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Grid container spacing={3}>
                {/* đơn hàng */}
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
                            {countlienhe}
                        </h3>
                        <p className="m-0 text-muted">Liên hệ</p>
                    </Card>
                </Grid>
                {/* chi tiết đơn hàng */}
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
                            {countchitietdonhang}
                        </h3>
                        <p className="m-0 text-muted">Chi tiết đơn</p>
                    </Card>
                </Grid>
                {/* số lượng sản phẩm còn bán */}
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
                            {countsanpham}
                        </h3>
                        <p className="m-0 text-muted">Sản phẩm</p>
                    </Card>
                </Grid>
                {/* Thẻ loại */}
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
                            {countdanhmuc}
                        </h3>
                        <p className="m-0 text-muted">Thể loại</p>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default StarCardLeft
