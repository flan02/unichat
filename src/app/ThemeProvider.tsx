'use client'

import { isServer } from "@/lib/utils"
import React, { createContext, useEffect, useMemo, useState } from "react"

type Theme = "light" | "dark"
interface ThemeContext {
  theme: Theme
  setTheme: (theme: Theme) => void
}
const ThemeContext = createContext<ThemeContext | null>(null)
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (isServer()) return "light"
    return (localStorage.getItem("theme") as Theme) || "light"
  })

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark") // $ Access the root element of the document <HTML></HTML>
    document.documentElement.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme]) // ? This effect will run every time the theme changes.

  //const providerValue = { theme, setTheme }
  const providerValue = useMemo<ThemeContext>(
    () => ({ theme, setTheme }),
    [theme, setTheme])

  return (
    <ThemeContext.Provider value={providerValue} >
      {children}
    </ThemeContext.Provider>
  )

}