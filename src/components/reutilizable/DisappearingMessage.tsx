import { useEffect, useState } from "react"


interface DisappearingMessageProps {
  children: React.ReactNode
  duration?: number
  className?: string
}

const DisappearingMessage = ({ children, duration = 5000, className }: DisappearingMessageProps) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timeout)
  }, [duration]) // ? useEffect will run only when duration changes. Its clear the previous timeout and set a new one

  return (
    <div className={`${visible ? "opacity-100" : "opacity-0"} w-max transition-opacity duration-500 ${className}`}>
      {children}
    </div>
  )
}

export default DisappearingMessage