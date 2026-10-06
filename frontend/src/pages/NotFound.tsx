import { Link } from 'react-router-dom'
import { Icon } from '@/components/ui'
export default function NotFound() {
  return (
    <div className="container-app flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-300 shadow-soft"><Icon.ball className="h-8 w-8"/></span>
      <p className="num mt-8 text-[80px] font-semibold leading-none text-slate-900 sm:text-[110px]">404</p>
      <h1 className="mt-4 text-[20px] font-semibold text-slate-900">Pagina no encontrada</h1>
      <p className="mt-3 max-w-md text-[13.5px] text-slate-500">La pagina que buscas no existe o fue movida.</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-accent">Volver al inicio <Icon.arrowRight className="h-3.5 w-3.5"/></Link>
        <Link to="/disponibilidad" className="btn-outline">Ver horarios</Link>
      </div>
    </div>
  )
}