import React, { useState, useEffect } from 'react'
import { TableBody, TableRow, TableCell, Toolbar, InputAdornment, TableHead, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/esm";
import ReviewLienHe from './ReviewLienHe'
import useTable from "../../components/UseTable/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "./PopupReview";
import RateReviewOutlined from '@material-ui/icons/RateReviewOutlined';
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
    },
}))

const headCells = [
    { id: 'id', label: 'Mã chất liệu' },
    { id: 'tenChatLieu', label: 'Tên chất liệu' },
    { id: 'tenAnh', label: 'Tên ảnh' },
    { id: 'urlAnhChatLieu', lable: "Ảnh đại diện" },
    { id: 'actions', label: 'Chức năng', disableSorting: true },
]

export default function LienHe() {

    const classes = useStyles();

    const [viewlienhe, setViewLienHe] = useState([])

    const [listlienhe, setListLienHe] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    useEffect(() => {
        if (localStorage.getItem('login_admin') === null) {
            history.push('/signin')
        }
    })
    useEffect(() => {
        refreshListLienHe();
    }, [])
    // list chat lieu
    function refreshListLienHe() {
        createAPIEndpoint(ENDPIONTS.LIENHE).fetchAll()
            .then(res => {
                setListLienHe(res.data)
            })
            .catch(err => console.log(err))
    }
    //view liên he
    function viewLienHe(id) {
        createAPIEndpoint(ENDPIONTS.LIENHE).fetchById(id)
            .then(res => {
                setViewLienHe(res.data);

            }).catch(err => console.log(err))
    }
    // Reopen View Lien he
    const OpenViewLienHe = item => {
        viewLienHe(item)
        setOpenPopup(true)
    }

    // xóa
    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        createAPIEndpoint(ENDPIONTS.LIENHE).delete(id)
            .then(res => refreshListLienHe(),
                setNotify({
                    isOpen: true,
                    message: 'Xóa thành công',
                    type: 'success'
                }))
            .catch(err => console.log(err))
    }

    const {
        TblContainer,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(listlienhe, headCells, filterFn);

    // tìm kiếm
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.hoTen.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <>
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Liên hệ', path: '/danhmuclienhe' },
                        ]} />
                </div>
                <SimpleCard title="Danh mục liên hệ" >
                    <Toolbar>
                        <Grid item xs={7}
                            justifyContent="flex-start"
                            alignItems="center">
                            <Controls.Input
                                label="Tìm kiếm tên"
                                className={classes.searchInput}
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>)
                                }}
                                onChange={handleSearch}
                            />
                        </Grid>

                    </Toolbar>
                    <TblContainer>
                        <TableHead>
                            <TableRow>
                                <TableCell className="bg-light-green" align="center">Họ tên</TableCell>
                                <TableCell className="bg-light-green" align="center">SĐT</TableCell>
                                <TableCell className="bg-light-green" align="center">Địa chỉ</TableCell>
                                <TableCell className="bg-light-green" align="center">Email</TableCell>
                                <TableCell className="bg-light-green" align="center">Trạng thái</TableCell>
                                <TableCell className="bg-light-green" align="center">Chức Năng</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                listlienhe.length > 0 ?
                                    recordsAfterPagingAndSorting().map(data => (
                                        <TableRow key={data.id}>
                                            <TableCell align="center">{data.hoTen}</TableCell>
                                            <TableCell align="center">{data.sdt}</TableCell>
                                            <TableCell align="center">{data.diaChi}</TableCell>
                                            <TableCell align="center">{data.email}</TableCell>
                                            {
                                                data.trangThai == true ?
                                                    <TableCell align="center">Đã xem</TableCell> :
                                                    <TableCell align="center">Chưa xem</TableCell>
                                            }
                                            <TableCell align="center">
                                                <Controls.ActionButton
                                                    color="primary"
                                                    onClick={() => { OpenViewLienHe(data.id) }}>
                                                    <RateReviewOutlined fontSize="small" />
                                                </Controls.ActionButton>
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
                    <Popup
                        title="Nội dung người gữi"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <ReviewLienHe
                            viewlienhe={viewlienhe}
                        />
                    </Popup>
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
