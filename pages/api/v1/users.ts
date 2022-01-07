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
  res.setHeader('Content-Type', 'application/json');
  const user = new User();
  user.username = username.trim();
  user.password = password;
  user.passwordConfirmation = passwordConfirmation;
  const errorMessage = await user.validate();
  if (errorMessage) {
    res.statusCode = 422;
    res.write(JSON.stringify({ errorMessage }));
  } else {
    const connection = await getDatabaseConnection();
    await connection.manager.save(user);
    res.statusCode = 200;
    const { id, username, createTime, updateTime, posts, comments } = user;
    res.write(
      JSON.stringify({ id, username, createTime, updateTime, posts, comments })
    );
  }
  res.end();
};

export default users;
