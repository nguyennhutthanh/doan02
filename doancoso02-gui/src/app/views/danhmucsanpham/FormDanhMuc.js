import React, { useState, useEffect } from 'react'
import { Grid, ButtonGroup, Button as MuiButton } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/UseForm/useForm';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';
import ReplayIcon from '@material-ui/icons/Replay';

const defaultImageSrc = '/img/image_placeholder.png'

const initialFValues = {
    id: 0,
    maLoai: '',
    tenLoai: '',
    imageName: '',
    urlAnhDaiDien: defaultImageSrc,
    anhDaiDien: null,
    danhMucSanPham: [],
    idRoomInterface: null,
    loaiTrangTriNavigation: null
}

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
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
    ContoCustom: {
        width: '100%',
        margin: '0px',
    }
}));

export default function FormDanhMuc(props) {
    const { addOrEdit, recordForEdit, danhmucroomslistSelect } = props;
    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('tenLoai' in fieldValues)
            temp.tenLoai = fieldValues.tenLoai ? "" : "This field is required."
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

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('id', values.id)
            formData.append('maLoai', values.maLoai)
            formData.append('tenLoai', values.tenLoai)
            formData.append('imageName', values.imageName)
            formData.append('anhDaiDien', values.anhDaiDien)
            formData.append('urlAnhDaiDien', values.urlAnhDaiDien)
            formData.append('idRoomInterface', values.idRoomInterface)
            addOrEdit(formData, resetForm);
        }
    }
    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let anhDaiDien = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    anhDaiDien,
                    urlAnhDaiDien: x.target.result
                })
            }
            reader.readAsDataURL(anhDaiDien)
        }
        else {
            setValues({
                ...values,
                anhDaiDien: null,
                urlAnhDaiDien: defaultImageSrc
            })
        }
    }
    const resetForm = () => {
        setValues(initialFValues)
        document.getElementById('image-uploader').value = null;
        setErrors({})
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({ ...recordForEdit })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit} id="form" noValidate enctype='multipart/form-data'>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="maLoai"
                        label="Mã Loại"
                        className={classes.colorInput}
                        disabled
                        value={values.maLoai}
                        onChange={handleInputChange}
                        error={errors.maLoai}
                    />
                    <Controls.Input
                        autocomplete="off"
                        label="Tên Loại"
                        name="tenLoai"
                        value={values.tenLoai}
                        onChange={handleInputChange}
                        error={errors.tenLoai}
                    />
                    <Controls.Select
                        custom={classes.ContoCustom}
                        label="Phòng"
                        name="idRoomInterface"
                        value={values.idRoomInterface}
                        onChange={handleInputChange}
                        error={errors.idRoomInterface}
                        options={danhmucroomslistSelect}
                        className={classes.ContoCustom}
                    />
                    <div id="demo"></div>
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
                    <Card className={classes.root}>
                        <CardActionArea className={classes.CarImage}>
                            <CardMedia
                                className={classes.media}
                                image={values.urlAnhDaiDien}
                                title="Contemplative Reptile"
                            />
                        </CardActionArea>
                    </Card>
                    <input
                        className={classes.input}
                        type="file"
                        accept="image/*"
                        onChange={showPreview}
                        name="anhDaiDien"
                        id="image-uploader" />
                    <label htmlFor="image-uploader">
                        <Controls.Button
                            size="large"
                            variant="outlined"
                            color="primary"
                            component="span"
                            text="Upload File"
                            startIcon={<CloudUploadIcon />}
                        />
                    </label>
                </Grid>
            </Grid>
        </Form>


    )
}
