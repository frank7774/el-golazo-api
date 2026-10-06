import { useCallback, useEffect, useRef, useState } from 'react'
interface Estado<T> { data: T | null; loading: boolean; error: string | null }
export function useFetch<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [estado, setEstado] = useState<Estado<T>>({ data: null, loading: true, error: null })
  const fnRef = useRef(fn)
  fnRef.current = fn
  const ejecutar = useCallback(async () => {
    setEstado((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const data = await fnRef.current()
      setEstado({ data, loading: false, error: null })
    } catch (e) {
      setEstado({ data: null, loading: false, error: (e as Error).message })
    }
  }, deps)
  useEffect(() => { ejecutar() }, [ejecutar])
  return { ...estado, refetch: ejecutar }
}