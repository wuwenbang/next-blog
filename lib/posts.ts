import fs, { promises as fsPromise } from 'fs'
import matter from 'gray-matter'
import path from 'path'
export const getPosts = async () => {
  const markdownDir = path.join(process.cwd(), 'markdown') // current working dir
  const fileNames = await fsPromise.readdir(markdownDir)
  const postList = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/g, '')
    const fullPath = path.join(markdownDir, fileName)
    const text = fs.readFileSync(fullPath, 'utf-8')
    const {
      data: { title, date },
    } = matter(text)
    return {
      id,
      title,
      date,
    }
  })
  return postList
}
