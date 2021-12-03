import React, { useState, useEffect } from 'react'
import DanhMucForm from "./FormDanhMuc";
import { TableBody, TableRow, TableCell, Toolbar, InputAdornment, TableHead, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/esm";
import useTable from "../../components/UseTable/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
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
        width: '75%',
        '& .MuiGrid-item': {
            flexBasis: '30%',
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
    { id: 'maLoai', label: 'Mã loại' },
    { id: 'tenLoai', label: 'Tên loại' },
    { id: 'imageName', label: 'Tên ảnh' },
    { id: 'urlAnhDaiDien', lable: "Ảnh đại diện" },
    { id: 'actions', label: 'Chức năng', disableSorting: true },
]

export default function DanhMuc() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [danhmucList, setDanhMucList] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [danhmucroomlistSelect, setDanhMucRoomSelectList] = useState([])

    useEffect(() => {
        refreshDanhMucList();
    }, [])
    useEffect(() => {
        if (localStorage.getItem('login_admin') === null) {
            history.push('/signin')
        }
    })
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.ROOMS + '/GetlistRooms').fetchAll()
            .then(res => {
                let roomslist = res.data.map(item => ({
                    id: item.id,
                    title: item.tenRoom
                }));
                roomslist = [{ id: 0, title: null }].concat(roomslist);
                setDanhMucRoomSelectList(roomslist);
            })
            .catch(err => console.log(err))
    }, [])
    // list danh mục
    function refreshDanhMucList() {
        createAPIEndpoint(ENDPIONTS.DANHMUC).fetchAll()
            .then(res => {
                setDanhMucList(res.data)
            })
            .catch(err => console.log(err))
    }
    // thêm or sửa
    const addOrEdit = (formData, resetForm) => {
        if (formData.get('id') == 0)
            createAPIEndpoint(ENDPIONTS.DANHMUC).create(formData)
                .then(res => {
                    refreshDanhMucList();
                    setNotify({
                        isOpen: true,
                        message: 'Thêm thành công',
                        type: 'success'
                    })
                    console.log("data: ", formData);
                }).catch(err => console.log(err))
        else
            createAPIEndpoint(ENDPIONTS.DANHMUC).update(formData.get('id'), formData)
                .then(res => {
                    refreshDanhMucList();
                    setNotify({
                        isOpen: true,
                        message: 'Sửa thành công',
                        type: 'success'
                    })
                })
                .catch(err => console.log(err))
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
    }

    const {
        TblContainer,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(danhmucList, headCells, filterFn);
    // tìm kiếm
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.tenLoai.toLowerCase().includes(target.value))
            }
        })
    }
    //--
    const handleSearchMaLoai = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.maLoai.toLowerCase().includes(target.value))
            }
        })
    }
    //popup
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    // xóa
    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        createAPIEndpoint(ENDPIONTS.DANHMUC).delete(id)
            .then(res => refreshDanhMucList(),
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
                            { name: 'Danh mục', path: '/danhmucsanpham' },
                        ]} />
                </div>
                <SimpleCard title="Danh Mục San Phẩm" >
                    <Toolbar>
                        <Grid item xs={3}
                            justifyContent="flex-start"
                            alignItems="center">
                            <Controls.Input
                                label="Tìm kiếm theo mã"
                                className={classes.searchInput}
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>)
                                }}
                                onChange={handleSearchMaLoai}
                            />
                        </Grid>
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
                        <Controls.Button
                            text="Thêm Danh Mục"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                        />

                    </Toolbar>
                    <TblContainer>
                        <TableHead>
                            <TableRow>
                                <TableCell className="bg-light-green" align="center">Mã Loại</TableCell>
                                <TableCell className="bg-light-green" align="center">Tên Loại</TableCell>
                                <TableCell className="bg-light-green" align="center">Tên File Ảnh</TableCell>
                                <TableCell className="bg-light-green" align="center">Ảnh</TableCell>
                                <TableCell className="bg-light-green" align="center">Chức Năng</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                danhmucList.length > 0 ?
                                    recordsAfterPagingAndSorting().map(data => (
                                        <TableRow key={data.id}>
                                            <TableCell align="center">{data.maLoai}</TableCell>
                                            <TableCell align="center">{data.tenLoai}</TableCell>
                                            <TableCell align="center">{data.imageName}</TableCell>
                                            <TableCell align="center">
                                                <img className={classes.img} alt="complex" src={data.urlAnhDaiDien} />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Controls.ActionButton
                                                    color="primary"
                                                    onClick={() => { openInPopup(data) }}>
                                                    <EditOutlinedIcon fontSize="small" />
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
                        title="Form Danh Mục"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <DanhMucForm
                            recordForEdit={recordForEdit}
                            addOrEdit={addOrEdit}
                            danhmucroomslistSelect={danhmucroomlistSelect} />
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
