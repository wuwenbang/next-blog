import axios, { AxiosError } from 'axios';
import Form from 'components/Form';
import { FC, FormEventHandler, useState } from 'react';

const PostsNew: FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .post(`/api/v1/posts`, formData)
      .then(() => {
        alert('提交成功！');
        window.location.href = '/posts/';
      })
      .catch((error: AxiosError) => {
        if (error.response.status === 422) {
          alert(error.response.data.error);
        } else if (error.response.status === 401) {
          window.alert('请先登录！');
          window.location.href = `/sign_in?return_to=${encodeURIComponent(
            window.location.pathname
          )}`;
        }
      });
  };
  const onChange = (key: string, value: string) => {
    setFormData((data) => ({ ...data, [key]: value }));
  };
  return (
    <>
      <h2>新增文章</h2>
      <Form
        fields={[
          {
            label: '标题',
            type: 'text',
            value: formData.title,
            onChange: (e) => {
              onChange('title', e.target.value);
            },
          },
          {
            label: '内容',
            type: 'textarea',
            value: formData.content,
            onChange: (e) => {
              onChange('content', e.target.value);
            },
          },
        ]}
        onSubmit={onSubmit}
        button={<button type="submit"> 新增 </button>}
      />
    </>
  );
};

export default PostsNew;
