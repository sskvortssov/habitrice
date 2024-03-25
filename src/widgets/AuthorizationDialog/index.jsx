import styles from './index.module.scss'
import Habitrice from '#assets/Habitrice.svg?react'
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useLocation } from 'react-router-dom'
import { ProfileContext } from '#providers/ProfileProvider'

const AuthorizationDialog = () => {
  const location = useLocation()
  const { user, setUser } = useContext(ProfileContext)
  const [mode, setMode] = useState('login')
  const username = useRef(null)
  const password = useRef(null)

  const logIn = async () => {
    await fetch(`${import.meta.env.VITE_API_URI}/users`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${Buffer.from(`${username.current.value}:${password.current.value}`).toString('base64')}`
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data._id) {
            setUser({
              ...data,
              credentials: {
                username: username.current.value,
                password: password.current.value,
              },
            })

            window.localStorage.setItem('CredentialsStore', JSON.stringify({
              _value: {
                username: username.current.value,
                password: password.current.value,
              },
              _version: 1,
            }))
          }
        })
        .catch((error) => console.error(error))
  }

  const signUp = async () => {
    await fetch(`${import.meta.env.VITE_API_URI}/users`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${username.current.value}:${password.current.value}`).toString('base64')}`
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data._id) {
            setUser({
              ...data,
              credentials: {
                username: username.current.value,
                password: password.current.value,
              },
            })

            window.localStorage.setItem('CredentialsStore', JSON.stringify({
              _value: {
                username: username.current.value,
                password: password.current.value,
              },
              _version: 1,
            }))
          }
        })
        .catch((error) => console.error(error))
  }

  return (
    <>
      <div className={styles.dialog}>
        <Habitrice className={styles.logotype} width='100%' height='100%' />
        <div className={styles.method}>
          <h2>{mode === 'login' ? 'Login' : mode === 'signup' && 'Signup'}</h2>
          <label>
            <span>Username <span style={{opacity: .3}}>(4-24 symbols)</span>: </span>
            <input type='text' minLength={4} maxLength={24} ref={username} />
          </label>
          <label>
            <span>Password <span style={{opacity: .3}}>(6-128 symbols)</span>: </span>
            <input type='password' minLength={6} maxLength={128} ref={password} />
          </label>
          <button onClick={() => mode === 'login' ? logIn() : mode === 'signup' && signUp()}>{mode === 'login' ? 'Log In' : mode === 'signup' && 'Sign Up'}</button>
          <button onClick={() => setMode((state) => state === 'login' ? 'signup' : state === 'signup' && 'login')}>{mode === 'login' ? 'I want to Sign Up' : mode === 'signup' && 'I want to Log In'}</button>
        </div>
      </div>
    </>
  )
}

export default AuthorizationDialog
