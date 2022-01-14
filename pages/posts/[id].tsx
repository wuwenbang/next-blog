import getDatabaseConnection from 'lib/getDatabaseConnection';
import { GetServerSideProps, NextPage } from 'next';
import { Post } from 'src/entity/Post';

interface Props {
  post: Post;
}
const PostsDetail: NextPage<Props> = ({ post }) => {
  return (
    <div>
      <h2>
        {post.id}
        {post.title}
      </h2>
      <article
        dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
      ></article>
    </div>
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
