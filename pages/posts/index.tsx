import { GetServerSideProps, NextPage } from 'next';
import { Post } from 'src/entity/Post';
import Link from 'next/link';
import getDatabaseConnection from 'lib/getDatabaseConnection';
interface Props {
  posts: Post[];
}

const PostsIndex: NextPage<Props> = ({ posts }) => {
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
    </div>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);
  return {
    props: {
      posts: posts ? JSON.parse(JSON.stringify(posts)) : null,
    },
  };
};
