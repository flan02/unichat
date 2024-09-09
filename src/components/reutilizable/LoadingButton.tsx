import { ComponentPropsWithRef } from "react"
import Button from "./Button"
import { LoadingIndicator } from "stream-chat-react"


interface LoadingButtonProps extends ComponentPropsWithRef<"button"> {
  loading: boolean
}

// * The LoadingButton component is a button that shows a loading indicator when the loading prop is true.
const LoadingButton = ({ loading, ...props }: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={loading} >
      {loading ? <LoadingIndicator /> : props.children}
    </Button>
  )
}

export default LoadingButton