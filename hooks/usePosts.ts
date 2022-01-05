import axios from 'axios'
import { useMemo, useState } from 'react'
import { Post } from 'src/entity/Post'
import useAsyncEffect from './useAsyncEffect'

export default function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const isEmpty = useMemo(() => {
    return posts.length === 0 ? true : false
  }, [posts])
  
  useAsyncEffect(async () => {
    setIsLoading(true)
    const res = await axios.get<Post[]>('/api/v1/posts')
    setPosts(res.data)
    setIsLoading(false)
  }, [])
  return { posts, isLoading, isEmpty }
}
