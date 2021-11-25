import { useEffect } from 'react'

export default function useAsyncEffect(callback: () => Promise<any>, deps?: any[], cleanup?: () => void) {
  useEffect(() => {
    callback()
    return cleanup
  }, deps)
}
