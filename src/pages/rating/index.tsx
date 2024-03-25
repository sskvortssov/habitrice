import { useEffect, useState, useContext } from 'react';
import styles from './index.module.scss'
import { ProfileContext } from '#providers/ProfileProvider'

const Rating = () => {
  const { user, setUser } = useContext(ProfileContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URI}/users/rating`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${user.credentials.username}:${user.credentials.password}`).toString('base64')}`
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      {
        users.map((user) => (<div className={styles.profile} key={user._id}>
          {
            user.picture && <img className={styles.profilePicture} src={user.picture} alt='Profile picture' />
          }
          <h2 className={styles.name}>{user.fullname ? `${user.fullname} (@${user.username})` : `@${user.username}`}</h2>
          {
            user.pronouns && <p>Pronouns: {user.pronouns}</p>
          }
          <p>Account: {user.account} CHOCs</p>
          <p>Registered : {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>))
      }
    </>
  )
}

export default Rating
