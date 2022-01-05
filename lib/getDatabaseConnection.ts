import { createConnection, getConnectionManager } from 'typeorm';
import 'reflect-metadata';
import { Post } from 'src/entity/Post';
import { User } from 'src/entity/User';
import { Comment } from 'src/entity/Comment';
import config from 'ormconfig.json';

const create = () => {
  // @ts-ignore
  return createConnection({
    ...config,
    entities: [Post, User, Comment],
  });
};

const promise = (async function () {
  const manager = getConnectionManager();

  if (!manager.has('default')) {
    console.log(1);
    return create();
  } else {
    const current = manager.get('default');
    if (current.isConnected) {
      console.log(2);
      return current;
    } else {
      console.log(3);
      return create();
    }
  }
})();

export default function getDatabaseConnection() {
  return promise;
}
