import styles from './index.module.scss'

const Dashboard = () => {
  return (
    <>
      <div className={styles.workspace}>
        <div className={styles.brief}>
          <h2>Today <span>October 26</span></h2>
          <button>Add habit</button>
        </div>
      </div>
      <div className={styles.extra}>

      </div>
    </>
  )
}

export default Dashboard
