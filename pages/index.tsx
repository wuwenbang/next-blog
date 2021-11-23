import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import image from 'assets/images/cat.jpg'
const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <img src={image.src} width={100} height={100} />
      <Image width={100} height={100} src={image.src} alt="" />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello
          <Link href="/posts/first-post">
            <a>第一篇文章</a>
          </Link>
        </h1>
      </main>
    </div>
  )
}

export default Home
