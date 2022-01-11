import axios, { AxiosError } from 'axios';
import { NextPage } from 'next';
import { FormEventHandler, useState } from 'react';

const SignUp: NextPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
  });
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .post(`api/v1/users`, formData)
      .then(() => {})
      .catch((error: AxiosError) => {
        if (error.response.status === 422) {
          alert(error.response.data.error);
        }
      });
  };
  return (
    <>
      <h1>注册</h1>
      {JSON.stringify(formData)}
      <form onSubmit={onSubmit}>
        <div>
          <span>用户名</span>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => {
              setFormData((data) => ({ ...data, username: e.target.value }));
            }}
          />
        </div>
        <div>
          <span>密码</span>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => {
              setFormData((data) => ({ ...data, password: e.target.value }));
            }}
          />
        </div>
        <div>
          <span>确认密码</span>
          <input
            type="password"
            value={formData.passwordConfirmation}
            onChange={(e) => {
              setFormData((data) => ({
                ...data,
                passwordConfirmation: e.target.value,
              }));
            }}
          />
        </div>
        <button type="submit"> 注册 </button>
      </form>
    </>
  );
};

export default SignUp;
