import { getPosts } from 'lib/posts'
import { GetStaticProps, NextPage } from 'next'
import { Post } from 'types'
import Link from 'next/link'
interface Props {
  posts: Post[]
}

const PostsIndex: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <h2>文章列表</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
              <a>
                {post.title}：{post.date}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsIndex

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}
