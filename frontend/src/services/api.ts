import type { Cancha, EstadoHorario, Horario, Promocion, Servicio } from '@/types'
import { ENDPOINTS } from './endpoints'
import { http } from './http'

type Raw = Record<string, any>

const pick = (o: Raw, keys: string[], fallback: any = ''): any => {
  for (const k of keys) { const v = o?.[k]; if (v !== undefined && v !== null && v !== '') return v }
  return fallback
}
const texto = (v: any, fallback = ''): string => {
  if (v === null || v === undefined) return fallback
  if (typeof v === 'object') return String(v.nombre ?? v.name ?? v.descripcion ?? fallback)
  return String(v)
}
const numero = (v: any, fallback = 0): number => {
  const n = Number(String(v ?? '').replace(/[^\d.-]/g, ''))
  return Number.isFinite(n) ? n : fallback
}
const listaTextos = (v: any): string[] => Array.isArray(v) ? v.map((x) => texto(x)).filter(Boolean) : []

function lista(payload: unknown): Raw[] {
  if (Array.isArray(payload)) return payload as Raw[]
  const o = payload as Raw
  for (const k of ['data', 'datos', 'results', 'items', 'content', 'value', 'rows'])
    if (Array.isArray(o?.[k])) return o[k] as Raw[]
  return []
}
function objeto(payload: unknown): Raw {
  if (Array.isArray(payload)) return (payload[0] ?? {}) as Raw
  const o = payload as Raw
  for (const k of ['data', 'datos', 'result', 'item', 'value'])
    if (o?.[k] && typeof o[k] === 'object') return o[k] as Raw
  return o ?? {}
}
const ESTADOS: Record<string, EstadoHorario> = {
  disponible: 'disponible', libres: 'disponible', libre: 'disponible', available: 'disponible', activo: 'disponible',
  reservado: 'reservado', ocupado: 'reservado', reserved: 'reservado', no_disponible: 'reservado',
  mantenimiento: 'mantenimiento', maintenance: 'mantenimiento', inactivo: 'mantenimiento',
}
const normalizarEstado = (v: any): EstadoHorario => ESTADOS[String(v ?? 'disponible').trim().toLowerCase()] ?? 'disponible'

const normalizarCancha = (o: Raw): Cancha => ({
  id: texto(pick(o, ['id', '_id', 'idCancha', 'codigo'])),
  nombre: texto(pick(o, ['nombre', 'name', 'nombreCancha', 'titulo']), 'Cancha'),
  tipo: texto(pick(o, ['tipo', 'tipoCancha', 'categoria', 'type']), 'Futbol'),
  descripcion: texto(pick(o, ['descripcion', 'description', 'detalle'], 'Sin descripcion disponible.')),
  precioHora: numero(pick(o, ['precioHora', 'precio', 'tarifa', 'precio_hora', 'price'])),
  capacidad: numero(pick(o, ['capacidad', 'aforo', 'capacity'])),
  imagen: texto(pick(o, ['imagen', 'image', 'foto', 'urlImagen'])),
  servicios: listaTextos(pick(o, ['servicios', 'services', 'caracteristicas'], [])),
  disponible: pick(o, ['disponible', 'estado'], 'disponible') !== 'mantenimiento',
})

const normalizarHorario = (o: Raw): Horario => {
  const inicio = texto(pick(o, ['horaInicio', 'hora_inicio', 'hora', 'inicio', 'startTime', 'start']))
  return {
    id: texto(pick(o, ['id', '_id', 'idHorario', 'codigo'])),
    canchaId: texto(pick(o, ['canchaId', 'idCancha', 'cancha_id', 'id_cancha'])),
    canchaNombre: texto(pick(o, ['canchaNombre', 'nombreCancha', 'cancha', 'cancha_nombre']), 'Cancha'),
    fecha: texto(pick(o, ['fecha', 'date', 'dia'])).slice(0, 10),
    horaInicio: inicio.slice(0, 5),
    horaFin: texto(pick(o, ['horaFin', 'hora_fin', 'fin', 'endTime', 'end'])).slice(0, 5),
    duracionMin: numero(pick(o, ['duracionMin', 'duracion', 'duracion_minutos', 'duration'], 60), 60),
    precio: numero(pick(o, ['precio', 'tarifa', 'costo', 'price'])),
    estado: normalizarEstado(pick(o, ['estado', 'status', 'disponibilidad', 'state'])),
  }
}

const normalizarServicio = (o: Raw): Servicio => ({
  id: texto(pick(o, ['id', '_id', 'idServicio', 'codigo'])),
  nombre: texto(pick(o, ['nombre', 'name', 'servicio', 'titulo']), 'Servicio'),
  descripcion: texto(pick(o, ['descripcion', 'description', 'detalle'], 'Sin descripcion.')),
  icono: texto(pick(o, ['icono', 'icon', 'emoji']), 'star'),
  precio: numero(pick(o, ['precio', 'tarifa', 'costo', 'price'])),
  categoria: texto(pick(o, ['categoria', 'category', 'tipo', 'grupo']), 'General'),
})

const normalizarPromocion = (o: Raw): Promocion => ({
  id: texto(pick(o, ['id', '_id', 'idPromocion', 'codigo'])),
  titulo: texto(pick(o, ['titulo', 'nombre', 'title', 'promocion']), 'Promocion'),
  descripcion: texto(pick(o, ['descripcion', 'description', 'detalle'], '')),
  descuento: numero(pick(o, ['descuento', 'porcentaje', 'discount'])),
  vigencia: texto(pick(o, ['vigencia', 'fechaFin', 'validoHasta', 'hasta'])).slice(0, 10),
})

export async function getCanchas(): Promise<Cancha[]> {
  const raw = await http<unknown>(ENDPOINTS.canchas)
  return lista(raw).map(normalizarCancha)
}
export async function getCanchaById(id: string): Promise<Cancha | null> {
  try {
    const raw = await http<unknown>(`${ENDPOINTS.canchas}/${encodeURIComponent(id)}`)
    return normalizarCancha(objeto(raw))
  } catch {
    const todas = await getCanchas()
    return todas.find((c) => c.id === id) ?? null
  }
}
export async function getHorarios(): Promise<Horario[]> {
  const raw = await http<unknown>(ENDPOINTS.horarios)
  return lista(raw).map(normalizarHorario)
}
export async function getHorarioById(id: string): Promise<Horario | null> {
  try {
    const raw = await http<unknown>(`${ENDPOINTS.horarios}/${encodeURIComponent(id)}`)
    return normalizarHorario(objeto(raw))
  } catch {
    const todos = await getHorarios()
    return todos.find((h) => h.id === id) ?? null
  }
}
export async function getServicios(): Promise<Servicio[]> {
  const raw = await http<unknown>(ENDPOINTS.servicios)
  return lista(raw).map(normalizarServicio)
}
export async function getPromociones(): Promise<Promocion[]> {
  const raw = await http<unknown>(ENDPOINTS.promociones)
  return lista(raw).map(normalizarPromocion)
}
export const usandoMock = false