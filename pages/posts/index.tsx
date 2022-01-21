import { GetServerSideProps, NextPage } from 'next';
import { Post } from 'src/entity/Post';
import Link from 'next/link';
import getDatabaseConnection from 'lib/getDatabaseConnection';
import Pagination from 'components/Pagination';
import { Container } from 'components/Container';
import styled from 'styled-components';
import Linking from 'components/Linking';
import { withSession } from 'lib/withSession';
import { User } from 'src/entity/User';

interface Props {
  posts: Post[];
  count: number;
  pageNum: number;
  pageSize: number;
  currentUser: User | null;
}

const PostsIndex: NextPage<Props> = ({
  posts,
  count,
  pageNum,
  pageSize,
  currentUser,
}) => {
  return (
    <Container>
      <Header>
        <h2>文章列表</h2>
        {currentUser && <Linking href={`/posts/new`}>新增文章</Linking>}
      </Header>
      <List>
        {posts.map((post) => (
          <Item key={post.id}>
            <Linking href={`/posts/[id]`} as={`/posts/${post.id}`}>
              {post.id}：{post.title}
            </Linking>
          </Item>
        ))}
      </List>
      <Pagination pageSize={pageSize} pageNum={pageNum} count={count} />
    </Container>
  );
};

export default PostsIndex;

export const getServerSideProps = withSession(async (context) => {
  const pageSize = 10;
  const page = context.query.page ? parseInt(context.query.page.toString()) : 1;
  const pageNum = page > 1 ? page : 1;
  const connection = await getDatabaseConnection();
  const [posts, count] = await connection.manager.findAndCount(Post, {
    skip: pageSize * (pageNum - 1),
    take: pageSize,
  });
  console.log(3);
  const currentUser = context.req.session.get('currentUser') || null;
  return {
    props: {
      posts: posts ? JSON.parse(JSON.stringify(posts)) : null,
      count,
      pageNum,
      pageSize,
      currentUser,
    },
  };
});
const List = styled.ul`
  width: 600px;
  padding: 0;
`;
const Item = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 8px 0px;
  color: #000;
  list-style-type: none;
  &:hover {
    color: dodgerblue;
  }
`;

const Header = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
