import { getPosts } from 'lib/posts'
import { NextApiHandler } from 'next'

const posts: NextApiHandler = async (req, res) => {
  const postList = await getPosts()
  console.log('postList', postList)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(postList))
  res.end()
}

export default posts
