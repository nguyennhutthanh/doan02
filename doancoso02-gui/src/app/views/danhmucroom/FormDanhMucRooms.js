import React, { useEffect } from 'react'
import { Grid, ButtonGroup } from '@material-ui/core';
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
    tenRoom: "",
    urlImageRoom: defaultImageSrc,
    imageRoomName: "",
    imageRoom: null,
    danhMucRoom: []
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
    }
}));

export default function FormDanhMucRooms(props) {
    const { addOrEdit, recordForEdit } = props;
    const classes = useStyles();


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('tenRoom' in fieldValues)
            temp.tenRoom = fieldValues.tenRoom ? "" : "This field is required."
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

    const handleSubmitRooms = e => {
        e.preventDefault()
        if (validate()) {
            const formDataTH = new FormData()
            formDataTH.append('id', values.id)
            formDataTH.append('tenRoom', values.tenRoom)
            formDataTH.append('urlImageRoom', values.urlImageRoom)
            formDataTH.append('imageRoom', values.imageRoom)
            formDataTH.append('imageRoomName', values.imageRoomName)
            addOrEdit(formDataTH, resetForm);
        }
    }
    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageRoom = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageRoom,
                    urlImageRoom: x.target.result
                })
            }
            reader.readAsDataURL(imageRoom)
        }
        else {
            setValues({
                ...values,
                imageRoom: null,
                urlImageRoom: defaultImageSrc
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
        <Form onSubmit={handleSubmitRooms} noValidate enctype='multipart/form-data'>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="id"
                        label="M?? ph??ng"
                        className={classes.colorInput}
                        disabled
                        value={values.id}
                        onChange={handleInputChange}
                        error={errors.id}
                    />
                    <Controls.Input
                        autocomplete="off"
                        label="T??n Ph??ng"
                        name="tenRoom"
                        value={values.tenRoom}
                        onChange={handleInputChange}
                        error={errors.tenRoom}
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
                    <Card className={classes.root}>
                        <CardActionArea className={classes.CarImage}>
                            <CardMedia
                                className={classes.media}
                                image={values.urlImageRoom}
                                title="Contemplative Reptile"
                            />
                        </CardActionArea>
                    </Card>
                    <input
                        className={classes.input}
                        type="file"
                        accept="image/*"
                        onChange={showPreview}
                        name="imageRoom"
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
