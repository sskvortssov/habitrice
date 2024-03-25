import styles from './index.module.scss'
import Habitrice from '#assets/Habitrice.svg?react'
import {
  Link,
  useLocation,
} from 'react-router-dom'
import React, {
  useEffect,
  useRef,
} from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import AirlineStopsRoundedIcon from '@mui/icons-material/AirlineStopsRounded'
import useMediaQuery from '@mui/material/useMediaQuery'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

const NavLink = ({ to, children }) => {
  const location = useLocation()

  return (
    <Link to={to} className={location.pathname === to ? styles.active : ''}>{children}</Link>
  )
}

const Sidebar = () => {
  const location = useLocation()
  const matches = useMediaQuery('(min-width: 768px)')
  const nav = useRef(null)

  useEffect(() => {
    if (document.querySelector(`.${styles.sidebar} nav a[href='${location.pathname}']`)) {
      nav.current?.style.setProperty('--navIndicatorOpacity', '.05')
      nav.current?.style.setProperty('--position', document.querySelector(`.${styles.sidebar} nav a[href='${location.pathname}']`)?.offsetTop + 'px')
    }
    else {
      nav.current?.style.removeProperty('--navIndicatorOpacity')
      nav.current?.style.setProperty('--position', '0px')
    }
  }, [location, matches])

  return (
    <>
      <div className={styles.sidebar}>
        <header>
          <Habitrice className={styles.logotype} width='100%' height='100%' />
        </header>
        <nav ref={nav}>
          <NavLink to='/'>
            <DashboardRoundedIcon />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to='/habits'>
            <AirlineStopsRoundedIcon />
            <span>Habits</span>
          </NavLink>
          <NavLink to='/store'>
            <StorefrontRoundedIcon />
            <span>Store</span>
          </NavLink>
          <NavLink to='/rating'>
            <TrendingUpIcon />
            <span>Rating</span>
          </NavLink>
          {
            matches ? <NavLink to='/settings'>
              <SettingsRoundedIcon />
              <span>Settings</span>
            </NavLink> : <NavLink to='/me'>
              <AccountCircleRoundedIcon />
              <span>Me</span>
            </NavLink>
          }
        </nav>
      </div>
    </>
  )
}

export default Sidebar
