import { Link } from 'react-router-dom'
import type { Cancha, Horario, Promocion, Servicio } from '@/types'
import { EstadoBadge, FieldArt, Icon } from './ui'
import { fechaCorta, fechaLarga, moneda, rangoHoras } from '@/utils/format'

export function CanchaCard({ cancha }: { cancha: Cancha }) {
  return (
    <article className="card-hover group flex flex-col overflow-hidden">
      <div className="relative h-40 overflow-hidden rounded-t-xl bg-slate-900">
        <FieldArt className="absolute inset-0 h-full w-full opacity-95"/>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"/>
        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <span className="chip bg-white/95 text-slate-800 ring-1 ring-inset ring-white/40">{cancha.tipo}</span>
          {!cancha.disponible && <span className="chip bg-amber-500 text-white">Mantenimiento</span>}
        </div>
        {cancha.capacidad > 0 && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-medium text-white">
            <Icon.users className="h-3.5 w-3.5"/> {cancha.capacidad} jug.
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15.5px] font-semibold text-slate-900">{cancha.nombre}</h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-[13.5px] leading-relaxed text-slate-500">{cancha.descripcion}</p>
        <div className="divider mt-4 pt-4 flex items-end justify-between">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400">Tarifa / hora</p>
            <p className="num mt-1 text-[19px] font-semibold text-slate-900">{moneda(cancha.precioHora)}</p>
          </div>
          <Link to={`/canchas/${cancha.id}`} className="btn-outline">
            Ver detalle <Icon.arrowRight className="h-3.5 w-3.5"/>
          </Link>
        </div>
      </div>
    </article>
  )
}

export function HorarioCard({ horario }: { horario: Horario }) {
  const reservado = horario.estado !== 'disponible'
  return (
    <article className="card-hover flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{fechaCorta(horario.fecha)}</p>
          <h3 className="num mt-1.5 text-[17px] font-semibold text-slate-900">{rangoHoras(horario.horaInicio, horario.horaFin)}</h3>
        </div>
        <EstadoBadge estado={horario.estado}/>
      </div>
      <div className="divider mt-4 pt-4 grid grid-cols-2 gap-3.5">
        <div>
          <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400"><Icon.ball className="h-3 w-3"/> Cancha</p>
          <p className="mt-1 truncate text-[13.5px] font-medium text-slate-800">{horario.canchaNombre}</p>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400"><Icon.clock className="h-3 w-3"/> Duracion</p>
          <p className="num mt-1 text-[13.5px] font-medium text-slate-800">{horario.duracionMin} min</p>
        </div>
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400">Tarifa</p>
          <p className="num mt-1 text-[20px] font-semibold text-brand-700">{moneda(horario.precio)}</p>
        </div>
        <Link to={`/disponibilidad/${horario.id}`} className={reservado ? 'btn-outline' : 'btn-accent'}>
          {reservado ? 'Ver detalle' : 'Reservar'} <Icon.arrowRight className="h-3.5 w-3.5"/>
        </Link>
      </div>
    </article>
  )
}

const ICONO_POR_CATEGORIA: Record<string, (p: { className?: string }) => JSX.Element> = {
  Alquiler: (p) => <Icon.ball {...p}/>,
  Eventos: (p) => <Icon.trophy {...p}/>,
  Entrenamiento: (p) => <Icon.whistle {...p}/>,
  Instalaciones: (p) => <Icon.car {...p}/>,
}

export function ServicioCard({ servicio }: { servicio: Servicio }) {
  const Icono = ICONO_POR_CATEGORIA[servicio.categoria] ?? ((p) => <Icon.sparkles {...p}/>)
  return (
    <article className="card-hover flex flex-col p-5">
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white"><Icono className="h-5 w-5"/></span>
        <span className="chip-mono">{servicio.categoria}</span>
      </div>
      <h3 className="mt-4 text-[15.5px] font-semibold text-slate-900">{servicio.nombre}</h3>
      <p className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-slate-500">{servicio.descripcion}</p>
      <div className="divider mt-4 pt-4 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Precio</span>
        <span className={`num text-[14.5px] font-semibold ${servicio.precio > 0 ? 'text-slate-900' : 'text-brand-700'}`}>
          {servicio.precio > 0 ? moneda(servicio.precio) : 'Incluido'}
        </span>
      </div>
    </article>
  )
}

export function PromocionCard({ promocion }: { promocion: Promocion }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-900 p-6 text-white shadow-soft hover:shadow-lift">
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-500/20 blur-3xl"/>
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="chip bg-white/10 text-white ring-1 ring-inset ring-white/20"><Icon.tag className="h-3 w-3"/> {promocion.descuento > 0 ? `-${promocion.descuento}%` : 'Promo'}</span>
          {promocion.vigencia && <span className="text-[11px] text-white/60">Hasta {fechaLarga(promocion.vigencia).split(' de ').slice(-2).join(' de ')}</span>}
        </div>
        <h3 className="mt-5 text-[19px] font-semibold leading-tight">{promocion.titulo}</h3>
        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-white/70">{promocion.descripcion}</p>
        <Link to="/disponibilidad" className="btn-md mt-6 bg-white text-slate-900 hover:bg-slate-100">Aprovechar promo <Icon.arrowRight className="h-3.5 w-3.5"/></Link>
      </div>
    </article>
  )
}