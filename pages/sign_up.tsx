import axios, { AxiosError } from 'axios';
import Form from 'components/Form';
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
      .then(() => {
        alert('注册成功！');
        window.location.href = '/sign_in';
      })
      .catch((error: AxiosError) => {
        if (error.response.status === 422) {
          alert(error.response.data.error);
        }
      });
  };
  const onChange = (key: string, value: string) => {
    setFormData((data) => ({ ...data, [key]: value }));
  };
  return (
    <>
      <h1>注册</h1>
      <Form
        fields={[
          {
            label: '用户名',
            type: 'text',
            value: formData.username,
            onChange: (e) => {
              onChange('username', e.target.value);
            },
          },
          {
            label: '密码',
            type: 'password',
            value: formData.password,
            onChange: (e) => {
              onChange('password', e.target.value);
            },
          },
          {
            label: '确认密码',
            type: 'password',
            value: formData.passwordConfirmation,
            onChange: (e) => {
              onChange('passwordConfirmation', e.target.value);
            },
          },
        ]}
        onSubmit={onSubmit}
        button={<button type="submit"> 登录 </button>}
      />
    </>
  );
};

export default SignUp;
