import { GetServerSideProps, NextPage } from 'next';
import { Post } from 'src/entity/Post';
import Link from 'next/link';
import getDatabaseConnection from 'lib/getDatabaseConnection';
import Pagination from 'components/Pagination';
import { Container } from 'components/Container';
import styled from 'styled-components';

interface Props {
  posts: Post[];
  count: number;
  pageNum: number;
  pageSize: number;
}

const PostsIndex: NextPage<Props> = ({ posts, count, pageNum, pageSize }) => {
  return (
    <Container>
      <h2>文章列表</h2>
      <List>
        {posts.map((post) => (
          <Item key={post.id}>
            <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
              <a>
                {post.id}：{post.title}
              </a>
            </Link>
          </Item>
        ))}
      </List>
      <Pagination pageSize={pageSize} pageNum={pageNum} count={count} />
    </Container>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageSize = 10;
  const page = context.query.page ? parseInt(context.query.page.toString()) : 1;
  const pageNum = page > 1 ? page : 1;
  const connection = await getDatabaseConnection();
  const [posts, count] = await connection.manager.findAndCount(Post, {
    skip: pageSize * (pageNum - 1),
    take: pageSize,
  });
  return {
    props: {
      posts: posts ? JSON.parse(JSON.stringify(posts)) : null,
      count,
      pageNum,
      pageSize,
    },
  };
};
export const List = styled.ul`
  padding: 16px;
`;
export const Item = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 8px 0px;
  color: #000;
  list-style-type: none;
  &:hover {
    color: dodgerblue;
  }
`;
