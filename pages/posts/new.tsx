import axios, { AxiosError } from 'axios';
import { FC, FormEventHandler, useState } from 'react';
import styled from 'styled-components';

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
  return (
    <Container>
      <h2>新增文章</h2>
      <form onSubmit={onSubmit}>
        <FieldWrapper>
          <FieldLabel>文章标题</FieldLabel>
          <FieldInput
            value={formData.title}
            onChange={(e) => {
              setFormData((data) => ({ ...data, title: e.target.value }));
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FieldLabel>文章内容</FieldLabel>
          <FieldTextarea
            value={formData.content}
            onChange={(e) => {
              setFormData((data) => ({ ...data, content: e.target.value }));
            }}
          />
        </FieldWrapper>
        <Button type="submit"> 提交 </Button>
      </form>
    </Container>
  );
};

export default PostsNew;

const Container = styled.div`
  padding: 16px;
`;

const FieldWrapper = styled.div`
  display: flex;
  padding: 16px 0;
`;

const FieldInput = styled.input`
  width: 100%;
  border: 1px solid #aaa;
  height: 2em;
  outline: none;
`;

const FieldTextarea = styled.textarea`
  width: 100%;
  height: 60vh;
  border: 1px solid #aaa;
  outline: none;
`;

const FieldLabel = styled.label`
  white-space: nowrap;
  width: 5em;
`;

const Button = styled.button`
  height: 2em;
  width: 6em;
  cursor: pointer;
`;
