import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { NextPage } from 'next';
import { Post } from 'src/entity/Post';
import { marked } from 'marked';
import 'github-markdown-css';
import styled from 'styled-components';
import Linking from 'components/Linking';
import { withSession } from 'lib/withSession';
import { User } from 'src/entity/User';
import axios, { AxiosError } from 'axios';
interface Props {
  post: Post;
  id: string;
  currentUser: User | null;
}
const PostsDetail: NextPage<Props> = ({ post, currentUser, id }) => {
  const onDelete = () => {
    axios
      .delete(`/api/v1/posts`, { data: { id } })
      .then(() => {
        alert('删除成功！');
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
    <Layout>
      <Header>
        <Title>{post.title}</Title>
        <div>
          {currentUser && (
            <Linking href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}>
              编辑文章
            </Linking>
          )}
          {currentUser && <Delete onClick={onDelete}>删除文章</Delete>}
        </div>
      </Header>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: marked(post.content) ?? '' }}
      />
    </Layout>
  );
};

export default PostsDetail;

export const getServerSideProps = withSession(async (context) => {
  const id = context.params.id as string;
  const connection = await getDatabaseConnection();
  const post = await connection.manager.findOne(Post, id);
  const currentUser = context.req.session.get('currentUser') || null;
  return {
    props: {
      currentUser,
      id,
      post: JSON.parse(JSON.stringify(post || null)),
    },
  };
});

const Layout = styled.div`
  max-width: 1000px;
  margin: 0px auto;
  padding: 16px 0 64px 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #333;
  margin-bottom: 16px;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
  padding: 16px 0;
`;

const Delete = styled.a`
  color: red;
  cursor: pointer;
  margin-left: 4px;
`;
