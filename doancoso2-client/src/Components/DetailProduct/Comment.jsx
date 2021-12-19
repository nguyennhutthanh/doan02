import React from 'react';
import { useForm, Form } from '../../hooks/useForm';

const initialFValues = {
    id: 0,
    name: '',
    noiDung: '',
    email: '',
}

const Comment = (props) => {
    const { addOrEdit, idComment } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('noiDung' in fieldValues)
            temp.noiDung = fieldValues.noiDung ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "This field is required."
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

    const handleSubmitComment = e => {
        e.preventDefault()
        if (validate()) {
            const formDataComment = new FormData()
            formDataComment.append('id', idComment)
            formDataComment.append('name', values.name)
            formDataComment.append('noiDung', values.noiDung)
            formDataComment.append('email', values.email)
            addOrEdit(formDataComment, resetForm);
        }
    }

    return (
        <form onSubmit={handleSubmitComment} className="new-review-form">
            <input type="hidden" name="review[rating]" />
            <input type="hidden" name="product_id" />
            <h3 className="spr-form-title">Đánh giá sản phẩm</h3>
            <fieldset className="spr-form-contact">
                <div className="spr-form-contact-name">
                    <input className="spr-form-input spr-form-input-text form-control"
                        name="name" type="text"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                        placeholder="Nhập họ tên"
                        autoComplete="off"
                    />
                </div>
                <div className="spr-form-contact-email">
                    <input className="spr-form-input spr-form-input-email form-control"
                        placeholder="Nhập Email"
                        autoComplete="off"
                        name="email" type="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="spr-form-review-body">
                    <div className="spr-form-input">
                        <textarea
                            className="spr-form-input-textarea"
                            rows={6} placeholder="Nội dung"
                            autoComplete="off"
                            name="noiDung" type="text"
                            value={values.noiDung}
                            onChange={handleInputChange}
                            error={errors.noiDung}
                        />
                    </div>
                </div>
            </fieldset>
            <div className="submit">
                <button type="submit" name="addComment" id="submitComment" className="btn btn-default"
                >Đăng</button>
            </div>
        </form>
    );
};
export default Comment;