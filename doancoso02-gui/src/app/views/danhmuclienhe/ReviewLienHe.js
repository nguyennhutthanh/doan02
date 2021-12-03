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

const useStyles = makeStyles(theme => ({
    BoxShadow: {
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 6%), 0px 1px 1px 0px rgb(0 0 0 / 4%), 0px 1px 3px 0px rgb(0 0 0 / 4%)',
        borderRadius: '4px',
        color: 'rgba(52, 49, 76, 1)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: '#fff',
        marginTop: '17px',
        padding: '19px !important',
        fontSize: '1rem !important',
    },
    WidthMap: {
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 6%), 0px 1px 1px 0px rgb(0 0 0 / 4%), 0px 1px 3px 0px rgb(0 0 0 / 4%)',
        borderRadius: '4px',
        color: 'rgba(52, 49, 76, 1)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: '#fff',
        marginTop: '17px',
        marginLeft: '20px',
        padding: '19px !important',
        fontSize: '1rem !important',
        maxWidth: '39.333333% !important',
        flexBasis: '39.333333% !important',
    },
    h6: {
        fontSize: '1rem',
    },
    span: {
        fontWeight: 400,
    },
    breakword: {
        width: '21rem',
        wordWrap: 'break-word',
    }

}));

export default function ReviewLienHe(props) {
    const { viewlienhe } = props;
    const [values, setValues] = useState(viewlienhe)
    const classes = useStyles();

    useEffect(() => {
        if (viewlienhe != null)
            setValues({ ...values, ...viewlienhe })
    }, [viewlienhe])

    return (
        <Grid container spacing={3} columns={16}>
            <Grid item xs={7} className={classes.BoxShadow}>
                <h4>Thông tin người liên hệ</h4>
                <Grid item xs>
                    <h6 className={classes.h6}>
                        <AddIcon /> Họ Tên:
                        <span className={classes.span}>  {viewlienhe.hoTen}</span>
                    </h6>
                </Grid>
                <Grid item xs>
                    <h6 className={classes.h6}>
                        <AddIcon /> Email:
                        <span className={classes.span}>  {viewlienhe.email}</span>
                    </h6>
                </Grid>
                <Grid item xs>
                    <h6 className={classes.h6}>
                        <AddIcon /> SĐT:
                        <span className={classes.span}>  {viewlienhe.sdt}</span>
                    </h6>
                </Grid>
                <Grid item xs>
                    <h6 className={classes.h6}>
                        <AddIcon /> Địa chỉ:
                        <span className={classes.span}>  {viewlienhe.diaChi}</span>
                    </h6>
                </Grid>
            </Grid>

            <Grid item xs={4} className={classes.WidthMap}>
                <h4>Nội dung</h4>
                <Grid item xs={4}>
                    <p className={classes.breakword}>{viewlienhe.noiDung}</p>
                </Grid>
            </Grid>
        </Grid>
    )
}
