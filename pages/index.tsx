import { Container } from 'components/Container';
import Linking from 'components/Linking';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

const Home: NextPage = () => {
  return (
    <Container>
      <h1>Welcome to My Blog</h1>
      <Linking href="/posts">文章列表</Linking>
    </Container>
  );
};

export default Home;
