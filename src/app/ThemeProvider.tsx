'use client'

import { isServer } from "@/lib/utils"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

// TODO - We create our own theme provider for learning purposes. In a real-world application, consider using next-themes for better functionality.
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
  const providerValue = useMemo<ThemeContext>( // ? This hook will only run when the theme changes.
    () => ({ theme, setTheme }),
    [theme])

  return (
    <ThemeContext.Provider value={providerValue} >
      {children}
    </ThemeContext.Provider>
  )

}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

/* 

Ventajas de usar useMemo:
Optimización de rendimiento:

useMemo almacena el valor "memorizado" (en este caso, { theme, setTheme }), y solo lo recalcula cuando alguna de las dependencias especificadas cambia (theme o setTheme).
Sin useMemo, el objeto { theme, setTheme } se recrea en cada renderización del componente. Esto puede ser ineficiente si el componente se renderiza muchas veces, ya que cada vez se está generando un nuevo objeto.
Evitación de renders innecesarios:

Al usar useMemo, garantizas que el objeto providerValue será el mismo en la memoria (referencia) mientras theme y setTheme no cambien. Esto es especialmente útil cuando providerValue es pasado 
a un Context.Provider (como en un contexto de React), ya que los consumidores del contexto solo volverán a renderizarse si el valor cambia.
Sin useMemo, un nuevo objeto se crea en cada renderización, incluso si theme y setTheme no cambian. Esto puede causar renderizados innecesarios de los componentes que consumen el valor del contexto, 
impactando el rendimiento general.

Persistencia de referencias:
En React, la comparación de objetos se hace por referencia, no por valor. Si el objeto cambia en cada render (lo que sucede si no usas useMemo), React interpretará que es un nuevo valor, forzando actualizaciones 
de componentes dependientes. useMemo asegura que la referencia no cambie innecesariamente.

Mejor experiencia en aplicaciones complejas:
En aplicaciones con muchos componentes y renders frecuentes, el uso de useMemo ayuda a controlar cuándo realmente necesitas actualizar partes específicas de la UI. Esto reduce la carga de renderizados 
innecesarios y mejora la respuesta de la aplicación.

*/