import { createConnection, getConnectionManager } from 'typeorm'

const promise = (async function () {
  const manager = getConnectionManager()
  const hasDefaultConnection = manager.has('default')
  if (hasDefaultConnection) {
    return manager.get('default')
  } else {
    return createConnection()
  }
})()

export default function getDatabaseConnection() {
  return promise
}
