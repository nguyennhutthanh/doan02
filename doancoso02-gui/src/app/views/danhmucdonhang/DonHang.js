import React, { useState, useEffect } from 'react'
import { TableBody, TableRow, TableCell, Toolbar, InputAdornment, TableHead, Grid } from '@material-ui/core';
import ChiTietDonHang from './ChiTietDonHang';
import { makeStyles } from "@material-ui/core/esm";
import useTable from "../../components/UseTable/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import Popup from "./PopupChiTietDon";
import RateReviewOutlined from '@material-ui/icons/RateReviewOutlined';
import CloseIcon from '@material-ui/icons/Close';
import CheckSharp from '@material-ui/icons/CheckSharp';
import Notification from "../../components/Notification/Notification";
import ConfirmDialog from "../../components/Confimation/ConfirmDialog";
import { Breadcrumb, SimpleCard } from 'app/components'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import history from 'history.js';
import { getParsedDate } from '../../common/index';

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
	ColorCheck: {
		color: "green"
	},
	ColorGiaHang: {
		color: "red"
	}
}))

const headCells = [
	{ id: 'id', label: 'STT' },
	{ id: 'sdt', label: 'Sô điện thoại' },
	{ id: 'diaChi', label: 'Địa chỉ' },
	{ id: 'hoTen', lable: "Họ tên" },
	{ id: 'ngayDat', lable: "Ngày đặt" },
	{ id: 'ghiChu', lable: "Ghi chú" },
	{ id: 'TongHoaDon', lable: "Tổng hóa đơn" },
	{ id: 'email', lable: "Email" },
	{ id: 'actions', label: 'Chức năng', disableSorting: true },
]

