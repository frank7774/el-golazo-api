import { Link, useParams } from 'react-router-dom'
import { EmptyState, ErrorMessage, FieldArt, Icon, Loader } from '@/components/ui'
import { useFetch } from '@/hooks/useFetch'
import { getCanchaById } from '@/services/api'
import { moneda } from '@/utils/format'

export default function CanchaDetalle() {
  const { id = '' } = useParams()
  const { data: cancha, loading, error, refetch } = useFetch(() => getCanchaById(id), [id])
  return (
    <div className="container-app py-10">
      <nav className="mb-8">
        <Link to="/canchas" className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500 hover:text-slate-900">
          <Icon.arrowLeft className="h-3.5 w-3.5"/> Volver al catalogo
        </Link>
      </nav>
      {loading && <Loader texto="Cargando detalle..."/>}
      {!loading && error && <ErrorMessage mensaje={error} onRetry={refetch}/>}
      {!loading && !error && !cancha && <EmptyState titulo="Cancha no encontrada"><Link to="/canchas" className="btn-outline">Volver</Link></EmptyState>}
      {!loading && !error && cancha && (
        <>
          <header className="mb-10">
            <div className="flex items-center gap-2">
              <span className="chip-mono">{cancha.tipo}</span>
              {cancha.disponible ? <span className="chip bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200/70"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/> Operativa</span> : <span className="chip bg-amber-50 text-amber-700">Mantenimiento</span>}
            </div>
            <h1 className="mt-4 text-[32px] font-semibold text-slate-900 sm:text-[40px]">{cancha.nombre}</h1>
            <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-slate-500">{cancha.descripcion}</p>
          </header>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-lift">
              <FieldArt className="absolute inset-0 h-full w-full"/>
            </div>
            <aside className="panel">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500">Ficha tecnica</h2>
              <dl className="mt-6 space-y-5">
                <div className="flex justify-between border-b border-slate-100 pb-5">
                  <dt className="text-[13px] text-slate-500">Tarifa / hora</dt>
                  <dd className="num text-[18px] font-semibold text-slate-900">{moneda(cancha.precioHora)}</dd>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-5">
                  <dt className="text-[13px] text-slate-500">Capacidad</dt>
                  <dd className="text-[15px] font-medium text-slate-900">{cancha.capacidad || '—'} jugadores</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[13px] text-slate-500">Modalidad</dt>
                  <dd className="text-[15px] font-medium text-slate-900">{cancha.tipo}</dd>
                </div>
              </dl>
              {cancha.servicios.length > 0 && (
                <div className="mt-7 border-t border-slate-100 pt-6">
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500">Incluye</h3>
                  <ul className="mt-4 space-y-2.5">
                    {cancha.servicios.map((s) => (
                      <li key={s} className="flex items-center gap-2.5 text-[13.5px] text-slate-700">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-100 text-brand-700"><Icon.check className="h-2.5 w-2.5"/></span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Link to="/disponibilidad" className="btn-accent mt-7 w-full">Reservar esta cancha <Icon.arrowRight className="h-3.5 w-3.5"/></Link>
            </aside>
          </div>
        </>
      )}
    </div>
  )
}