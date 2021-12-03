import React, { useState, useEffect } from 'react'
import ChiTietSanPhamForm from "./FormChiTietSanPham";
import {
	TableBody, TableRow, TableCell, Toolbar, InputAdornment, TableHead, Grid
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/esm";
import useTable from "../../components/UseTable/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "./PopupSanPham";
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
	},
	Popup: {
		'.MuiDialog-paperWidthMd': {
			maxWidth: '1170px',
			width: '-webkit-fill-available'
		}
	},
	ConHang: {
		color: 'green',
	},
	HetHang: {
		color: 'red'
	}
}))

const headCells = [
	{ id: 'maSP', label: 'Mã sản phẩm' },
	{ id: 'tenSP', label: 'Tên sản phẩm' },
	{ id: 'soluong', label: 'Số lượng' },
	{ id: 'urlAnhSanPham', lable: "Ảnh đại diện" },
	{ id: 'trangThai', lable: "Trạng thái" },
	{ id: 'actions', label: 'Chức năng', disableSorting: true },
]

export default function ChiTietSanPham() {

	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null)

	const [danhmuclistSelect, setDanhMucSelectList] = useState([])
	const [chatlieulistSelect, setChatLieuSelectList] = useState([])
	const [thuonghieulistSelect, setThuongHieuSelectList] = useState([])
	const [khuyenmailistSelect, setKhuyenMaiSelectList] = useState([])

	const [sanphamlistCT, setSanPhamListCT] = useState([])

	const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
	const [openPopup, setOpenPopup] = useState(false)
	const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
	const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })


	useEffect(() => {
		refreshSanPhamList();
	}, [])
	useEffect(() => {
		createAPIEndpoint(ENDPIONTS.CTSANPHAM + '/GetlistkhuyenmaiCT').fetchAll()
			.then(res => {
				let khuyenmailist = res.data.map(item => ({
					id: item.id,
					title: item.sale
				}));
				khuyenmailist = [{ id: 0, title: null }].concat(khuyenmailist);
				setKhuyenMaiSelectList(khuyenmailist);
			})
			.catch(err => console.log(err))
	}, [])
	useEffect(() => {
		createAPIEndpoint(ENDPIONTS.CTSANPHAM + '/GetlistdanhmucCT').fetchAll()
			.then(res => {
				let danhmuclist = res.data.map(item => ({
					id: item.id,
					title: item.tenLoai
				}));
				danhmuclist = [{ id: 0, title: null }].concat(danhmuclist);
				setDanhMucSelectList(danhmuclist);
			})
			.catch(err => console.log(err))
	}, [])
	useEffect(() => {
		createAPIEndpoint(ENDPIONTS.CTSANPHAM + '/GetlistchatlieuCT').fetchAll()
			.then(res => {
				let chatlieulist = res.data.map(item => ({
					id: item.id,
					title: item.tenChatLieu
				}));
				chatlieulist = [{ id: 0, title: null }].concat(chatlieulist);
				setChatLieuSelectList(chatlieulist);
			})
			.catch(err => console.log(err))
	}, [])
	useEffect(() => {
		createAPIEndpoint(ENDPIONTS.CTSANPHAM + '/GetlistthuonghieuCT').fetchAll()
			.then(res => {
				let thuonghieulist = res.data.map(item => ({
					id: item.id,
					title: item.tenThuongHieu
				}));
				thuonghieulist = [{ id: 0, title: null }].concat(thuonghieulist);
				setThuongHieuSelectList(thuonghieulist);
			})
			.catch(err => console.log(err))
	}, [])
	// list 
	function refreshSanPhamList() {
		createAPIEndpoint(ENDPIONTS.CTSANPHAM).fetchAll()
			.then(res => {
				setSanPhamListCT(res.data)
			})
			.catch(err => console.log(err))
	}
	// thêm or sửa
	const addOrEdit = (formDataCTSP, resetForm) => {
		if (formDataCTSP.get('id') == 0)
			createAPIEndpoint(ENDPIONTS.CTSANPHAM).create(formDataCTSP)
				.then(res => {
					refreshSanPhamList();
					setNotify({
						isOpen: true,
						message: 'Thêm thành công',
						type: 'success'
					})
					console.log("data: ", formDataCTSP);
				}).catch(err => console.log(err))
		else
			createAPIEndpoint(ENDPIONTS.CTSANPHAM).update(formDataCTSP.get('id'), formDataCTSP)
				.then(res => {
					refreshSanPhamList();
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
	} = useTable(sanphamlistCT, headCells, filterFn);
	// tìm kiếm
	const handleSearch = e => {
		let target = e.target;
		setFilterFn({
			fn: items => {
				if (target.value == "")
					return items;
				else
					return items.filter(x => x.tenSP.toLowerCase().includes(target.value))
			}
		})
	}
	function GetSanPham(id) {
		createAPIEndpoint(ENDPIONTS.CTSANPHAM).fetchById(id)
			.then(res => {
				setRecordForEdit(res.data)
			}).catch(err => console.log(err))
	}
	//popup
	const openInPopup = item => {
		GetSanPham(item.id);
		setRecordForEdit(item)
		setOpenPopup(true)
	}
	// xóa
	const onDelete = id => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false
		})
		createAPIEndpoint(ENDPIONTS.CTSANPHAM).delete(id)
			.then(res => refreshSanPhamList(),
				setNotify({
					isOpen: true,
					message: 'Xóa thành công',
					type: 'success'
				}))
			.catch(err => console.log(err))
	}
	useEffect(() => {
		if (localStorage.getItem('login_admin') === null) {
			history.push('/signin')
		}
	})

	return (
		<>
			<div className="m-sm-30">
				<div className="mb-sm-30">
					<Breadcrumb
						routeSegments={[
							{ name: 'Sản phẩm', path: '/chitietsanpham' },
						]} />
				</div>
				<SimpleCard title="Danh sách sản phẩm" >
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
							text="Thêm sản phẩm"
							variant="outlined"
							startIcon={<AddIcon />}
							className={classes.newButton}
							onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
						/>

					</Toolbar>
					<TblContainer>
						<TableHead>
							<TableRow>
								<TableCell className="bg-light-green" align="center">Mã sản phẩm</TableCell>
								<TableCell className="bg-light-green" align="center">Tên sản phẩm</TableCell>
								<TableCell className="bg-light-green" align="center">Số lượng</TableCell>
								<TableCell className="bg-light-green" align="center">Ảnh</TableCell>
								<TableCell className="bg-light-green" align="center">Giá</TableCell>
								<TableCell className="bg-light-green" align="center">Trạng thái</TableCell>
								<TableCell className="bg-light-green" align="center">Chức Năng</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								sanphamlistCT.length > 0 ?
									recordsAfterPagingAndSorting().map(data => (
										<TableRow key={data.id}>
											<TableCell align="center">{data.maSP}</TableCell>
											<TableCell align="center">{data.tenSP}</TableCell>
											<TableCell align="center">{data.soluong}</TableCell>
											<TableCell align="center">
												<img className={classes.img} alt="complex" src={data.urlAnhSanPham} />
											</TableCell>
											<TableCell align="center">{data.giaSP}</TableCell>
											{data.soluong > 0 ?
												<TableCell className={classes.ConHang} align="center">Còn hàng</TableCell> :
												<TableCell className={classes.HetHang} align="center">hết hàng</TableCell>
											}
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
						title="Form Sản Phẩm"
						openPopup={openPopup}
						setOpenPopup={setOpenPopup}
					>
						<ChiTietSanPhamForm
							danhmuclistSelect={danhmuclistSelect}
							chatlieulistSelect={chatlieulistSelect}
							thuonghieulistSelect={thuonghieulistSelect}
							khuyenmaiSelect={khuyenmailistSelect}
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
