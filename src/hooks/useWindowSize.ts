import { isServer } from '@/lib/utils'
import React, { useEffect } from 'react'

type Props = {}

const useWindowSize = () => {


  const [windowSize, setWindowSize] = React.useState(() => {
    if (isServer()) return { width: 0, height: 0 }
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  })

  useEffect(() => {
    // javascript pure function
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}

export default useWindowSize