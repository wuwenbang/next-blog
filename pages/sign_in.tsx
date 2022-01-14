import axios, { AxiosError } from 'axios';
import Form from 'components/Form';
import { withSession } from 'lib/withSession';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { FormEventHandler, useState } from 'react';
import { User } from 'src/entity/User';
interface Props {
  user: User | null;
}

const SignIn: NextPage<Props> = ({ user }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { query } = useRouter();
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .post(`api/v1/sessions`, formData)
      .then(() => {
        alert('登录成功！');
        location.href = query.return_to.toString();
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
      <div>当前登录用户：{user?.username}</div>
      <h1>登录</h1>
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
        ]}
        onSubmit={onSubmit}
        button={<button type="submit"> 登录 </button>}
      />
    </>
  );
};

export default SignIn;
export const getServerSideProps: GetServerSideProps = withSession(
  async (context) => {
    //@ts-ignore
    const user = context.req.session.get('currentUser');
    return {
      props: {
        user: user ? JSON.parse(JSON.stringify(user)) : null,
      },
    };
  }
);
