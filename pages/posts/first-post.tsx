import React from 'react'
import styles from 'styles/first-post.module.css'

console.log('run')
export default function FirstPost() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>内容</div>
    </div>
  )
}
