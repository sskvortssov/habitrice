import React from 'react'
import styles from './index.module.scss'

const PopupLayout = ({ children }) => {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.popup}>
          {children}
        </div>
      </div>
    </>
  )
}

export default PopupLayout
