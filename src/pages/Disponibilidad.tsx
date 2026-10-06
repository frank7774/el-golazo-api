import { useMemo, useState } from 'react'
import { HorarioCard } from '@/components/Cards'
import { EmptyState, ErrorMessage, Icon, SkeletonGrid } from '@/components/ui'
import { useFetch } from '@/hooks/useFetch'
import { getCanchas, getHorarios } from '@/services/api'
import { fechaLarga, hoyISO, moneda, sumarDiasISO } from '@/utils/format'
import type { EstadoHorario } from '@/types'

export default function Disponibilidad() {
  const { data, loading, error, refetch } = useFetch(() => Promise.all([getHorarios(), getCanchas()]), [])
  const [horarios = [], canchas = []] = data ?? []
  const [fecha, setFecha] = useState(hoyISO())
  const [canchaId, setCanchaId] = useState('todas')
  const [estado, setEstado] = useState<'todos' | EstadoHorario>('todos')
  const [precioMax, setPrecioMax] = useState(0)
  const [orden, setOrden] = useState<'hora' | 'precio'>('hora')

  const precioTope = useMemo(() => (horarios.length ? Math.max(...horarios.map((h) => h.precio)) : 0), [horarios])
  const filtrados = useMemo(() => {
    const r = horarios.filter((h) => {
      const cf = !fecha || h.fecha === fecha
      const cc = canchaId === 'todas' || h.canchaId === canchaId
      const ce = estado === 'todos' || h.estado === estado
      const cp = !precioMax || h.precio <= precioMax
      return cf && cc && ce && cp
    })
    return r.sort((a, b) => orden === 'precio' ? a.precio - b.precio : a.horaInicio.localeCompare(b.horaInicio))
  }, [horarios, fecha, canchaId, estado, precioMax, orden])
  const disponibles = filtrados.filter((h) => h.estado === 'disponible').length
  const limpiar = () => { setFecha(hoyISO()); setCanchaId('todas'); setEstado('todos'); setPrecioMax(0); setOrden('hora') }

  return (
    <div className="container-app py-12">
      <header className="mb-10">
        <p className="eyebrow">Horarios y disponibilidad</p>
        <h1 className="mt-3 text-[32px] font-semibold text-slate-900 sm:text-[40px]">Consulta y reserva tu hora</h1>
        <p className="sub-section">Filtra por fecha, cancha, estado y tarifa.</p>
      </header>

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-1 items-center gap-3 sm:min-w-[280px]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white"><Icon.calendar className="h-[18px] w-[18px]"/></span>
            <div className="min-w-0 flex-1">
              <label className="label mb-1">Fecha</label>
              <input type="date" className="input" value={fecha} min={hoyISO()} onChange={(e) => setFecha(e.target.value)}/>
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            {[0, 1, 2, 3, 4].map((d) => {
              const f = sumarDiasISO(d)
              const activo = fecha === f
              return (
                <button key={f} type="button" onClick={() => setFecha(f)}
                  className={`rounded-lg px-3 py-2 text-[12.5px] font-medium transition-all ${activo ? 'bg-slate-900 text-white shadow-soft' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>
                  {d === 0 ? 'Hoy' : d === 1 ? 'Manana' : fechaLarga(f).split(',')[0]}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="panel mb-10">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2"><Icon.filter className="h-4 w-4 text-slate-400"/><h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500">Refinar busqueda</h2></div>
          {(canchaId !== 'todas' || estado !== 'todos' || precioMax > 0) && <button type="button" className="btn-sm text-slate-500" onClick={limpiar}><Icon.close className="h-3.5 w-3.5"/> Limpiar</button>}
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="label">Cancha</label>
            <select className="input" value={canchaId} onChange={(e) => setCanchaId(e.target.value)}>
              <option value="todas">Todas</option>
              {canchas.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Disponibilidad</label>
            <select className="input" value={estado} onChange={(e) => setEstado(e.target.value as any)}>
              <option value="todos">Todos</option>
              <option value="disponible">Solo disponibles</option>
              <option value="reservado">Reservados</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
          </div>
          <div>
            <label className="label">Ordenar por</label>
            <select className="input" value={orden} onChange={(e) => setOrden(e.target.value as any)}>
              <option value="hora">Hora</option>
              <option value="precio">Precio</option>
            </select>
          </div>
          <div>
            <label className="label flex items-center justify-between"><span>Tarifa max</span><span className={`num text-[12px] font-semibold ${precioMax > 0 ? 'text-brand-700' : 'text-slate-400'}`}>{precioMax > 0 ? moneda(precioMax) : 'Sin limite'}</span></label>
            <input type="range" className="mt-4 w-full accent-brand-600" min={0} max={precioTope || 200} step={10} value={precioMax} onChange={(e) => setPrecioMax(Number(e.target.value))}/>
          </div>
        </div>
      </section>

      {!loading && !error && (
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Resultados para</p>
            <h2 className="mt-1.5 text-[22px] font-semibold text-slate-900">{fechaLarga(fecha)}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-2.5"><p className="text-[10.5px] font-semibold uppercase text-slate-400">Disponibles</p><p className="num mt-0.5 text-[18px] font-semibold text-emerald-600">{disponibles}</p></div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-2.5"><p className="text-[10.5px] font-semibold uppercase text-slate-400">Total</p><p className="num mt-0.5 text-[18px] font-semibold text-slate-900">{filtrados.length}</p></div>
          </div>
        </div>
      )}

      {loading && <SkeletonGrid n={6}/>}
      {!loading && error && <ErrorMessage mensaje={error} onRetry={refetch}/>}
      {!loading && !error && filtrados.length === 0 && <EmptyState titulo="No hay horarios para esta busqueda" descripcion="Intenta con otra combinacion."><button type="button" className="btn-accent" onClick={limpiar}>Restablecer filtros</button></EmptyState>}
      {!loading && !error && filtrados.length > 0 && <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtrados.map((h) => <HorarioCard key={h.id} horario={h}/>)}</div>}
    </div>
  )
}