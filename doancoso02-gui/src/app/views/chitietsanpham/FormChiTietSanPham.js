import React, { useState, useEffect } from 'react'
import { Grid, ButtonGroup, InputAdornment } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/UseForm/useForm';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ReplayIcon from '@material-ui/icons/Replay';
import CardMedia from '@material-ui/core/CardMedia';
import { RichTextEditor } from 'app/components'

const defaultImageSrc = '/img/imagesDefault.png'

const generateNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
const initialFValues = {
    id: 0,
    maSP: 'SP' + generateNumber(),
    tenSP: "",
    giaSP: 0,
    urlAnhSanPham: defaultImageSrc,
    anhSanPham: null,
    listFileAnh: [],
    soluong: 0,
    mota: "",
    review: "",
    xuatXu: "",
    baoHanh: "",
    kichThuoc: "",
    trangThai: true,
    idDanhmuc: 0,
    idChatLieu: 0,
    idBinhLuan: 0,
    idDatHang: 0,
    idThuongHieu: 0,
    idDiscount: 0,
    idDanhMucHinh: 0,
    fileanh: 0,
}

const valuestam = {
    urlListAnh: [],
    ListAnh: [],
}
// time chưa nhận, danh mục ảnh chưa nhận
const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345
    },
    media: {
        height: 350,
    },
    input: {
        display: 'none',
        borderRadius: '4px',
        width: '18rem',
        height: '18rem'
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
        width: '87% !important',
        margin: '14px 0px 0px 20px !important'
    },
    GidInput: {
        display: 'contents',
    },
    CardButtom: {
        width: '17.5rem !important',
        height: '21rem !important',
        '& .MuiButton-startIcon': {
            margin: 0,
        },
        border: '1px dotted black !important',
    },
    MapCard: {
        maxWidth: '16.3rem',
        maxHeight: '20rem',
        border: '1px dotted black',
        borderRadius: 0,
    },
    ImageCards: {
        width: '16.3rem',
        height: '20rem',
        objectFit: 'cover',
    },
    adornmentText: {
        '& .MuiTypography-root': {
            color: '#8b8883',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },
    colorInputss: {
        '& .MuiInputBase-input': {
            color: '#8b8883'
        },
        width: '87% !important',
        margin: '14px 0px 0px 20px !important'
    },
    InputFile: {
        display: 'none',
    },
    SizeButtom: {
        width: '17.5rem !important',
    },
    ImageList: {
        width: '100%'
    },
    BorderCart: {
        borderRadius: '4px',
        objectFit: 'contain',
    },
    Top: {
        marginTop: '8px',
    },
    Scroll: {
        display: 'block',
        height: '245px',
        overflowX: 'clip',
        overflowY: 'scroll',
        width: '304px',
    },
    Auto: {
        width: '86%',
        margin: '0 auto',
        borderRadius: '7px',
    },
    Center: {
        textAlign: 'center',
    },
    MapMap: {
        marginBottom: '5px',
    },
    ContoCustoms: {
        width: '87% !important',
        margin: '14px 0px 0px 20px !important',
    }
}));

