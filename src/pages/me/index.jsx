import { useContext, useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { ProfileContext } from '#providers/ProfileProvider'

const Me = () => {
  const { user, setUser } = useContext(ProfileContext)
  const username = useRef(null)
  const fullname = useRef(null)
  const pronouns = useRef(null)
  const picture = useRef(null)
  const [castPicture, setCastPicture] = useState(null)

  const getPicture = (source) => {
    return new Promise((res) => {
      const reader = new FileReader()

      reader.addEventListener('load', () => res(reader.result))

      if (source.files[0]) {
        reader.readAsDataURL(source.files[0])
      } else res()
    })
  }

  const removeProfilePicture = async () => {
    await fetch(`${import.meta.env.VITE_API_URI}/users/${user._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${Buffer.from(`${user.credentials.username}:${user.credentials.password}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        picture: '',
      }),
    })
      .then((response) => response.json())
      .then((data) => data._id && setUser({
        ...data,
        credentials: {
          username: data.username,
          password: user.credentials.password,
        },
      }))
      .catch((error) => console.error(error))
  }

  const updateProfile = async () => {
    await fetch(`${import.meta.env.VITE_API_URI}/users/${user._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${Buffer.from(`${user.credentials.username}:${user.credentials.password}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.current.value,
        fullname: fullname.current.value,
        pronouns: pronouns.current.value,
        picture: await getPicture(picture.current),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data._id) {
          setUser({
            ...data,
            credentials: {
              username: data.username,
              password: user.credentials.password,
            },
          })

          window.localStorage.setItem('CredentialsStore', JSON.stringify({
            _value: {
              username: data.username,
              password: user.credentials.password,
            },
            _version: 1,
          }))
        }
      })
      .catch((error) => console.error(error))

    await setCastPicture()
    picture.current.value = ''
  }

  const deleteProfile = async () => {
    await fetch(`${import.meta.env.VITE_API_URI}/users/${user._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Basic ${Buffer.from(`${user.credentials.username}:${user.credentials.password}`).toString('base64')}`
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data._id) {
            setUser({})

            window.localStorage.setItem('CredentialsStore', JSON.stringify({
              _value: {},
              _version: 1,
            }))
          }
        })
        .catch((error) => console.error(error))
  }

  const logOut = async () => {
    setUser({})

    window.localStorage.setItem('CredentialsStore', JSON.stringify({
      _value: {},
      _version: 1,
    }))
  }

  const selectCastPicture = async () => {
    if (picture.current.files[0].size > 12*1024*1024 || !picture.current.files[0].type.match(/^image\/.*$/)) return await removeCastPicture()

    await setCastPicture(await getPicture(picture.current))
  }

  const removeCastPicture = async () => {
    await setCastPicture()
    picture.current.value = ''
  }

  return (
    <>
      <div className={styles.profileSettings}>
        <label>
          <span>Username <span style={{opacity: .3}}>(4-24 symbols)</span>: </span>
          <input type='text' minLength={4} maxLength={24} defaultValue={user?.username} ref={username} />
        </label>
        <label>
          <span>Fullname <span style={{opacity: .3}}>(up to 48 symbols)</span>: </span>
          <input type='text' maxLength={48} defaultValue={user?.fullname} ref={fullname} />
        </label>
        <label>
          <span>Pronouns <span style={{opacity: .3}}>(up to 24 symbols)</span>: </span>
          <input type='text' maxLength={24} defaultValue={user?.pronouns} ref={pronouns} />
        </label>
        <label>
          <span>Picture <span style={{opacity: .3}}>(up to 12mb)</span>: </span>
          <input type='file' accept='image/*' ref={picture} onChange={async () => await selectCastPicture()} />
          {(castPicture || user?.picture) && <img className={styles.castProfilePicture} src={castPicture || user?.picture} alt='Profile Picture' />}
        </label>
        {(castPicture || user?.picture) && <button onClick={async () => castPicture ? await removeCastPicture() : await removeProfilePicture()}>{castPicture ? 'Cancel selection' : 'Remove picture'}</button>}
        <button onClick={() => updateProfile()}>Save</button>
        <button onClick={() => deleteProfile()}>Delete profile</button>
        <button onClick={() => logOut()}>Log out</button>
      </div>
    </>
  )
}

export default Me
