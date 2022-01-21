import { Container } from 'components/Container';
import Linking from 'components/Linking';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Container>
      <h1>Welcome to My Blog</h1>
      <p>Hello World</p>
      <Linking href="/posts">文章列表</Linking>
    </Container>
  );
};

export default Home;