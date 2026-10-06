import { Link } from 'react-router-dom'
import { PromocionCard, ServicioCard } from '@/components/Cards'
import { ErrorMessage, Icon, SkeletonGrid } from '@/components/ui'
import { useFetch } from '@/hooks/useFetch'
import { getCanchas, getHorarios, getPromociones, getServicios } from '@/services/api'
import { hoyISO, moneda } from '@/utils/format'

export default function Inicio() {
  const { data, loading, error, refetch } = useFetch(() => Promise.all([getCanchas(), getHorarios(), getServicios(), getPromociones()]), [])
  const [canchas = [], horarios = [], servicios = [], promociones = []] = data ?? []
  const hoy = hoyISO()
  const disponiblesHoy = horarios.filter((h) => h.fecha === hoy && h.estado === 'disponible').length
  const precioDesde = canchas.length ? Math.min(...canchas.map((c) => c.precioHora)) : 0
  const serviciosDestacados = servicios.slice(0, 6)

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.15),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(15,23,42,1),_rgba(2,6,23,1))]"/>
        <div className="container-app relative grid items-center gap-14 py-20 lg:grid-cols-[1.15fr_1fr] lg:py-28">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11.5px] font-medium text-brand-200">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400"/> Reservas en linea - 24/7
            </span>
            <h1 className="mt-6 text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-[52px] lg:text-[60px]">
              Tu cancha lista,<br/>
              <span className="bg-gradient-to-r from-brand-300 via-brand-200 to-emerald-200 bg-clip-text text-transparent">tu partido perfecto.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-slate-400">
              Consulta <strong className="font-medium text-white">horarios, disponibilidad y tarifas en tiempo real</strong>. Elige tu fecha y reserva en segundos.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/disponibilidad" className="btn-lg bg-white text-slate-900 hover:bg-slate-100">Ver disponibilidad <Icon.arrowRight className="h-4 w-4"/></Link>
              <Link to="/canchas" className="btn-lg border border-white/15 bg-white/5 text-white hover:bg-white/10">Explorar canchas</Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-300">Informacion destacada</h2>
              <span className="flex items-center gap-1.5 text-[11px] text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/> En vivo</span>
            </div>
            {error ? <p className="mt-5 text-[13.5px] text-red-300">{error}</p> : (
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7">
                {[
                  { v: loading ? '—' : canchas.length, l: 'Canchas disponibles' },
                  { v: loading ? '—' : disponiblesHoy, l: 'Horas libres hoy' },
                  { v: loading ? '—' : servicios.length, l: 'Servicios ofrecidos' },
                  { v: loading || !precioDesde ? '—' : moneda(precioDesde), l: 'Tarifa desde /hora', accent: true },
                ].map((s, i) => (
                  <div key={i}>
                    <dd className={`num text-[32px] font-semibold leading-none ${s.accent ? 'text-brand-300' : 'text-white'}`}>{s.v}</dd>
                    <dt className="mt-2 text-[12px] leading-snug text-slate-400">{s.l}</dt>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      <section className="container-app py-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">La cancha</p>
            <h2 className="mt-3 text-[28px] font-semibold leading-tight text-slate-900 sm:text-[34px]">Una cancha pensada para jugar bien</h2>
            <p className="sub-section">Cesped sintetico de ultima generacion, iluminacion LED profesional, vestuarios equipados y estacionamiento privado.</p>
            <ul className="mt-9 grid gap-5 sm:grid-cols-2">
              {[
                { I: Icon.ball, t: 'Cesped premium', d: 'Fibras de 50 mm con relleno de caucho.' },
                { I: Icon.bulb, t: 'Iluminacion LED', d: 'Juega de noche como si fuera de dia.' },
                { I: Icon.drop, t: 'Vestuarios', d: 'Duchas con agua caliente y casilleros.' },
                { I: Icon.car, t: 'Estacionamiento', d: 'Zona vigilada para 40 vehiculos.' },
              ].map((f) => (
                <li key={f.t} className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"><f.I className="h-[18px] w-[18px]"/></span>
                  <div>
                    <p className="text-[13.5px] font-semibold text-slate-900">{f.t}</p>
                    <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">{f.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-lift">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#047857"/><stop offset="100%" stopColor="#022c22"/></linearGradient></defs>
              <rect width="400" height="300" fill="url(#g1)"/>
              <g stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.5" fill="none">
                <rect x="24" y="24" width="352" height="252"/>
                <line x1="200" y1="24" x2="200" y2="276"/>
                <circle cx="200" cy="150" r="40"/>
                <rect x="24" y="90" width="46" height="120"/>
                <rect x="330" y="90" width="46" height="120"/>
              </g>
            </svg>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/60">Complejo deportivo</p>
                <p className="mt-1 text-[18px] font-semibold text-white">El Golazo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-100/60 py-20">
        <div className="container-app">
          <p className="eyebrow">Ofertas activas</p>
          <h2 className="mt-3 text-[28px] font-semibold text-slate-900 sm:text-[34px]">Promociones vigentes</h2>
          <div className="mt-10">
            {loading ? <SkeletonGrid n={3}/> : error ? <ErrorMessage mensaje={error} onRetry={refetch}/> : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {promociones.map((p) => <PromocionCard key={p.id} promocion={p}/>)}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container-app py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Servicios</p>
            <h2 className="mt-3 text-[28px] font-semibold text-slate-900 sm:text-[34px]">Servicios principales</h2>
          </div>
          <Link to="/servicios" className="btn-outline">Ver todos <Icon.arrowRight className="h-3.5 w-3.5"/></Link>
        </div>
        <div className="mt-10">
          {loading ? <SkeletonGrid n={6}/> : error ? <ErrorMessage mensaje={error} onRetry={refetch}/> : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {serviciosDestacados.map((s) => <ServicioCard key={s.id} servicio={s}/>)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}