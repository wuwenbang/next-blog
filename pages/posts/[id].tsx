import getDatabaseConnection from 'lib/getDatabaseConnection';
import { GetServerSideProps, NextPage } from 'next';
import { Post } from 'src/entity/Post';
import { marked } from 'marked';
import 'github-markdown-css';
import styled from 'styled-components';
interface Props {
  post: Post;
}
const PostsDetail: NextPage<Props> = ({ post }) => {
  return (
    <Layout>
      <Title>{post.title}</Title>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: marked(post.content) ?? '' }}
      />
    </Layout>
  );
};

export default PostsDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params.id as string;
  const connection = await getDatabaseConnection();
  const post = await connection.manager.findOne(Post, id);
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

export const Layout = styled.div`
  max-width: 1000px;
  margin: 0px auto;
  padding: 16px 0 64px 0;
`;

export const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
  border-bottom: 1px solid #333;
  padding: 16px 0;
  margin-bottom: 16px;
`;
