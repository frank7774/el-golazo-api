const BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')
const TIMEOUT_MS = 15000

export class ApiError extends Error {
  status: number
  constructor(message: string, status = 0) {
    super(message); this.name = 'ApiError'; this.status = status
  }
}

export async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
      signal: controller.signal,
    })
    if (!res.ok) {
      if (res.status === 404) throw new ApiError('El recurso solicitado no existe.', 404)
      if (res.status === 401 || res.status === 403) throw new ApiError('No autorizado para consultar este recurso.', res.status)
      if (res.status >= 500) throw new ApiError('El servidor presento un error. Intenta nuevamente en unos minutos.', res.status)
      throw new ApiError(`No se pudo obtener la informacion (codigo ${res.status}).`, res.status)
    }
    const texto = await res.text()
    if (!texto) return [] as unknown as T
    return JSON.parse(texto) as T
  } catch (e) {
    if (e instanceof ApiError) throw e
    if ((e as Error).name === 'AbortError')
      throw new ApiError('La solicitud tardo demasiado. Verifica tu conexion a internet.')
    throw new ApiError('No se pudo conectar con el servidor. Revisa tu conexion e intentalo de nuevo.')
  } finally { clearTimeout(timer) }
}