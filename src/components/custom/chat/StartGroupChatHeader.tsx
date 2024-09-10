import Button from "@/components/reutilizable/Button"
import { useState } from "react"


interface StartGroupChatHeaderProps {
  onConfirm: (name?: string) => void
  onClearSelection: () => void
}

const StartGroupChatHeader = ({ onConfirm, onClearSelection }: StartGroupChatHeaderProps) => {
  const [groupChatNameInput, setGroupChatNameInput] = useState<string>("")
  return (
    <div className="sticky top-0 z-10 flex flex-col gap-3 bg-white p-3 shadow-sm">
      <input
        type="text"
        placeholder="Group name"
        className="rounded border border-gray-300 p-2"
        value={groupChatNameInput}
        onChange={(e) => setGroupChatNameInput(e.target.value)}
      />
      <div className="flex justify-center gap-2">
        <Button onClick={() => onConfirm(groupChatNameInput)} disabled={!groupChatNameInput} className="py-2 bg-pink-300 text-white">Start group chat</Button>
        <Button onClick={onClearSelection} className="py-2 bg-gray-400 active:bg-gray-500">Cancel</Button>
      </div>
    </div>
  )
}

export default StartGroupChatHeader