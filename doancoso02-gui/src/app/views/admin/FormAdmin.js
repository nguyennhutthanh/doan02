import React, { useEffect } from 'react'
import {
	Grid, ButtonGroup, Card, InputAdornment, IconButton, FormControlLabel, Checkbox,
} from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/UseForm/useForm';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ReplayIcon from '@material-ui/icons/Replay';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const defaultImageSrc = '/img/image_placeholder.png'

const initialFValues = {

	id: 0,
	userName: '',
	password: '',
	enterPassword: '',
	isSuperAdmin: false,
	email: '',
	isBlocked: false,
	avatar: defaultImageSrc,
	urlAvatar: null,
	showPassword: false
}

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 415,
	},
	media: {
		height: 146,
	},
	input: {
		display: 'none',
		borderRadius: '4px'
	},
	submitButtonGroup: {
		color: '#000',
		margin: theme.spacing(1),
		'& .MuiButton-label': {
			textTransform: 'none'
		}
	},
	BorderMap: {
		border: '1px solid !important',
		'&:hover': {
			backgroundColor: '#ffe138',
		}
	},
	CarImage: {
		border: '1px solid #1976d2',
		borderRadius: '8px',
	},
	colorInput: {
		'& .MuiInputBase-input': {
			color: 'red'
		}
	},
	ControlsLabel: {
		marginLeft: '-3px !important'
	},
	CardButtom: {
		width: '26.5rem !important',
		height: '19rem !important',
		'& .MuiButton-startIcon': {
			margin: 0,
		},
		border: '1px dotted black !important',
	},
	MapCard: {
		maxWidth: '25.3rem',
		maxHeight: '18rem',
		border: '1px dotted black',
		borderRadius: 0,
	},
	ImageCards: {
		width: '25.3rem',
		height: '18rem',
		objectFit: 'cover',
	},
}));

export default function FormAdmin(props) {
	const { addOrEdit, recordForEdit } = props;
	const classes = useStyles();

	const validate = (fieldValues = values) => {
		let temp = { ...errors }
		if ('userName' in fieldValues)
			temp.userName = fieldValues.userName ? "" : "Trường này không được rỗng."
		if ('password' in fieldValues)
			temp.password = fieldValues.password ? "" : "Trường này không được rỗng."
		if ('enterPassword' in fieldValues)
			temp.enterPassword = fieldValues.enterPassword ? "" : "Trường này không được rỗng."
		if ('email' in fieldValues)
			temp.email = fieldValues.email ? "" : "Trường này không được rỗng."
		setErrors({
			...temp
		})
		if (fieldValues == values)
			return Object.values(temp).every(x => x == "")
	}
	const {
		values, setValues,
		errors, setErrors,
		handleInputChange
	} = useForm(initialFValues, true, validate);

	const handleSubmitAdmin = e => {
		e.preventDefault()
		if (validate()) {
			const formDataAdmin = new FormData()
			formDataAdmin.append('id', values.id)
			formDataAdmin.append('userName', values.userName)
			formDataAdmin.append('password', values.password)
			formDataAdmin.append('isSuperAdmin', values.isSuperAdmin)
			formDataAdmin.append('enterPassword', values.enterPassword)
			formDataAdmin.append('email', values.email)
			formDataAdmin.append('isBlocked', values.isBlocked)
			formDataAdmin.append('avatar', values.avatar)
			formDataAdmin.append('urlAvatar', values.urlAvatar)
			console.log(formDataAdmin)
			console.log(values)
			addOrEdit(formDataAdmin, resetForm);
		}
	}
	const showPreview = e => {
		if (e.target.files && e.target.files[0]) {
			let UrlAvatar = e.target.files[0];
			const reader = new FileReader();
			reader.onload = x => {
				setValues({
					...values,
					UrlAvatar,
					avatar: x.target.result
				})
			}
			reader.readAsDataURL(UrlAvatar)
		}
		else {
			setValues({
				...values,
				UrlAvatar: null,
				avatar: defaultImageSrc
			})
		}
	}
	const resetForm = () => {
		setValues(initialFValues)
		document.getElementById('image-uploaderurlAvatar').value = null;
		setErrors({})
	}

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.checked })
	}

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	useEffect(() => {
		if (recordForEdit != null)
			setValues({ ...recordForEdit })
	}, [recordForEdit])

	return (
		<Form onSubmit={handleSubmitAdmin} noValidate enctype='multipart/form-data'>
			<Grid container>
				<Grid item xs={6}>
					<Controls.Input
						autocomplete="off"
						name="userName"
						label="Tên đăng nhập"
						value={values.userName}
						onChange={handleInputChange}
						error={errors.userName}
					/>
					<Controls.Input
						autocomplete="off"
						label="Địa chỉ email"
						name="email"
						value={values.email}
						onChange={handleInputChange}
						error={errors.email}
					/>
					<Controls.Input
						autocomplete="off"
						name="password"
						label="Mật khẩu"
						id="PassHide"
						type={values.showPassword ? 'text' : 'password'}
						value={values.password}
						onChange={handleInputChange}
						error={errors.password}
						InputProps={{
							endAdornment: <InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>{values.showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}}
					/>
					<Controls.Input
						autocomplete="off"
						name="enterPassword"
						label="Nhập lại mật khẩu"
						type={values.showPassword ? 'text' : 'password'}
						value={values.enterPassword}
						onChange={handleInputChange}
						error={errors.enterPassword}
						InputProps={{
							endAdornment: <InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
								</IconButton>
							</InputAdornment>
						}}
					/>
					<FormControlLabel
						className={classes.ControlsLabel}
						control={
							<Checkbox
								checked={values.isBlocked}
								onChange={handleChange('isBlocked')}
								value={values.isBlocked}
								inputProps={{
									'aria-label': 'primary checkbox',
								}}
							/>
						}
						label="Khóa Tài khoản"
					/>
					<FormControlLabel
						className={classes.ControlsLabel}
						control={
							<Checkbox
								checked={values.isSuperAdmin}
								onChange={handleChange('isSuperAdmin')}
								value={values.isSuperAdmin}
								inputProps={{
									'aria-label': 'primary checkbox',
								}}
							/>
						}
						label="Quyền SuperAdmin"
					/>
					<div>
						<ButtonGroup className={classes.submitButtonGroup}>
							<Controls.Button
								className={classes.BorderMap}
								size="large"
								color="primary"
								endIcon={<AddIcon />}
								type="submit"
								text="Submit" />
							<Controls.Button
								className={classes.BorderMap}
								color="primary"
								size="small"
								startIcon={<ReplayIcon />}
								onClick={resetForm} />
						</ButtonGroup>
					</div>
				</Grid>
				<Grid item lg={6} md={6} sm={12} xs={12}>
					<input
						className={classes.input}
						type="file"
						accept="image/*"
						onChange={showPreview}
						name="urlAvatar"
						id="image-uploaderurlAvatar" />
					<label htmlFor="image-uploaderurlAvatar" >
						<Controls.Button
							size="large"
							className={classes.CardButtom}
							variant="outlined"
							label="Image Uploader"
							component="span"
							startIcon={
								<Card className={classes.MapCard}>
									<img className={classes.ImageCards} src={values.avatar} />
								</Card>
							} />
					</label>
				</Grid>
			</Grid>
		</Form>
	)
}
