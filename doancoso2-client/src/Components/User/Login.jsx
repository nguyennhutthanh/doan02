import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useForm, Form } from '../../hooks/useForm';

const initialFValues = {
  username: '',
  password: '',
}

const Login = (props) => {
  const { UserLogin } = props;
  const history = useHistory();

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('username' in fieldValues)
      temp.username = fieldValues.username ? "" : "This field is required."
    if ('password' in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required."
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
      const FormLogin = new FormData()
      FormLogin.append('username', values.username)
      FormLogin.append('password', values.password)
      UserLogin(FormLogin, resetForm);
      history.push("/")
    }
  }

  return (
    <form onSubmit={handleSubmitUser} id="customer-form" >
      <div>
        <input type="hidden" name="back" defaultValue="my-account" />
        <div className="form-group no-gutters">
          <input className="form-control" name="username"
            value={values.username}
            onChange={handleInputChange}
            autoComplete="off"
            error={errors.username}
            type="text" placeholder="Nhập tên tài khoản" />
        </div>
        <div className="form-group no-gutters">
          <div className="input-group js-parent-focus">
            <input className="form-control js-child-focus js-visible-password" name="password" type="password"
              value={values.password}
              onChange={handleInputChange}
              error={errors.password}
              autoComplete="off"
              placeholder="Nhập mật khẩu" />
          </div>
        </div>
      </div>
      <div className="clearfix">
        <div className="text-center no-gutters">
          <input type="hidden" name="submitLogin" />
          <button className="btn btn-primary" type="submit">
            Đăng nhập
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;

