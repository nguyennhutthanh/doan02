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
        width: '500px',
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
    },
    W200: {
        width: '500px',
    }

}));

export default function ReviewBinhLuan(props) {
    const { viewbinhluan } = props;
    const [values, setValues] = useState(viewbinhluan)
    const classes = useStyles();

    useEffect(() => {
        if (viewbinhluan != null)
            setValues({ ...values, ...viewbinhluan })
    }, [viewbinhluan])

    return (
        <Grid container spacing={3} columns={16} className={classes.W200}>
            <Grid item xs={16} className={classes.BoxShadow}>
                <Grid item xs>
                    <h6 className={classes.h6}>
                        Họ Tên:
                        <span className={classes.span}> {viewbinhluan.name}</span>
                    </h6>
                </Grid>
                <Grid item xs>
                    <h6 className={classes.h6}>
                        Email:
                        <span className={classes.span}> {viewbinhluan.email}</span>
                    </h6>
                </Grid>
                <Grid item xs>
                    <h6 className={classes.h6}>
                        Nội dung:
                        <span className={classes.span}> {viewbinhluan.noiDung}</span>
                    </h6>
                </Grid>
            </Grid>
        </Grid>
    )
}
