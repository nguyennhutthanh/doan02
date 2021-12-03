import React, { useState, useEffect } from 'react'
import ChatLieuForm from "./FormChatLieu";
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
    { id: 'id', label: 'Mã chất liệu' },
    { id: 'tenChatLieu', label: 'Tên chất liệu' },
    { id: 'tenAnh', label: 'Tên ảnh' },
    { id: 'urlAnhChatLieu', lable: "Ảnh đại diện" },
    { id: 'actions', label: 'Chức năng', disableSorting: true },
]

export default function ChatLieu() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [chatlieuList, setChatLieuList] = useState([])
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
        refreshChatLieuList();
    }, [])
    // list chat lieu
    function refreshChatLieuList() {
        createAPIEndpoint(ENDPIONTS.CHATLIEU).fetchAll()
            .then(res => {
                setChatLieuList(res.data)
            })
            .catch(err => console.log(err))
    }
    // thêm or sửa
    const addOrEdit = (formDataCL, resetForm) => {
        if (formDataCL.get('id') == 0)
            createAPIEndpoint(ENDPIONTS.CHATLIEU).create(formDataCL)
                .then(res => {
                    refreshChatLieuList();
                    setNotify({
                        isOpen: true,
                        message: 'Thêm thành công',
                        type: 'success'
                    })
                    console.log("data: ", formDataCL);
                }).catch(err => console.log(err))
        else
            createAPIEndpoint(ENDPIONTS.CHATLIEU).update(formDataCL.get('id'), formDataCL)
                .then(res => {
                    refreshChatLieuList();
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
    } = useTable(chatlieuList, headCells, filterFn);
    // tìm kiếm
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.tenChatLieu.toLowerCase().includes(target.value))
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
        createAPIEndpoint(ENDPIONTS.CHATLIEU).delete(id)
            .then(res => refreshChatLieuList(),
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
                            { name: 'Chất liệu', path: '/danhmucchatlieu' },
                        ]} />
                </div>
                <SimpleCard title="Danh mục chất liệu" >
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
                        <Controls.Button
                            text="Thêm Chất Liệu"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                        />

                    </Toolbar>
                    <TblContainer>
                        <TableHead>
                            <TableRow>
                                <TableCell className="bg-light-green" align="center">Mã chất liệu</TableCell>
                                <TableCell className="bg-light-green" align="center">Tên chất liệu</TableCell>
                                <TableCell className="bg-light-green" align="center">Tên Ảnh</TableCell>
                                <TableCell className="bg-light-green" align="center">Ảnh</TableCell>
                                <TableCell className="bg-light-green" align="center">Chức Năng</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                chatlieuList.length > 0 ?
                                    recordsAfterPagingAndSorting().map(data => (
                                        <TableRow key={data.id}>
                                            <TableCell align="center">{data.id}</TableCell>
                                            <TableCell align="center">{data.tenChatLieu}</TableCell>
                                            <TableCell align="center">{data.tenAnh}</TableCell>
                                            <TableCell align="center">
                                                <img className={classes.img} alt="complex" src={data.urlAnhChatLieu} />
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
                        <ChatLieuForm
                            recordForEdit={recordForEdit}
                            addOrEdit={addOrEdit} />
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
