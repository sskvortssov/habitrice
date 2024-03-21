import styles from './index.module.scss'
import InboxRoundedIcon from '@mui/icons-material/InboxRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { Link, useLocation } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import Habitrice from '#assets/Habitrice.svg?react'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'

const NavLink = ({ to, children }: {
  to: string,
  children: React.ReactNode,
}) => {
  const location = useLocation()

  return (
    <Link to={to} className={location.pathname === to ? styles.active : ''}>{children}</Link>
  )
}

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
            <NavLink to='/inbox'><InboxRoundedIcon /></NavLink>
            <NavLink to='/me'>
              <AccountCircleRoundedIcon />
              <span>Denis Skvortsov</span>
            </NavLink>
          </> : location.pathname === '/me' && <NavLink to='/settings'><SettingsRoundedIcon /></NavLink>
        }</div>
      </header>
    </>
  )
}

export default Header
