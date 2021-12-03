import React from 'react'
import { Grid, ButtonGroup } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/UseForm/useForm';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ReplayIcon from '@material-ui/icons/Replay';


const initialFValues = {
    id: 0,
    sale: '',
    expire: new Date().now,
    productCodeNavigation: []
}

const useStyles = makeStyles(theme => ({
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
    colorInput: {
        '& .MuiInputBase-input': {
            color: 'red'
        }
    },
    formGit: {
        '& .makeStyles-root-669': {
            width: '100% !important',
        }
    },
    widthSum: {
        width: '100% !important',
    }
}));

export default function FormKhuyenMai(props) {
    const { addOrEdit } = props;
    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('sale' in fieldValues)
            temp.sale = fieldValues.sale ? "" : "Trường này không được rỗng"
        setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values, setValues,
        errors, setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmitKhuyenMai = e => {
        e.preventDefault()
        if (validate()) {
            const formDataKM = new FormData()
            formDataKM.append('id', values.id)
            formDataKM.append('sale', values.sale)
            formDataKM.append('expire', values.expire)
            addOrEdit(formDataKM, resetForm);
        }
    }
    return (
        <Form onSubmit={handleSubmitKhuyenMai} Classname={classes.formGit} noValidate enctype='multipart/form-data'>
            <Grid container spacing={3}>
                <Grid item xs={2}
                    justifyContent="flex-start"
                    alignItems="center">
                    <Controls.Input
                        name="id"
                        label="Mã Khuyễn mãi"
                        className={classes.colorInput, classes.widthSum}
                        disabled
                        value={values.id}
                        onChange={handleInputChange}
                        error={errors.id}
                    />
                </Grid>
                <Grid item xs={4}
                    justifyContent="flex-start"
                    alignItems="center">
                    <Controls.Input
                        autocomplete="off"
                        label="Giảm giá"
                        name="sale"
                        value={values.sale}
                        onChange={handleInputChange}
                        error={errors.sale}
                        className={classes.widthSum}
                    />
                </Grid>
                <Grid item xs={3}
                    justifyContent="flex-start"
                    alignItems="center">
                    <Controls.Input
                        autocomplete="off"
                        name="expire"
                        type="datetime-local"
                        value={values.expire}
                        onChange={handleInputChange}
                        error={errors.expire}
                        className={classes.widthSum}
                    />
                </Grid>
                <Grid item xs={3}
                    justifyContent="flex-start"
                    alignItems="center">
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
                </Grid>
            </Grid>
        </Form>
    )
}
