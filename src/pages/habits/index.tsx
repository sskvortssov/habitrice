import { useEffect, useState, useContext } from 'react';
import styles from './index.module.scss'
import { ProfileContext } from '#providers/ProfileProvider'

const Habits = () => {
  const { user, setUser } = useContext(ProfileContext)
  const [habits, setHabits] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URI}/habits`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${user.credentials.username}:${user.credentials.password}`).toString('base64')}`
      },
    })
      .then((response) => response.json())
      .then((data) => setHabits(data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      {
        habits.map((habit) => (<div key={habit._id}>
          <p>Title: {habit.title}</p>
          <p>Description: {habit.description}</p>
          <p>Frequency: {habit.frequency}</p>
          <p>Worth: {habit.worth}</p>
          <p>Created: {new Date(habit.createdAt).toLocaleDateString()}</p>
          <p>Last modified: {new Date(habit.lastModifyDate).toLocaleDateString()}</p>
        </div>))
      }
    </>
  )
}

export default Habits
