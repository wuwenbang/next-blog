import getDatabaseConnection from 'lib/getDatabaseConnection';
import { NextApiHandler } from 'next';
import { User } from 'src/entity/User';
import md5 from 'md5';

const users: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body as {
    username: string;
    password: string;
    passwordConfirmation: string;
  };
  let errorMessage = '';

  // 校验
  if (username.trim() === '') {
    errorMessage = '用户名为空';
  } else if (password !== passwordConfirmation) {
    errorMessage = '密码不一致';
    res.statusCode = 422;
  }
  res.setHeader('Content-Type', 'application/json');
  if (errorMessage) {
    res.write(JSON.stringify({ message: errorMessage }));
  } else {
    const connection = await getDatabaseConnection();
    const user = new User();
    user.username = username;
    user.passwordDigest = md5(password);
    await connection.manager.save(user);
    res.statusCode = 200;
    res.write(JSON.stringify(user));
  }
  res.end();
};

export default users;
