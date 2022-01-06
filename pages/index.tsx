import getDatabaseConnection from 'lib/getDatabaseConnection';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Post } from 'src/entity/Post';
interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <h1>文章列表</h1>
      <ol>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
