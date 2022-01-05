import getDatabaseConnection from 'lib/getDatabaseConnection';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Post } from 'src/entity/Post';
import { UAParser } from 'ua-parser-js';
interface Props {
  browser: {
    name: string;
    version: string;
    major: string;
  };
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <ul>
        <Link href="/posts">
          <a> Link to post index</a>
        </Link>
      </ul>
      <div>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              {post.id}:{post.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);

  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
