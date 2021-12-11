import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Comment } from './entity/Comment'
import { Post } from './entity/Post'
import { User } from './entity/User'
createConnection()
  .then(async (connection) => {
    const { manager } = connection
    const user = new User({
      username: 'user',
      passwordDigest: '123',
    })
    await manager.save(user)
    const post = new Post({
      title: 'Post',
      content: 'My first post',
      author: user,
    })
    await manager.save(post)
    const comment = new Comment({
      content: 'blabla',
      author: user,
      post: post,
    })
    await manager.save(comment)
    console.log(user)
    console.log(post)
    console.log(comment)
    connection.close()
  })
  .catch((error) => console.log(error))
