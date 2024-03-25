import React, { useEffect, useState, useContext } from 'react';
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
          <p>Created: {new Date(new Date(habit.createdAt).getTime() + -(new Date().getTimezoneOffset()/60) * 3600 * 1000).toUTCString().replace('GMT', '')}</p>
          <p>Last modified: {new Date(new Date(habit.lastModifyDate).getTime() + -(new Date().getTimezoneOffset()/60) * 3600 * 1000).toUTCString().replace('GMT', '')}</p>
        </div>))
      }
    </>
  )
}

export default Habits