export default function FormChiTietSanPham(props) {
    const { addOrEdit, recordForEdit, danhmuclistSelect, chatlieulistSelect, thuonghieulistSelect, khuyenmaiSelect } = props;
    const classes = useStyles();
    const [image, setImage] = useState({ file: [null] })
    //validate
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('tenSP' in fieldValues)
            temp.tenSP = fieldValues.tenSP ? "" : "Trường này không được rỗng."
        if ('xuatXu' in fieldValues)
            temp.xuatXu = fieldValues.xuatXu ? "" : "Trường này không được rỗng."
        if ('review' in fieldValues)
            temp.review = fieldValues.review ? "" : "Trường này không được rỗng."
        if ('kichThuoc' in fieldValues)
            temp.kichThuoc = fieldValues.kichThuoc ? "" : "Trường này không được rỗng."
        if ('baoHanh' in fieldValues)
            temp.baoHanh = fieldValues.baoHanh ? "" : "Trường này không được rỗng."
        setErrors({ ...temp })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values, setValues,
        errors, setErrors,
        handleInputChange,
    } = useForm(initialFValues, true, validate);

    const handleSubmitCtSanPham = e => {
        e.preventDefault()
        if (validate()) {
            const formDataCTSP = new FormData()
            formDataCTSP.append('id', values.id)
            formDataCTSP.append('maSP', values.maSP)
            formDataCTSP.append('tenSP', values.tenSP)
            formDataCTSP.append('giaSP', values.giaSP)
            formDataCTSP.append('mota', values.mota)
            formDataCTSP.append('review', values.review)
            formDataCTSP.append('xuatXu', values.xuatXu)
            formDataCTSP.append('soluong', values.soluong)
            formDataCTSP.append('baoHanh', values.baoHanh)
            formDataCTSP.append('kichThuoc', values.kichThuoc)
            formDataCTSP.append('trangThai', values.trangThai)
            formDataCTSP.append('anhSanPham', values.anhSanPham)
            if (values.listFileAnh != null) {
                for (const key of Object.keys(values.listFileAnh)) {
                    formDataCTSP.append('listFileAnh', values.listFileAnh[key])
                }
            } else {
                formDataCTSP.append('listFileAnh', values.listFileAnh)
            }
            formDataCTSP.append('idDanhmuc', values.idDanhmuc)
            formDataCTSP.append('idChatLieu', values.idChatLieu)
            formDataCTSP.append('idThuongHieu', values.idThuongHieu)
            formDataCTSP.append('idDiscount', values.idDiscount)
            formDataCTSP.append('urlAnhSanPham', values.urlAnhSanPham)
            addOrEdit(formDataCTSP, resetForm);
        }
    }
    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let anhSanPham = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    anhSanPham,
                    urlAnhSanPham: x.target.result
                })
            }
            reader.readAsDataURL(anhSanPham)
        }
        else {
            setValues({
                ...values,
                anhSanPham: null,
                urlAnhSanPham: defaultImageSrc
            })
        }
    }

    const ListImage = (name) => (e) => {
        if (e.target.files && e.target.files[0]) {
            let listFileAnh = e.target.files;
            initialFValues.fileanh = 0;
            if (listFileAnh != null) {
                valuestam.urlListAnh = [];
                valuestam.ListAnh = [];
                setValues({
                    ...values,
                    [name]: [...listFileAnh]
                })
                valuestam.urlListAnh.push(listFileAnh);
                for (let i = 0; i < valuestam.urlListAnh[0].length; i++) {
                    valuestam.ListAnh.push(URL.createObjectURL(valuestam.urlListAnh[0][i]))
                }
                setImage({ file: valuestam.ListAnh });
                initialFValues.fileanh = listFileAnh.length;
            } else {
                setImage({ file: [null] });
                initialFValues.fileanh = listFileAnh.length;
            }
            console.log(listFileAnh)
        }
    }
    const resetForm = () => {
        setValues(initialFValues)
        valuestam.urlListAnh = [];
        valuestam.ListAnh = [];
        initialFValues.fileanh = 0;
        document.getElementById('image-uploader').value = null;
        document.getElementById('contained-button-file').value = null;
        setErrors({})
    }

    const handleContentChange = (mota) => {
        setValues({ ...values, mota });
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({ ...values, ...recordForEdit })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmitCtSanPham} noValidate enctype='multipart/form-data'>
            <Grid container spacing={3}>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                    <h5>Thêm ảnh đại diện</h5>
                    <input
                        className={classes.input}
                        type="file"
                        accept="image/*"
                        onChange={showPreview}
                        name="anhSanPham"
                        id="image-uploader" />
                    <label htmlFor="image-uploader" >
                        <Controls.Button
                            size="large"
                            className={classes.CardButtom}
                            variant="outlined"
                            component="span"
                            startIcon={
                                <Card className={classes.MapCard}>
                                    <img className={classes.ImageCards} src={values.urlAnhSanPham} />
                                </Card>
                            } />
                    </label>
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                    <Controls.Input
                        autocomplete="off"
                        name="maSP"
                        label="Mã sản phẩm"
                        className={classes.colorInputss}
                        disabled
                        value={values.maSP}
                        onChange={handleInputChange}
                        error={errors.maSP}
                        InputProps={{
                            startAdornment: <InputAdornment
                                className={classes.adornmentText}
                                position="start">#</InputAdornment>
                        }}
                    />
                    <Controls.Input
                        autocomplete="off"
                        name="xuatXu"
                        label="Xuất xứ"
                        className={classes.colorInput}
                        value={values.xuatXu}
                        onChange={handleInputChange}
                        error={errors.xuatXu}
                    />
                    <Controls.Input
                        autocomplete="off"
                        label="Bảo hành"
                        name="baoHanh"
                        className={classes.colorInput}
                        value={values.baoHanh}
                        onChange={handleInputChange}
                        error={errors.baoHanh}
                    />
                    <Controls.Input
                        autocomplete="off"
                        name="kichThuoc"
                        label="Kích thước"
                        className={classes.colorInput}
                        value={values.kichThuoc}
                        onChange={handleInputChange}
                        error={errors.kichThuoc}
                    />
                    <Controls.Input
                        autocomplete="off"
                        name="review"
                        label="Giới thiệu sơ lược"
                        className={classes.colorInput}
                        value={values.review}
                        onChange={handleInputChange}
                        error={errors.review}
                    />
                    <Controls.Input
                        autocomplete="off"
                        name="soluong"
                        label="Số lượng"
                        className={classes.colorInput}
                        value={values.soluong}
                        onChange={handleInputChange}
                        error={errors.soluong}
                    />
                </Grid>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                    <Controls.Input
                        autocomplete="off"
                        label="Tên sản phẩm"
                        name="tenSP"
                        value={values.tenSP}
                        className={classes.colorInput}
                        onChange={handleInputChange}
                        error={errors.tenSP}
                    />
                    <Controls.Input
                        autocomplete="off"
                        name="giaSP"
                        label="Giá sản phẩm"
                        className={classes.colorInput}
                        value={values.giaSP}
                        onChange={handleInputChange}
                        error={errors.giaSP}
                    />
                    <Controls.Select
                        custom={classes.ContoCustoms}
                        label="Danh mục"
                        name="idDanhmuc"
                        value={values.idDanhmuc}
                        onChange={handleInputChange}
                        error={errors.idDanhmuc}
                        options={danhmuclistSelect}
                    />
                    <Controls.Select
                        custom={classes.ContoCustoms}
                        label="Chất liệu"
                        name="idChatLieu"
                        value={values.idChatLieu}
                        onChange={handleInputChange}
                        error={errors.idChatLieu}
                        options={chatlieulistSelect}
                    />
                    <Controls.Select
                        custom={classes.ContoCustoms}
                        label="Thương hiệu"
                        name="idThuongHieu"
                        value={values.idThuongHieu}
                        onChange={handleInputChange}
                        error={errors.idThuongHieu}
                        options={thuonghieulistSelect}
                    />
                    <Controls.Select
                        custom={classes.ContoCustoms}
                        label="Khuyến mãi"
                        name="idDiscount"
                        value={values.idDiscount}
                        onChange={handleInputChange}
                        error={errors.idDiscount}
                        options={khuyenmaiSelect}
                    />
                </Grid>
                <Grid container spacing={2} className={classes.Top}>
                    <Grid item xs={6} md={8}>
                        <RichTextEditor
                            content={values.mota}
                            handleContentChange={handleContentChange}
                            placeholder="Thêm mô tả sản phẩm..."
                        />
                    </Grid>
                    <Grid item xs={6} md={4} className={classes.Center}>
                        <input
                            className={classes.InputFile}
                            accept="image/*"
                            name="listFileAnh"
                            onChange={ListImage('listFileAnh')}
                            id="contained-button-file"
                            multiple
                            type="file" />
                        <label htmlFor="contained-button-file" >
                            <Controls.Button
                                className={classes.SizeButtom}
                                size="large"
                                variant="outlined"
                                component="span"
                                endIcon={<AddIcon />}
                                text="Thêm danh sách hình ảnh"
                            />
                            <h7>Đã tải lên {initialFValues.fileanh} ảnh</h7>
                        </label>
                        <Grid item xs className={classes.Scroll} id="mainImage">
                            {(valuestam.ListAnh || []).map(url => (
                                <Grid item xs className={classes.MapMap}>
                                    <CardMedia
                                        className={classes.Auto}
                                        component="img"
                                        height="140"
                                        image={url}
                                        alt="green iguana"
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

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
        </Form>
    )
}
