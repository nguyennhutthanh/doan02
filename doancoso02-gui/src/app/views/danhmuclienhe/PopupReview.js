import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { makeStyles } from "@material-ui/core/esm"
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        width: 'calc(100% - 64px)',
        maxWidth: '1000px',
        top: '17px',
        backgroundColor: 'rgb(250 250 250)',
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    Mapborder: {
        padding: '0px 16px 21px 16px',
    }
}))

export default function PopupReview(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={() => { setOpenPopup(false) }}>
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent className={classes.Mapborder}>
                {children}
            </DialogContent>
        </Dialog>
    )
}
