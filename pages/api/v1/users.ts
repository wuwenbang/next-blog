import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import md5 from 'md5';
import { NextApiHandler } from 'next';
import { User } from 'src/entity/User';

const users: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body as {
    username: string;
    password: string;
    passwordConfirmation: string;
  };
  res.setHeader('Content-Type', 'application/json');
  const connection = await getDatabaseConnection();
  const found = await connection.manager.findOne(User, {
    username,
  });
  let error = '';
  if (username === '') {
    error = '用户名为空';
  } else if (password === '') {
    error = '密码为空';
  } else if (password !== passwordConfirmation) {
    error = '密码不匹配';
  } else if (found) {
    error = '用户名已存在';
  }
  if (error) {
    res.statusCode = 422;
    res.write(JSON.stringify({ error }));
  } else {
    const user = new User();
    user.username = username.trim();
    user.passwordDigest = md5(password);
    await connection.manager.save(user);
    res.statusCode = 200;
    res.write(
      JSON.stringify({
        id: user.id,
        username: user.username,
        createTime: user.createTime,
        updateTime: user.updateTime,
      })
    );
  }
  res.end();
};

export default users;
