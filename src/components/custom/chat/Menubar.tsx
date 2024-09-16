import { useTheme } from "@/app/ThemeProvider"
import PushSubscriptionToggleButton from "@/components/reutilizable/PushSubscriptionToggleButton"
import ThemeToggleButton from "@/components/reutilizable/ThemeToggleButton"
import { UserButton } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Users } from "lucide-react"


interface MenuBarProps {
  onUserMenuClick: () => void
}

const Menubar = ({ onUserMenuClick }: MenuBarProps) => {
  const { theme } = useTheme()
  return (
    <div className="p-3 flex items-center justify-between gap-3 bg-white border-e border-e-[#DBDDE1] dark:bg-[#17191c] dark:border-e-gray-800">
      <UserButton signInUrl="/chat" appearance={{ baseTheme: theme === "dark" ? dark : undefined }} />
      <div className="flex gap-6">
        <PushSubscriptionToggleButton />
        <span title="Show users">
          <Users className="cursor-pointer" onClick={onUserMenuClick} />
        </span>
        <ThemeToggleButton />
      </div>
    </div>
  )
}

export default Menubar