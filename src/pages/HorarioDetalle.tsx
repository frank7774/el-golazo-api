import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EmptyState, ErrorMessage, EstadoBadge, Icon, Loader } from '@/components/ui'
import { useFetch } from '@/hooks/useFetch'
import { getHorarioById } from '@/services/api'
import { fechaLarga, moneda, rangoHoras } from '@/utils/format'

export default function HorarioDetalle() {
  const { id = '' } = useParams()
  const { data: horario, loading, error, refetch } = useFetch(() => getHorarioById(id), [id])
  const [aviso, setAviso] = useState('')
  const solicitar = () => setAviso('Solicitud registrada. Confirmaremos por WhatsApp en minutos.')

  return (
    <div className="container-app py-10">
      <nav className="mb-8">
        <Link to="/disponibilidad" className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500 hover:text-slate-900">
          <Icon.arrowLeft className="h-3.5 w-3.5"/> Volver a horarios
        </Link>
      </nav>
      {loading && <Loader texto="Cargando detalle..."/>}
      {!loading && error && <ErrorMessage mensaje={error} onRetry={refetch}/>}
      {!loading && !error && !horario && <EmptyState titulo="Horario no encontrado"><Link to="/disponibilidad" className="btn-outline">Ver horarios</Link></EmptyState>}
      {!loading && !error && horario && (
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lift">
            <div className="relative bg-slate-950 px-6 py-10 sm:px-10 sm:py-12">
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-300">Detalle del horario</p>
                <h1 className="num mt-3 text-[34px] font-semibold text-white sm:text-[44px]">{rangoHoras(horario.horaInicio, horario.horaFin)}</h1>
                <p className="mt-2 text-[14px] text-slate-400">{fechaLarga(horario.fecha)}</p>
                <div className="mt-6"><EstadoBadge estado={horario.estado}/></div>
              </div>
            </div>
            <div className="grid gap-8 p-6 sm:grid-cols-2 sm:p-10">
              <div><p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Cancha</p><p className="mt-2 text-[16px] font-medium text-slate-900">{horario.canchaNombre}</p></div>
              <div><p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Duracion</p><p className="num mt-2 text-[16px] font-medium text-slate-900">{horario.duracionMin} minutos</p></div>
              <div><p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Tarifa</p><p className="num mt-2 text-[28px] font-semibold text-brand-700">{moneda(horario.precio)}</p></div>
              <div><p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Codigo</p><p className="mt-2 inline-flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-[13px] text-slate-600">#{horario.id}</p></div>
            </div>
            <div className="border-t border-slate-100 bg-slate-50/50 p-6 sm:p-10">
              {aviso && <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white"><Icon.check className="h-3 w-3"/></span><p className="text-[13.5px] font-medium text-emerald-900">{aviso}</p></div>}
              <div className="flex flex-wrap gap-3">
                <button type="button" className="btn-lg bg-slate-900 text-white disabled:bg-slate-300" disabled={horario.estado !== 'disponible'} onClick={solicitar}>
                  {horario.estado === 'disponible' ? <>Solicitar reserva <Icon.arrowRight className="h-4 w-4"/></> : 'No disponible'}
                </button>
                <Link to={`/canchas/${horario.canchaId}`} className="btn-lg btn-outline">Ver la cancha</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}