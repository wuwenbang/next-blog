import getDatabaseConnection from 'lib/getDatabaseConnection';
import md5 from 'md5';
import { NextApiHandler } from 'next';
import { SignIn } from 'src/model/signin';
import { User } from 'src/entity/User';

const sessions: NextApiHandler = async (req, res) => {
  const { username, password } = req.body;
  const signIn = new SignIn();
  signIn.username = username;
  signIn.password = password;
  await signIn.validate();
  if (signIn.error) {
    res.statusCode = 422;
    res.end(JSON.stringify({ error: signIn.error }));
  } else {
    res.statusCode = 200;
    res.end(JSON.stringify(signIn.user));
  }
};

export default sessions;
