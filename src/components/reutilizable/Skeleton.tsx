import { cn } from "@/lib/utils"


type Props = {
  className?: string
}

const Skeleton = ({ className }: Props) => {
  return (
    <div className={cn("bg-gray-200/70 animate-pulse", className)} />
  )
}

export default Skeleton