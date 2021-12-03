import React, { useState, useEffect } from 'react'
import AdminForm from "./FormAdmin";
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

import Block from '@material-ui/icons/LockOpen';
import Lock from '@material-ui/icons/Lock';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
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
   Lock: {
      color: 'red'
   },
   UnBlock: {
      color: "green"
   }
}))

const headCells = [
   { id: 'id', label: 'SST' },
   { id: 'userName', label: 'Tên tài khoản' },
   { id: 'email', label: 'Email' },
   { id: 'avatar', lable: "Ảnh đại diện" },
   { id: 'isSuperAdmin', label: 'Super' },
   { id: 'isBlocked', label: 'Khóa' },
   { id: 'actions', label: 'Chức năng', disableSorting: true },
]

export default function Admin() {

   const classes = useStyles();
   const [recordForEdit, setRecordForEdit] = useState(null)
   const [adminlist, setAdminList] = useState([])

   const [adminblock, setAdminBlock] = useState([])

   const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
   const [openPopup, setOpenPopup] = useState(false)
   const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
   const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

   const [Change, setChange] = useState('1');

   const handleChangeTab = (event, newValue) => {
      setChange(newValue);
      refreshAdminlist();
      refreshBlockListAdmin();
   };

   useEffect(() => {
      if (localStorage.getItem('login_admin') === null) {
         history.push('/signin')
      }
   })
   useEffect(() => {
      refreshAdminlist();
   }, [])
   useEffect(() => {
      refreshBlockListAdmin();
   }, [])
   // list admin 
   function refreshAdminlist() {
      createAPIEndpoint(ENDPIONTS.ADMIN + "/listadmin").fetchAll()
         .then(res => {
            setAdminList(res.data)
         })
         .catch(err => console.log(err))
   }
   // list block 
   function refreshBlockListAdmin() {
      createAPIEndpoint(ENDPIONTS.ADMIN + "/listblock").fetchAll()
         .then(res => {
            setAdminBlock(res.data)
         })
         .catch(err => console.log(err))
   }
   //khóa tài khoản
   function BlockAdmin(id) {
      setConfirmDialog({
         ...confirmDialog,
         isOpen: false
      })
      createAPIEndpoint(ENDPIONTS.ADMIN + "/blockadmin").fetchById(id)
         .then(res => refreshAdminlist(),
            setNotify({
               isOpen: true,
               message: 'Khóa tài khoản thành công',
               type: 'success'
            }))
         .catch(err => console.log(err))
   }
   //mở tài khoản
   function UnBlockAdmin(id) {
      setConfirmDialog({
         ...confirmDialog,
         isOpen: false
      })
      createAPIEndpoint(ENDPIONTS.ADMIN + "/unblockadmin").fetchById(id)
         .then(res => refreshBlockListAdmin(),
            setNotify({
               isOpen: true,
               message: 'Khóa tài khoản thành công',
               type: 'success'
            }))
         .catch(err => console.log(err))
   }
   // thêm or sửa
   const addOrEdit = (formDataAdmin, resetForm) => {
      if (formDataAdmin.get('id') == 0)
         createAPIEndpoint(ENDPIONTS.ADMIN).create(formDataAdmin)
            .then(res => {
               refreshAdminlist();
               setNotify({
                  isOpen: true,
                  message: 'Thêm thành công',
                  type: 'success'
               })
               console.log("data: ", formDataAdmin);
            }).catch(err => console.log(err))
      else
         createAPIEndpoint(ENDPIONTS.ADMIN).update(formDataAdmin.get('id'), formDataAdmin)
            .then(res => {
               refreshAdminlist();
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
   } = useTable(adminlist, adminblock, headCells, filterFn);
   // tìm kiếm
   const handleSearch = e => {
      let target = e.target;
      setFilterFn({
         fn: items => {
            if (target.value == "")
               return items;
            else
               return items.filter(x => x.userName.toLowerCase().includes(target.value))
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
      createAPIEndpoint(ENDPIONTS.ADMIN).delete(id)
         .then(res => refreshAdminlist(),
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
                     { name: 'Admin', path: '/admin' },
                  ]} />
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
               <TabContext value={Change}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                     <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="Danh sách tài khoản" value="1" />
                        <Tab label="Tài khoản đã khóa" value="2" />
                     </TabList>
                  </Box>
                  <TabPanel value="1">
                     <SimpleCard >
                        <Toolbar>
                           <Grid item xs={7}
                              justifyContent="flex-start"
                              alignItems="center">
                              <Controls.Input
                                 label="Tìm kiếm tài khoản"
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
                              text="Thêm tài khoản"
                              variant="outlined"
                              startIcon={<AddIcon />}
                              className={classes.newButton}
                              onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                           />

                        </Toolbar>
                        <TblContainer>
                           <TableHead>
                              <TableRow>
                                 <TableCell className="bg-light-green" align="center">Ảnh</TableCell>
                                 <TableCell className="bg-light-green" align="center">Tên tài khoản</TableCell>
                                 <TableCell className="bg-light-green" align="center">Email</TableCell>
                                 <TableCell className="bg-light-green" align="center">Quyền Super</TableCell>
                                 <TableCell className="bg-light-green" align="center">Khóa tài khoản</TableCell>
                                 <TableCell className="bg-light-green" align="center">Chức Năng</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {
                                 adminlist.length > 0 ?
                                    adminlist.map(data => (
                                       <TableRow key={data.id}>
                                          <TableCell align="center">
                                             <img className={classes.img} alt="complex" src={data.avatar} />
                                          </TableCell>
                                          <TableCell align="center">{data.userName}</TableCell>
                                          <TableCell align="center">{data.email}</TableCell>
                                          {
                                             data.isSuperAdmin == true ?
                                                <TableCell align="center">super</TableCell> : <TableCell align="center">admin</TableCell>
                                          }
                                          {
                                             data.isBlocked == true ?
                                                <TableCell align="center">Đã khóa</TableCell> :
                                                <TableCell align="center">Chứa khóa</TableCell>
                                          }
                                          <TableCell align="center">
                                             <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                   setConfirmDialog({
                                                      isOpen: true,
                                                      title: 'Bạn có chắc là muốn khóa tài khoản này không?',
                                                      onConfirm: () => { BlockAdmin(data.id) }
                                                   })
                                                }}>
                                                <Block className={classes.UnBlock} fontSize="small" />
                                             </Controls.ActionButton>
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
                           title="Form Admin"
                           openPopup={openPopup}
                           setOpenPopup={setOpenPopup}
                        >
                           <AdminForm
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
                  </TabPanel>
                  <TabPanel value="2">
                     <SimpleCard >
                        <Toolbar>
                           <Grid item xs={7}
                              justifyContent="flex-start"
                              alignItems="center">
                              <Controls.Input
                                 label="Tìm kiếm tài khoản"
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
                                 <TableCell className="bg-light-green" align="center">Ảnh</TableCell>
                                 <TableCell className="bg-light-green" align="center">Tên tài khoản</TableCell>
                                 <TableCell className="bg-light-green" align="center">Email</TableCell>
                                 <TableCell className="bg-light-green" align="center">Quyền Super</TableCell>
                                 <TableCell className="bg-light-green" align="center">Khóa tài khoản</TableCell>
                                 <TableCell className="bg-light-green" align="center">Chức Năng</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {
                                 adminblock.length > 0 ?
                                    adminblock.map(data => (
                                       <TableRow key={data.id}>
                                          <TableCell align="center">
                                             <img className={classes.img} alt="complex" src={data.avatar} />
                                          </TableCell>
                                          <TableCell align="center">{data.userName}</TableCell>
                                          <TableCell align="center">{data.email}</TableCell>
                                          {
                                             data.isSuperAdmin == true ?
                                                <TableCell align="center">super</TableCell> : <TableCell align="center">admin</TableCell>
                                          }
                                          {
                                             data.isBlocked == true ?
                                                <TableCell align="center">Đã khóa</TableCell> :
                                                <TableCell align="center">Chưa khóa</TableCell>
                                          }
                                          <TableCell align="center">
                                             <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                   setConfirmDialog({
                                                      isOpen: true,
                                                      title: 'Bạn có chắc là muốn mở lại tài khoản này không?',
                                                      onConfirm: () => { UnBlockAdmin(data.id) }
                                                   })
                                                }}>
                                                <Lock className={classes.Lock} fontSize="small" />
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
                  </TabPanel>
               </TabContext>
            </Box>
         </div>
      </>
   )
}
