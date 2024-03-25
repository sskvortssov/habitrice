import React, { createContext, useState, useEffect } from 'react'

const defaultContext = {
  colorScheme: JSON.parse(window.localStorage.getItem('PreferencesStore'))?._state.theme || 'system',
  setColorScheme: () => {},
}

export const ThemeContext = createContext(defaultContext)

export const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(defaultContext.colorScheme)

  useEffect(() => {
    window.localStorage.setItem('PreferencesStore', JSON.stringify({
      _state: {
        ...JSON.parse(window.localStorage.getItem('PreferencesStore'))?._state,
        theme: colorScheme,
      },
      _version: 1,
    }))

    document.documentElement.dataset.theme = colorScheme
  }, [colorScheme])

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
