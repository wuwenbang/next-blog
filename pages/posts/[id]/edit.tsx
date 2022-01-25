import axios, { AxiosError } from 'axios';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { withSession } from 'lib/withSession';
import { NextPage } from 'next';
import { FormEventHandler, useState } from 'react';
import { Post } from 'src/entity/Post';
import { User } from 'src/entity/User';
import {
  Button,
  Container,
  FieldInput,
  FieldLabel,
  FieldTextarea,
  FieldWrapper,
} from '../new';

interface Props {
  id: string;
  post: Post;
  currentUser: User | null;
}
const PostsEdit: NextPage<Props> = ({  id, post }) => {
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  });
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .patch(`/api/v1/posts`, { ...formData, id })
      .then(() => {
        alert('提交成功！');
        window.location.href = `/posts/${id}`;
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

export default PostsEdit;

export const getServerSideProps = withSession(async (context) => {
  const id = context.params.id as string;
  const connection = await getDatabaseConnection();
  const post = await connection.manager.findOne(Post, id);
  const currentUser = context.req.session.get('currentUser') || null;
  return {
    props: {
      id,
      currentUser,
      post: JSON.parse(JSON.stringify(post)),
    },
  };
});