export default function DonHang() {

	const classes = useStyles();

	const [chiTietDonHang, setChiTietDonHang] = useState([])
	const [chiTietDonHangs, setChiTietDonHangs] = useState([])
	const [chiTietDonHangss, setChiTietDonHangss] = useState([])
	const [listdonhang, setListDonHang] = useState([])

	const [listdonhangdagiao, setListDonHangDaGiao] = useState([])

	const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
	const [openPopup, setOpenPopup] = useState(false)

	const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
	const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
	const [Change, setChange] = useState('1');

	const handleChangeTab = (event, newValue) => {
		setChange(newValue);
		refreshListDonHang();
		refreshListDonHangDaGiao();
	};
	useEffect(() => {
		if (localStorage.getItem('login_admin') === null) {
			history.push('/signin')
		}
	})
	useEffect(() => {
		refreshListDonHang();
	}, [])

	useEffect(() => {
		refreshListDonHangDaGiao();
	}, [])
	//dơn hàng chưa giao
	function refreshListDonHang() {
		createAPIEndpoint(ENDPIONTS.DONDATHANG + "/listdonhang").fetchAll()
			.then(res => {
				setListDonHang(res.data)
			})
			.catch(err => console.log(err))
	}
	//đơn hàng đã giao
	function refreshListDonHangDaGiao() {
		createAPIEndpoint(ENDPIONTS.DONDATHANG + "/listdonhangdagiao").fetchAll()
			.then(res => {
				setListDonHangDaGiao(res.data)
			})
			.catch(err => console.log(err))
	}
	// xem chi tiết đơn hàng
	function ShowChiTietDonHang(id) {
		createAPIEndpoint(ENDPIONTS.DONDATHANG).fetchById(id)
			.then(res => {
				setChiTietDonHang(res.data)
			}).catch(err => console.log(err))
		createAPIEndpoint(ENDPIONTS.DONDATHANG + "/CustommerProduct").fetchById(id)
			.then(res => {
				setChiTietDonHangs(res.data)
			}).catch(err => console.log(err))
		createAPIEndpoint(ENDPIONTS.DONDATHANG + "/CustommerProducts").fetchById(id)
			.then(res => {
				for (var i = 0; i < res.data.length; i++) {
					if (res.data.detaiCheckoutNavigation.idCheckout[i] == id) {
						console.log("Haha", res.data.detaiCheckoutNavigation[i])
					}
				}
				setChiTietDonHangss(res.data)
				console.log("Test", res.data)
			}).catch(err => console.log(err))
	}

	console.log(chiTietDonHangs);
	const Chitietdon = item => {
		ShowChiTietDonHang(item)
		setOpenPopup(true)
	}
	// set đơn hàng đã giao
	const SetDaGiaoDonHang = id => {
		createAPIEndpoint(ENDPIONTS.DONDATHANG + "/setdonhangdagiao").fetchById(id)
			.then(res => refreshListDonHang(),
				setNotify({
					isOpen: true,
					message: 'Đã giao thành cồng',
					type: 'success'
				}))
			.catch(err => console.log(err))
	}
	const {
		TblContainer,
		TblPagination,
		recordsAfterPagingAndSorting
	} = useTable(listdonhang, listdonhangdagiao, headCells, filterFn);

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
	// xóa
	const onDelete = id => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false
		})
		createAPIEndpoint(ENDPIONTS.DONDATHANG).delete(id)
			.then(res => refreshListDonHang(),
				setNotify({
					isOpen: true,
					message: 'Xóa thành công',
					type: 'success'
				}))
			.catch(err => console.log(err))
	}
	//xóa đơn hàng

	return (
		<>
			<div className="m-sm-30">
				<div className="mb-sm-30">
					<Breadcrumb
						routeSegments={[
							{ name: 'Đơn hàng', path: '/danhmucdonhang' },
						]} />
				</div>
				<TabContext value={Change}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList onChange={handleChangeTab} aria-label="lab API tabs example">
							<Tab label="Danh sách đơn hàng" value="1" />
							<Tab label="Danh sách đơn hàng đã giao" value="2" />
						</TabList>
					</Box>
					<TabPanel value="1">
						<SimpleCard >
							<Toolbar>
								<Grid item xs={7}
									justifyContent="flex-start"
									alignItems="center">
									<Controls.Input
										label="Tìm kiếm đơn"
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
										<TableCell className="bg-light-green" align="center">Số điện thoại</TableCell>
										<TableCell className="bg-light-green" align="center">Ngày đặt</TableCell>
										<TableCell className="bg-light-green" align="center">Trạng thái</TableCell>
										<TableCell className="bg-light-green" align="center">Tình trạng đơn</TableCell>
										<TableCell className="bg-light-green" align="center">Chức Năng</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										listdonhang.length > 0 ?
											listdonhang.map(data => (
												<TableRow key={data.id}>
													<TableCell align="center">{data.hoTen}</TableCell>
													<TableCell align="center">{data.sdt}</TableCell>
													<TableCell align="center">{getParsedDate(data.ngayDat)}</TableCell>
													{
														data.trangThai == true ?
															<TableCell align="center">Đã xem đơn</TableCell>
															: <TableCell align="center">Chứa xem đơn</TableCell>
													}
													{data.daGiao == false ?
														<TableCell className={classes.ColorGiaHang} align="center">Chưa giao hàng</TableCell>
														: <TableCell align="center">Đã giao hàng</TableCell>
													}
													<TableCell align="center">
														{/* đánh dấu đã giao */}
														<Controls.ActionButton
															color="primary"
															onClick={() => { SetDaGiaoDonHang(data.id) }}>
															<CheckSharp className={classes.ColorCheck} fontSize="small" />
														</Controls.ActionButton>
														{/* nút xem chi tiết */}
														<Controls.ActionButton
															color="primary"
															onClick={() => { Chitietdon(data.id) }}>
															<RateReviewOutlined fontSize="small" />
														</Controls.ActionButton>
														{/* nút xóa */}
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
								title="Chi tiết đơn"
								openPopup={openPopup}
								setOpenPopup={setOpenPopup}>
								<ChiTietDonHang
									chitietdonhang={chiTietDonHang}
									chitietkhachang={chiTietDonHangs} />
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
							<TblContainer>
								<TableHead>
									<TableRow>
										<TableCell className="bg-light-green" align="center">Họ tên</TableCell>
										<TableCell className="bg-light-green" align="center">Số điện thoại</TableCell>
										<TableCell className="bg-light-green" align="center">Ngày đặt</TableCell>
										<TableCell className="bg-light-green" align="center">Trạng thái</TableCell>
										<TableCell className="bg-light-green" align="center">Chức Năng</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										listdonhangdagiao.length > 0 ?
											listdonhangdagiao.map(data => (
												<TableRow key={data.id}>
													<TableCell align="center">{data.hoTen}</TableCell>
													<TableCell align="center">{data.sdt}</TableCell>
													<TableCell align="center">{data.ngayDat}</TableCell>
													{
														data.daGiao == true ?
															<TableCell className={classes.ColorCheck} align="center">Đã giao hàng</TableCell>
															: <TableCell align="center">Chưa giao hàng</TableCell>
													}
													<TableCell align="center">
														{/* nút xem chi tiết */}
														<Controls.ActionButton
															color="primary"
															onClick={() => { Chitietdon(data.id) }}>
															<RateReviewOutlined fontSize="small" />
														</Controls.ActionButton>
														{/* nút xóa */}
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
								title="Chi tiết đơn"
								openPopup={openPopup}
								setOpenPopup={setOpenPopup}>
								<ChiTietDonHang
									chitietdonhang={chiTietDonHang} />
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
				</TabContext>
			</div>
		</>
	)
}
