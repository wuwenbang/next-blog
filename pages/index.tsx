import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { UAParser } from 'ua-parser-js'
interface Props {
  browser: {
    name: string
    version: string
    major: string
  }
}

const Home: NextPage<Props> = ({ browser }) => {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const w = document.documentElement.clientWidth
    setWidth(w)
  }, [])
  return (
    <div>
      <ul>
        <Link href="/posts">
          <a> Link to post index</a>
        </Link>
      </ul>
      <div>
        <h1>你的浏览器名称是：{browser.name}</h1>
        <h1>你的浏览器宽度是：{width}</h1>
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ua = context.req.headers['user-agent']
  const result = new UAParser(ua).getResult()
  return {
    props: {
      browser: result.browser,
    },
  }
}
