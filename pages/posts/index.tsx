import { GetServerSideProps, NextPage } from 'next';
import { Post } from 'src/entity/Post';
import Link from 'next/link';
import getDatabaseConnection from 'lib/getDatabaseConnection';
import Pagination from 'components/Pagination';
interface Props {
  posts: Post[];
  count: number;
  pageNum: number;
  pageSize: number;
}

const PostsIndex: NextPage<Props> = ({ posts, count, pageNum, pageSize }) => {
  return (
    <div>
      <h2>文章列表</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
              <a>
                {post.id}：{post.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination pageSize={pageSize} pageNum={pageNum} count={count} />
    </div>
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
