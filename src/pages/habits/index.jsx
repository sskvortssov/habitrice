import React, { useEffect, useState, useContext } from 'react';
import styles from './index.module.scss'
import { ProfileContext } from '#providers/ProfileProvider'

const Habits = () => {
  const { user, setUser } = useContext(ProfileContext)
  const [habits, setHabits] = useState([])

  const addHabit = () => {
    fetch(`${import.meta.env.VITE_API_URI}/habits`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${user.credentials.username}:${user.credentials.password}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: habitTitle.current?.value,
        description: habitDescription.current?.value,
        frequency: habitFrequency.current?.value,
        worth: habitWorth.current?.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => setHabits([
        ...habits,
        data,
      ]))
      .catch((error) => console.error(error))

    habitTitle.current.value = ''
    habitDescription.current.value = ''
    habitFrequency.current.value = 'day'
    habitWorth.current.value = habitWorth.current.defaultValue
  }

  const deleteHabit = (habit) => {
    fetch(`${import.meta.env.VITE_API_URI}/habits/${habit._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${Buffer.from(`${user.credentials.username}:${user.credentials.password}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setHabits([
        ...habits.filter((habit) => habit._id !== data._id),
      ]))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URI}/habits`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${user.credentials.username}:${user.credentials.password}`).toString('base64')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setHabits(data))
      .catch((error) => console.error(error))
  }, [user.credentials])

  return (
    <>
      <button onClick={() => addHabit()}>Add habit</button>
      {
        habits.map((habit) => (<div key={habit._id}>
          <p>Title: {habit.title}</p>
          <p>Description: {habit.description}</p>
          <p>Frequency: {habit.frequency}</p>
          <p>Worth: {habit.worth}</p>
          <p>Created: {new Date(new Date(habit.createdAt).getTime() + -(new Date().getTimezoneOffset()/60) * 3600 * 1000).toUTCString().replace('GMT', '')}</p>
          <p>Last modified: {new Date(new Date(habit.lastModifyDate).getTime() + -(new Date().getTimezoneOffset()/60) * 3600 * 1000).toUTCString().replace('GMT', '')}</p>
          <button onClick={() => deleteHabit(habit)}>Delete habit</button>
        </div>))
      }
    </>
  )
}

export default Habits
