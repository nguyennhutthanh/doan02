import React from 'react'
import { useHistory } from "react-router-dom";
import { useForm, Form } from '../../hooks/useForm';

const initialFValues = {
    hoTen: '',
    sdt: '',
    diaChi: '',
    email: '',
    noiDung: ''
}

const FormContact = (props) => {
    const { Contact } = props;
    const history = useHistory();

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('hoTen' in fieldValues)
            temp.hoTen = fieldValues.hoTen ? "" : "This field is required."
        if ('sdt' in fieldValues)
            temp.sdt = fieldValues.sdt ? "" : "This field is required."
        if ('diaChi' in fieldValues)
            temp.diaChi = fieldValues.diaChi ? "" : "This field is required."
        if ('diaChi' in fieldValues)
            temp.diaChi = fieldValues.diaChi ? "" : "This field is required."
        if ('noiDung' in fieldValues)
            temp.noiDung = fieldValues.noiDung ? "" : "This field is required."
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

    const handleSubmitConact = e => {
        e.preventDefault()
        if (validate()) {
            const FormContact = new FormData()
            FormContact.append('hoTen', values.hoTen)
            FormContact.append('sdt', values.sdt)
            FormContact.append('diaChi', values.diaChi)
            FormContact.append('email', values.email)
            FormContact.append('noiDung', values.noiDung)
            Contact(FormContact, resetForm);
        }
    }

    return (
        <form onSubmit={handleSubmitConact} encType="multipart/form-data">
            <div className="form-fields">
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control"
                            name="hoTen"
                            value={values.hoTen}
                            onChange={handleInputChange}
                            autoComplete="off"
                            error={errors.hoTen}
                            placeholder="H??? v?? t??n" />
                    </div>
                    <div className="col-md-6 margin-bottom-mobie">
                        <input className="form-control"
                            name="sdt"
                            type="text"
                            value={values.sdt}
                            onChange={handleInputChange}
                            autoComplete="off"
                            error={errors.sdt}
                            placeholder="S??? ??i???n tho???i" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-12 margin-bottom-mobie">
                        <input className="form-control"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            autoComplete="off"
                            error={errors.email}
                            placeholder="?????a ch??? Email"
                            type="email" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-12">
                        <textarea className="form-control"
                            name="diaChi"
                            value={values.diaChi}
                            onChange={handleInputChange}
                            autoComplete="off"
                            error={errors.diaChi}
                            placeholder="?????a ch??? hi???n t???i"
                            rows={3} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-12">
                        <textarea className="form-control"
                            name="noiDung"
                            value={values.noiDung}
                            onChange={handleInputChange}
                            autoComplete="off"
                            error={errors.noiDung}
                            placeholder="N???i dung li??n h???"
                            rows={8} />
                    </div>
                </div>
            </div>
            <div>
                <button className="btn" type="submit" name="submitMessage">
                    <img className="img-fl" src="img/other/contact_email.png" alt="img" />G???i tin nh???n
                </button>
            </div>
        </form>
    );
};

export default FormContact;