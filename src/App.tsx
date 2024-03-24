import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Store from './pages/store'
import Settings from './pages/settings'
import Sidebar from './widgets/Sidebar'
import Habits from './pages/habits'
import styles from './App.module.scss'
import Header from './widgets/Header'
import Me from './pages/me'
import Inbox from './pages/inbox'
import {
  useEffect,
  useRef,
} from 'react'

const App = () => {
  const page = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    page.current?.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Sidebar />
      <div ref={page} className={styles.base}>
        <Header />
        <main>
          <Routes>
            <Route path='/'>
              <Route index element={<Dashboard />} />
              <Route path='habits' element={<Habits />} />
              <Route path='store' element={<Store />} />
              <Route path='settings' element={<Settings />} />
              <Route path='inbox' element={<Inbox />} />
              <Route path='me' element={<Me />} />
            </Route>
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
