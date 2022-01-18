import { Container } from 'components/Container';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

const Home: NextPage = () => {
  return (
    <Container>
      <h1 className="text-3xl font-bold">Welcome to My Blog</h1>
      <Link href="/posts">
        <a className="">文章列表</a>
      </Link>
    </Container>
  );
};

export default Home;

