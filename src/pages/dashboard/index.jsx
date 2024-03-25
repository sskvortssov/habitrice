import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { ProfileContext } from '#providers/ProfileProvider'

const Dashboard = () => {
  const habitTitle = useRef(null)
  const habitDescription = useRef(null)
  const habitFrequency = useRef(null)
  const habitWorth = useRef(null)
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
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setHabits(data))
      .catch((error) => console.error(error))
  }, [user.credentials])

  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.workspace}>
          <div className={styles.brief}>
            <h2>Today <span>October 26</span></h2>
            <button onClick={() => addHabit()}>Add habit</button>
          </div>
          <div className={styles.newHabit}>
            <label>
              <span>Title <span style={{opacity: .3}}>(1-64 symbols)</span>: </span>
              <input type='text' minLength={1} maxLength={64} ref={habitTitle} />
            </label>
            <label>
              <span>Description <span style={{opacity: .3}}>(up to 512 symbols)</span>: </span>
              <textarea minLength={1} maxLength={64} ref={habitDescription} />
            </label>
            <label>
              <span>Frequency: </span>
              <select defaultValue='day' ref={habitFrequency}>{
                ['day', 'week', 'month'].map((option) => (<option key={option} value={option}>{option}</option>))
              }</select>
            </label>
            <label>
              <span>Worth <span style={{opacity: .3}}>(at least 0)</span>: </span>
              <input type='number' defaultValue={1} min={0} step={1} ref={habitWorth} />
            </label>
          </div>
          {
            habits.map((habit) => (<div key={habit._id}>
              <p>Title: {habit?.title}</p>
              <p>Description: {habit?.description}</p>
              <p>Frequency: {habit?.frequency}</p>
              <p>Worth: {habit?.worth}</p>
              <p>Created: {new Date(new Date(habit.createdAt).getTime() + -(new Date().getTimezoneOffset()/60) * 3600 * 1000).toUTCString().replace('GMT', '')}</p>
              <p>Last modified: {new Date(new Date(habit.lastModifyDate).getTime() + -(new Date().getTimezoneOffset()/60) * 3600 * 1000).toUTCString().replace('GMT', '')}</p>
              <button onClick={() => deleteHabit(habit)}>Delete habit</button>
            </div>))
          }
        </div>
        <div className={styles.extra}>

        </div>
      </div>
    </>
  )
}

export default Dashboard
