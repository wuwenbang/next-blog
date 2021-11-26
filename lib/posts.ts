import fs, { promises as fsPromise } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { marked } from 'marked'

const markdownDir = path.join(process.cwd(), 'markdown') // current working dir
export const getPosts = async () => {
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

export const getPost = async (id: string) => {
  const fullPath = path.join(markdownDir, `${id}.md`)
  const text = fs.readFileSync(fullPath, 'utf-8')
  let {
    data: { title, date },
    content,
  } = matter(text)
  content = marked(content)
  return {
    id,
    title,
    date,
    content,
  }
}

export const getPostIds = async () => {
  const fileNames = await fsPromise.readdir(markdownDir)
  return fileNames.map((fileName) => fileName.replace(/\.md$/g, ''))
}
