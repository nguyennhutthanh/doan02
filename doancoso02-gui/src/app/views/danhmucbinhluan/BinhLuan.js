import React, { useState, useEffect } from 'react'
import { TableBody, TableRow, TableCell, Toolbar, InputAdornment, TableHead, Grid } from '@material-ui/core';
import ReviewBinhLuan from './ReviewBinhLuan';
import { makeStyles } from "@material-ui/core/esm";
import useTable from "../../components/UseTable/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import Block from '@material-ui/icons/Block';
import RateReviewOutlined from '@material-ui/icons/RateReviewOutlined';
import Popup from "../../components/Popup/Popup";
import CheckCircle from '@material-ui/icons/LockOpen';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification/Notification";
import ConfirmDialog from "../../components/Confimation/ConfirmDialog";
import { Breadcrumb, SimpleCard } from 'app/components'
import { createAPIEndpoint, ENDPIONTS } from "../../api";

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
   ColorICond: {
      color: 'red'
   },
   UnBlock: {
      color: "green"
   }
}))

const headCells = [
   { id: 'id', label: 'STT' },
   { id: 'email', label: 'Email' },
   { id: 'name', label: 'Tên người gữi' },
   { id: 'ngayBinhLuan', lable: "Ngày bình luận" },
   { id: 'noiDung', lable: "Nội dung" },
   { id: 'trangThai', lable: "Trạng thái" },
   { id: 'spam', lable: "Spam" },
   { id: 'actions', label: 'Chức năng', disableSorting: true },
]

