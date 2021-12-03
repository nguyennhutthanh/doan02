import React, { useState, useEffect } from 'react'
import KhuyenMaiForm from "./FormKhuyenMai";
import { TableBody, TableRow, TableCell, Toolbar, InputAdornment, TableHead, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/esm";
import useTable from "../../components/UseTable/useTable";
import Controls from "../../components/controls/Controls";
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification/Notification";
import ConfirmDialog from "../../components/Confimation/ConfirmDialog";
import { Breadcrumb, SimpleCard } from 'app/components'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import history from 'history.js'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '100%',
        '& .MuiGrid-item': {
            flexBasis: '60%',
        }
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    BackgroudHeader: {
        backgroundColor: 'none'
    },
    image: {
        width: 110,
        height: 110,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '45%',
        maxHeight: '45%',
    },
    NoData: {
        margin: '20px 0px 0px 431px',
        width: '100%'
    }
}))

const headCells = [
    { id: 'id', label: 'Mã thương hiệu' },
    { id: 'tenThuongHieu', label: 'Tên thương hiệu' },
    { id: 'urlAnhThuongHieu', lable: "Ảnh đại diện" },
    { id: 'actions', label: 'Chức năng', disableSorting: true },
]

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    var strTime = hours + ':' + minutes + ':' + second;
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" + strTime;
}

export default function KhuyenMai() {

    const classes = useStyles();
    const [khuyenmailist, SetListKhuyenMai] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    useEffect(() => {
        if (localStorage.getItem('login_admin') === null) {
            history.push('/signin')
        }
    })
    useEffect(() => {
        refreshhKhuyenMai();
    }, [])
    // list thương hiệu
    function refreshhKhuyenMai() {
        createAPIEndpoint(ENDPIONTS.KHUYENMAI).fetchAll()
            .then(res => {
                SetListKhuyenMai(res.data)
            })
            .catch(err => console.log(err))
    }
    // thêm
    const addOrEdit = (formDataKM, resetForm) => {
        if (formDataKM.get('id') == 0)
            createAPIEndpoint(ENDPIONTS.KHUYENMAI).create(formDataKM)
                .then(res => {
                    refreshhKhuyenMai();
                    setNotify({
                        isOpen: true,
                        message: 'Thêm thành công',
                        type: 'success'
                    })
                    console.log("data: ", formDataKM);
                }).catch(err => console.log(err))
        resetForm()
    }

    const {
        TblContainer,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(khuyenmailist, headCells, filterFn);
    // xóa
    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        createAPIEndpoint(ENDPIONTS.KHUYENMAI).delete(id)
            .then(res => refreshhKhuyenMai(),
                setNotify({
                    isOpen: true,
                    message: 'Xóa thành công',
                    type: 'success'
                }))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Khuyễn mãi', path: '/danhmuckhuyenmai' },
                        ]} />
                </div>
                <SimpleCard title="Danh mục khuyễn mãi" >
                    <Toolbar>
                        <KhuyenMaiForm
                            addOrEdit={addOrEdit}
                        />
                    </Toolbar>
                    <TblContainer>
                        <TableHead>
                            <TableRow>
                                <TableCell className="bg-light-green" align="center">Mã Khuyễn mãi</TableCell>
                                <TableCell className="bg-light-green" align="center">Giá Sale </TableCell>
                                <TableCell className="bg-light-green" align="center">Hạn Sale</TableCell>
                                <TableCell className="bg-light-green" align="center">Chức Năng</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                khuyenmailist.length > 0 ?
                                    recordsAfterPagingAndSorting().map(data => (
                                        <TableRow key={data.id}>
                                            <TableCell align="center">{data.id}</TableCell>
                                            <TableCell align="center">{data.sale + "%"}</TableCell>
                                            <TableCell align="center">{data.expire}</TableCell>
                                            <TableCell align="center">
                                                <Controls.ActionButton
                                                    color="secondary"
                                                    onClick={() => {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title: 'Bạn có chắc chắn muốn xóa bản ghi này không?',
                                                            subTitle: "Bạn không thể hoàn tác thao tác này",
                                                            onConfirm: () => { onDelete(data.id) }
                                                        })
                                                    }}>
                                                    <CloseIcon fontSize="small" />
                                                </Controls.ActionButton>
                                            </TableCell>
                                        </TableRow>)
                                    ) : <h5 className={classes.NoData}>Không có dữ liệu</h5>
                            }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                    <Notification
                        notify={notify}
                        setNotify={setNotify}
                    />
                    <ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />
                </SimpleCard>
            </div>
        </>
    )
}
