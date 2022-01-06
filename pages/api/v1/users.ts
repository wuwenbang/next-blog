import getDatabaseConnection from 'lib/getDatabaseConnection';
import { getPosts } from 'lib/posts';
import { NextApiHandler } from 'next';
import { User } from 'src/entity/User';

const users: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body;
  const connection = await getDatabaseConnection();
  const user = new User();
  user.username = username;
  // 校验密码
  if (password !== passwordConfirmation) {
    const error = { passwordConfirmation: ['密码不匹配'] };
    res.statusCode = 422;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(error));
  }
  res.end();
};

export default users;
