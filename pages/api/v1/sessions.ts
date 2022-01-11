import { NextApiHandler } from 'next';
import { SignIn } from 'src/model/signin';
import { withSession } from 'lib/withSession';
import { Session } from 'next-iron-session';

// 扩展接口
declare module 'next' {
  interface NextApiRequest {
    session: Session;
  }
}

const sessions: NextApiHandler = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.session);
  const signIn = new SignIn();
  signIn.username = username;
  signIn.password = password;
  await signIn.validate();
  if (signIn.error) {
    res.statusCode = 422;
    res.end(JSON.stringify({ error: signIn.error }));
  } else {
    req.session.set('currentUser', signIn.user);
    await req.session.save();
    res.statusCode = 200;
    res.end(JSON.stringify(signIn.user));
  }
};

export default withSession(sessions);
