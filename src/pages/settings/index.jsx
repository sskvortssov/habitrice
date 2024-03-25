import styles from './index.module.scss'
import React, { useContext } from 'react'
import { ThemeContext } from '#providers/ThemeProvider'

const Settings = () => {
  const { colorScheme, setColorScheme } = useContext(ThemeContext)

  return (
    <>
      <label>
        <span>Color scheme: </span>
        <select defaultValue={colorScheme} onChange={(event) => setColorScheme(event.target.value)}>{
          ['system', 'light', 'dark'].map((option) => (<option key={option} value={option}>{option}</option>))
        }</select>
      </label>
    </>
  )
}

export default Settings
