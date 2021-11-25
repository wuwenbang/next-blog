import type { NextPage } from 'next'
import Link from 'next/link'
const Home: NextPage = () => {
  return (
    <div>
      <ul>
        <Link href="/posts">
          <a> Link to post index</a>
        </Link>
      </ul>
    </div>
  )
}

export default Home
