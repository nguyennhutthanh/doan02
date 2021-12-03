import React, { useState, useEffect } from 'react'
import { Card, Grid, Button, CircularProgress } from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { makeStyles } from '@material-ui/core/styles'
import history from 'history.js'
import clsx from 'clsx'
import { Redirect, useLocation } from 'react-router-dom'
import { createAPIEndpoint, ENDPIONTS } from "../../../api";


const useStyles = makeStyles(({ palette, ...theme }) => ({
	cardHolder: {
		background: '#1A2038',
	},
	card: {
		maxWidth: 800,
		borderRadius: 12,
		margin: '1rem',
		height: '370px',
		width: '770px'
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
	Map1: {
		margin: '28px 0px',
	},
	Map2: {
		fontSize: '2.2rem',
		textAlign: 'center',
		color: '#1a2038',
	},
	Map3: {
		marginTop: '31px',
	}
}))

const JwtLogin = (props) => {
	const [loading, setLoading] = useState(false)
	const [userInfo, setUserInfo] = useState({
		username: '',
		password: '',
	})
	const [admin, setAdminInfo] = useState([])
	const [message, setMessage] = useState('')

	const classes = useStyles()

	const handleChange = ({ target: { name, value } }) => {
		let temp = { ...userInfo }
		temp[name] = value
		setUserInfo(temp)
	}

	const handleFormSubmit = async (event) => {

		createAPIEndpoint(ENDPIONTS.LOGIN + "/Loginadmin").create(userInfo)
			.then(res => {
				setAdminInfo(res.data)
				setLoading(true)
				localStorage.setItem('login_admin', JSON.stringify(res.data.accessToken))
				localStorage.setItem('admin', JSON.stringify(res.data.user))
				history.push('/dashboard')
					;
			}).catch(
				err => console.log(err)
				, setLoading(false)
			)
	}

	useEffect(() => {
		if (localStorage.getItem('login_admin')) {
			history.push('/dashboard')
		}
	}, loading)

	return loading == true ? <Redirect to={{ path: '/dashboard' }} /> : (
		<div
			className={clsx(
				'flex justify-center items-center  min-h-full-screen',
				classes.cardHolder
			)}
		>
			<Card className={classes.card}>
				<Grid container className={classes.Map1}>
					<Grid item lg={5} md={5} sm={5} xs={12}>
						<div className="p-8 flex justify-center items-center h-340">
							<img
								className="w-324"
								src="/assets/images/illustrations/dreamer.svg"
								alt=""
							/>
						</div>
					</Grid>
					<Grid item lg={7} md={7} sm={7} xs={12} className={classes.Map3}>
						<h4 className={classes.Map2}>Shop BooLap</h4>
						<div className="p-8 h-full bg-light-gray relative">
							<ValidatorForm onSubmit={handleFormSubmit}>
								<TextValidator
									className="mb-6 w-full"
									variant="outlined"
									size="small"
									label="Username"
									onChange={handleChange}
									type="text"
									name="username"
									value={userInfo.username}
									validators={['required']}
									errorMessages={[
										'this field is required',
									]}
								/>
								<TextValidator
									className="mb-3 w-full"
									label="Password"
									variant="outlined"
									size="small"
									onChange={handleChange}
									name="password"
									type="password"
									value={userInfo.password}
									validators={['required']}
									errorMessages={['this field is required']}
								/>
								{/* <FormControlLabel
                                    className="mb-3 min-w-288"
                                    name="agreement"
                                    onChange={handleChange}
                                    control={
                                        <Checkbox
                                            size="small"
                                            onChange={({
                                                target: { checked },
                                            }) =>
                                                handleChange({
                                                    target: {
                                                        name: 'agreement',
                                                        value: checked,
                                                    },
                                                })
                                            }
                                            checked={userInfo.agreement || true}
                                        />
                                    }
                                    label="Remeber me"
                                /> */}

								{message && (
									<p className="text-error">{message}</p>
								)}

								<div className="flex flex-wrap items-center mb-4">
									<div className="relative">
										<Button
											variant="contained"
											color="primary"
											disabled={loading}
											type="submit"
										>
											Sign in
										</Button>
										{loading && (
											<CircularProgress
												size={24}
												className={
													classes.buttonProgress
												}
											/>
										)}
									</div>
									{/* <span className="mr-2 ml-5">or</span>
                                    <Button
                                        className="capitalize"
                                        onClick={() =>
                                            history.push('/session/signup')
                                        }
                                    >
                                        Sign up
                                    </Button> */}
								</div>
								{/* <Button
                                    className="text-primary"
                                    onClick={() =>
                                        history.push('/session/forgot-password')
                                    }
                                >
                                    Forgot password?
                                </Button> */}
							</ValidatorForm>
						</div>
					</Grid>
				</Grid>
			</Card>
		</div>
	)
}

export default JwtLogin
