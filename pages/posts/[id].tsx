import { getPost, getPostIds } from 'lib/posts'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Post } from 'types'

interface Props {
  post: Post
}
const PostDetail: NextPage<Props> = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <article dangerouslySetInnerHTML={{ __html: post.content ?? '' }}></article>
    </div>
  )
}

export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getPostIds()
  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async (path: any) => {
  const id = path.params.id
  const post = await getPost(id)
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  }
}
