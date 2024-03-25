import AuthorizationDialog from '#widgets/AuthorizationDialog'
import React, {
  createContext,
  useEffect,
  useState,
} from 'react'

const defaultContext = {
  credentials: {
    username: '',
    password: '',
  },
  _id: '',
  username: '',
  fullname: '',
  picture: '',
  permissions: 0,
  createdAt: '',
  lastModifyDate: '',
  __v: 0,
}

export const ProfileContext = createContext({
  user: defaultContext,
  setUser: () => {},
})

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(defaultContext)

  useEffect(() => {
    const credentials = JSON.parse(window.localStorage.getItem('CredentialsStore'))?._value

    if (credentials?.username && credentials?.password) fetch(`${import.meta.env.VITE_API_URI}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${credentials?.username}:${credentials?.password}`).toString('base64')}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data._id) setUser({
          ...data,
          credentials: credentials,
        })
      })
      .catch((error) => {
        setUser({})

        delete credentials._value

        window.localStorage.setItem('CredentialsStore', JSON.stringify({
          _value: {},
          _version: 1,
        }))

        console.error(error)
      })

    if (!credentials?.username && !credentials?.password && location.pathname !== '/') window.location.href = '/'
  }, [])

  return (
    <ProfileContext.Provider
      value={{
        user,
        setUser,
      }}
    >{
      user._id ? children : <AuthorizationDialog />
    }</ProfileContext.Provider>
  )
}
