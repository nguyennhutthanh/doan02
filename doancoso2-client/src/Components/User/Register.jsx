import React from 'react';
import { useForm, Form } from '../../hooks/useForm';
import { useHistory } from "react-router-dom";

const initialFValues = {
  idKhach: 0,
  hoTen: '',
  sdt: '',
  diaChi: '',
  email: '',
  userName: '',
  passWp: '',
}

const Register = (props) => {
  const { AddUser } = props;
  let history = useHistory();

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('hoTen' in fieldValues)
      temp.hoTen = fieldValues.hoTen ? "" : "This field is required."
    if ('sdt' in fieldValues)
      temp.sdt = fieldValues.sdt ? "" : "This field is required."
    if ('diaChi' in fieldValues)
      temp.diaChi = fieldValues.diaChi ? "" : "This field is required."
    if ('email' in fieldValues)
      temp.email = fieldValues.email ? "" : "This field is required."
    if ('userName' in fieldValues)
      temp.userName = fieldValues.userName ? "" : "This field is required."
    if ('passWp' in fieldValues)
      temp.passWp = fieldValues.passWp ? "" : "This field is required."
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

  const handleSubmitUser = e => {
    e.preventDefault()
    if (validate()) {
      const FormUser = new FormData()
      FormUser.append('idKhach', values.idKhach)
      FormUser.append('hoTen', values.hoTen)
      FormUser.append('diaChi', values.diaChi)
      FormUser.append('sdt', values.sdt)
      FormUser.append('email', values.email)
      FormUser.append('userName', values.userName)
      FormUser.append('passWp', values.passWp)
      AddUser(FormUser, resetForm);
      history.push("/Login")
    }
  }

  return (
    <form onSubmit={handleSubmitUser} id="customer-form" className="js-customer-form">
      <div>
        <div className="form-group">
          <div>
            <input className="form-control"
              name="hoTen" type="text"
              placeholder="Họ và tên"
              autoComplete="off"
              value={values.hoTen}
              onChange={handleInputChange}
              error={errors.hoTen}
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <input className="form-control"
              name="sdt" type="text"
              placeholder="Số điện thoại"
              autoComplete="off"
              value={values.sdt}
              onChange={handleInputChange}
              error={errors.sdt}
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <input className="form-control"
              name="email" type="email"
              placeholder="Email"
              autoComplete="off"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <input className="form-control"
              name="userName" type="text"
              placeholder="Tên tài khoản"
              autoComplete="off"
              value={values.userName}
              onChange={handleInputChange}
              error={errors.userName}
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <div className="input-group js-parent-focus">
              <input className="form-control js-child-focus js-visible-password"
                name="passWp" type="password"
                placeholder="Password"
                autoComplete="off"
                value={values.passWp}
                onChange={handleInputChange}
                error={errors.passWp}
              />
            </div>
          </div>
        </div>
        <textarea className="form-control js-child-focus js-visible"
          placeholder="Địa chỉ"
          name="diaChi" rows={5}
          autoComplete="off"
          value={values.diaChi}
          onChange={handleInputChange}
          error={errors.diaChi}
        />
      </div>
      <div className="clearfix">
        <div>
          <button className="btn btn-primary" type="submit">
            Tạo tài khoản
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;