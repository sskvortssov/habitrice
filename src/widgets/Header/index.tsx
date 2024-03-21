import styles from './index.module.scss'
import InboxRoundedIcon from '@mui/icons-material/InboxRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { Link, useLocation } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import Habitrice from '#assets/Habitrice.svg?react'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'

const Header = () => {
  const matches = useMediaQuery('(min-width: 768px)')
  const location = useLocation()

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>{
          !matches && <Habitrice className={styles.logotype} width='100%' height='100%' />
        }</div>
        <div className={styles.extraNav}>{
          matches ? <>
            <Link to='/inbox'><InboxRoundedIcon /></Link>
            <Link to='/me'>Denis Skvortsov <AccountCircleRoundedIcon /></Link>
          </> : location.pathname === '/me' && <Link to='/settings'><SettingsRoundedIcon /></Link>
        }</div>
      </header>
    </>
  )
}

export default Header
