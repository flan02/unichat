import { useTheme } from "@/app/ThemeProvider"
import { MoonIcon, Sun } from "lucide-react"


type Props = {}

const ThemeToggleButton = (props: Props) => {
  const { theme, setTheme } = useTheme()
  if (theme === "dark") {
    return (
      <span title="Enable light theme">
        <MoonIcon className="cursor-pointer text-black dark:text-white" onClick={() => setTheme("light")} />
      </span>
    )
  }
  return (
    <span title="Enable dark theme">
      <Sun className="cursor-pointer text-black dark:text-white" onClick={() => setTheme("dark")} />
    </span>
  )
}

export default ThemeToggleButton