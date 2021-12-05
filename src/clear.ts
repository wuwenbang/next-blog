import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Post } from './entity/Post'
createConnection()
  .then(async (connection) => {
    await connection.manager.clear(Post)
    await connection.close()
  })
  .catch((error) => console.log(error))
