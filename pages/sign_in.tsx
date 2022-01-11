import axios, { AxiosError } from 'axios';
import { withSession } from 'lib/withSession';
import { GetServerSideProps, NextPage } from 'next';
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
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .post(`api/v1/sessions`, formData)
      .then(() => {
        alert('登录成功！');
        window.location.href = '/';
      })
      .catch((error: AxiosError) => {
        if (error.response.status === 422) {
          alert(error.response.data.error);
        }
      });
  };
  return (
    <>
      <div>当前登录用户：{user.username}</div>
      <h1>登录</h1>
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
        <button type="submit"> 登录 </button>
      </form>
    </>
  );
};

export default SignIn;
export const getServerSideProps: GetServerSideProps = withSession(
  //@ts-ignore
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
