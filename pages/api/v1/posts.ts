import getDatabaseConnection from 'lib/getDatabaseConnection';
import { withSession } from 'lib/withSession';
import { NextApiHandler } from 'next';
import { Post } from 'src/entity/Post';

const posts: NextApiHandler = withSession(async (req, res) => {
  console.log('here');
  if (req.method === 'POST') {
    const { title, content } = req.body;
    const user = req.session.get('currentUser');
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    const post = new Post({
      title,
      content,
      author: user,
    });
    const connection = await getDatabaseConnection();
    await connection.manager.save(post);
    res.json(post);
  } else if (req.method === 'PATCH') {
    const { title, content, id } = req.body;
    const user = req.session.get('currentUser');
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne(Post, { id });
    post.title = title;
    post.content = content;
    await connection.manager.save(post);
    res.json(post);
  }
});

export default posts;
