import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Post } from './entity/Post'
createConnection()
  .then(async (connection) => {
    // const posts = await connection.manager.find(Post)
    // if (posts.length === 0) {
    //   for (let i = 1; i <= 10; i++) {
    //     const post = new Post({ title: `Post${i}`, content: `我的第${i}篇文章` })
    //     await connection.manager.save(post)
    //   }
    // }
    // connection.close()
  })
  .catch((error) => console.log(error))