export default function BinhLuan() {

   const classes = useStyles();
   const [viewbinhluan, setViewBinhLuan] = useState([])

   const [listbinhluan, setListBinhLuan] = useState([])

   const [listblock, setListBlock] = useState([])

   const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
   const [openPopup, setOpenPopup] = useState(false)
   const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
   const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
   const [Change, setChange] = useState('1');

   const handleChangeTab = (event, newValue) => {
      setChange(newValue);
      refreshListBinhLuan();
      refreshListBLBlock();
   };
   useEffect(() => {
      if (localStorage.getItem('login_admin') === null) {
         history.push('/signin')
      }
   })
   useEffect(() => {
      refreshListBinhLuan();
   }, [])
   useEffect(() => {
      refreshListBLBlock();
   }, [])
   // list bình luan
   function refreshListBinhLuan() {
      createAPIEndpoint(ENDPIONTS.BINHLUAN + '/listbinhluan').fetchAll()
         .then(res => {
            setListBinhLuan(res.data)
            console.log(res.data)
         })
         .catch(err => console.log(err))
   }
   //list bình luan chan
   function refreshListBLBlock() {
      createAPIEndpoint(ENDPIONTS.BINHLUAN + '/listspam').fetchAll()
         .then(res => {
            setListBlock(res.data)
            console.log(res.data)
         })
         .catch(err => console.log(err))
   }

   // tìm kiếm
   const handleSearch = e => {
      let target = e.target;
      setFilterFn({
         fn: items => {
            if (target.value == "")
               return items;
            else
               return items.filter(x => x.name.toLowerCase().includes(target.value))
         }
      })
   }

   const {
      TblContainer,
      TblPagination,
      recordsAfterPagingAndSorting
   } = useTable(listbinhluan, listblock, headCells, filterFn);
   // xóa
   const onDelete = id => {
      setConfirmDialog({
         ...confirmDialog,
         isOpen: false
      })
      createAPIEndpoint(ENDPIONTS.BINHLUAN).delete(id)
         .then(res => refreshListBinhLuan(),
            setNotify({
               isOpen: true,
               message: 'Xóa thành công',
               type: 'success'
            }))
         .catch(err => console.log(err))
   }

   function ReViewBinhLuan(id) {
      createAPIEndpoint(ENDPIONTS.BINHLUAN).fetchById(id)
         .then(res => {
            refreshListBinhLuan()
            setViewBinhLuan(res.data)
            console.log(res.data)
         })
         .catch(err => console.log(err))
   }

   const ViewBinhLuan = item => {
      ReViewBinhLuan(item)
      setOpenPopup(true)
   }
   //khóa bình luận
   function BlockBinhLuan(id) {
      setConfirmDialog({
         ...confirmDialog,
         isOpen: false
      })
      createAPIEndpoint(ENDPIONTS.BINHLUAN + "/khoabinhluan").fetchById(id)
         .then(res => refreshListBinhLuan(),
            setNotify({
               isOpen: true,
               message: 'Chặn thành công',
               type: 'success'
            }))
         .catch(err => console.log(err))
   }
   //mở khóa bình luận
   function UnBlockBinhLuan(id) {
      setConfirmDialog({
         ...confirmDialog,
         isOpen: false
      })
      createAPIEndpoint(ENDPIONTS.BINHLUAN + "/mobinhluan").fetchById(id)
         .then(res => refreshListBLBlock(),
            setNotify({
               isOpen: true,
               message: 'Bỏ chặn thành công',
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
                     { name: 'Bình Luận', path: '/danhmucbinhluan' },
                  ]} />
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
               <TabContext value={Change}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                     <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="Danh sách bình luận" value="1" />
                        <Tab label="Danh sách chặn" value="2" />
                     </TabList>
                  </Box>
                  <TabPanel value="1">
                     <SimpleCard  >
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
                                 <TableCell className="bg-light-green" align="center">STT</TableCell>
                                 <TableCell className="bg-light-green" align="center">Họ tên</TableCell>
                                 <TableCell className="bg-light-green" align="center">Email</TableCell>
                                 <TableCell className="bg-light-green" align="center">Trạng thái</TableCell>
                                 <TableCell className="bg-light-green" align="center">Chức Năng</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {
                                 listbinhluan.length > 0 ?
                                    listbinhluan.map(data => (
                                       <TableRow key={data.id}>
                                          <TableCell align="center">{data.id}</TableCell>
                                          <TableCell align="center">{data.name}</TableCell>
                                          <TableCell align="center">{data.email}</TableCell>
                                          {
                                             data.trangThai == true ? <TableCell align="center">Đã xem</TableCell> :
                                                <TableCell align="center">Chưa xem</TableCell>
                                          }
                                          <TableCell align="center">
                                             <Controls.ActionButton
                                                color="primary"
                                                onClick={() => {
                                                   setConfirmDialog({
                                                      isOpen: true,
                                                      title: 'Bạn có chắc là muốn chặn binh luận này không',
                                                      onConfirm: () => { BlockBinhLuan(data.id) }
                                                   })
                                                }}
                                             >
                                                <Block className={classes.ColorICond} fontSize="small" />
                                             </Controls.ActionButton>
                                             <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { ViewBinhLuan(data.id) }}>
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
                           title='Thông tin bình luận'
                           openPopup={openPopup}
                           setOpenPopup={setOpenPopup}
                        >
                           <ReviewBinhLuan
                              viewbinhluan={viewbinhluan}
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
                  </TabPanel>
                  <TabPanel value="2">
                     <SimpleCard  >
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
                                 <TableCell className="bg-light-green" align="center">STT</TableCell>
                                 <TableCell className="bg-light-green" align="center">Họ tên</TableCell>
                                 <TableCell className="bg-light-green" align="center">Email</TableCell>
                                 <TableCell className="bg-light-green" align="center">Spam</TableCell>
                                 <TableCell className="bg-light-green" align="center">Chức Năng</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {
                                 listblock.length > 0 ?
                                    listblock.map(data => (
                                       <TableRow key={data.id}>
                                          <TableCell align="center">{data.id}</TableCell>
                                          <TableCell align="center">{data.name}</TableCell>
                                          <TableCell align="center">{data.email}</TableCell>
                                          {
                                             data.spam == true ? <TableCell align="center">Đã chặn</TableCell> :
                                                <TableCell align="center">Chưa chặn</TableCell>
                                          }
                                          <TableCell align="center">
                                             <Controls.ActionButton
                                                color="primary"
                                                onClick={() => {
                                                   setConfirmDialog({
                                                      isOpen: true,
                                                      title: 'Bạn có chắc muốn bỏ chặn bình luận này không?',
                                                      onConfirm: () => { UnBlockBinhLuan(data.id) }
                                                   })
                                                }}
                                             >
                                                <CheckCircle className={classes.UnBlock} fontSize="small" />
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
