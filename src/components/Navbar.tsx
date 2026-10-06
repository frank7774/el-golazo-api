import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Icon } from './ui'
const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/canchas', label: 'Catalogo' },
  { to: '/disponibilidad', label: 'Horarios' },
  { to: '/servicios', label: 'Servicios' },
]
export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const clase = ({ isActive }: { isActive: boolean }) =>
    `relative rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <nav className="container-app flex h-[60px] items-center justify-between gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setAbierto(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white"><Icon.ball className="h-[18px] w-[18px]"/></span>
          <span className="leading-none">
            <span className="block text-[14.5px] font-semibold tracking-[-0.02em] text-slate-900">El Golazo</span>
            <span className="mt-0.5 block text-[10.5px] font-medium uppercase tracking-[0.14em] text-slate-400">Cancha de futbol</span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (<NavLink key={l.to} to={l.to} end={l.end} className={clase}>{l.label}</NavLink>))}
        </div>
        <div className="hidden md:block">
          <Link to="/disponibilidad" className="btn-md bg-slate-900 text-white shadow-soft hover:bg-slate-800">Reservar <Icon.arrowRight className="h-3.5 w-3.5"/></Link>
        </div>
        <button type="button" className="btn-ghost md:hidden" aria-label="Menu" onClick={() => setAbierto((v) => !v)}>
          {abierto ? <Icon.close className="h-5 w-5"/> : <Icon.menu className="h-5 w-5"/>}
        </button>
      </nav>
      {abierto && (
        <div className="border-t border-slate-200/80 bg-white md:hidden">
          <div className="container-app flex flex-col gap-1 py-3">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setAbierto(false)}
                className={({ isActive }) => `rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}