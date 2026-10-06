import { Link } from 'react-router-dom'
import { Icon } from './ui'
export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="container-app grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white"><Icon.ball className="h-[18px] w-[18px]"/></span>
            <span className="text-[14.5px] font-semibold text-slate-900">El Golazo</span>
          </div>
          <p className="mt-4 text-[13.5px] leading-relaxed text-slate-500">La cancha sintetica mejor equipada de la ciudad.</p>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Explorar</h4>
          <ul className="mt-4 space-y-2.5 text-[13.5px] text-slate-600">
            <li><Link to="/canchas" className="hover:text-slate-900">Catalogo</Link></li>
            <li><Link to="/disponibilidad" className="hover:text-slate-900">Horarios</Link></li>
            <li><Link to="/servicios" className="hover:text-slate-900">Servicios</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Contacto</h4>
          <ul className="mt-4 space-y-2.5 text-[13.5px] text-slate-600">
            <li className="flex items-center gap-2.5"><Icon.pin className="h-4 w-4 text-slate-400"/> Av. Los Deportistas 123</li>
            <li className="flex items-center gap-2.5"><Icon.phone className="h-4 w-4 text-slate-400"/> +51 999 888 777</li>
            <li className="flex items-center gap-2.5"><Icon.mail className="h-4 w-4 text-slate-400"/> reservas@elgolazo.pe</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Atencion</h4>
          <ul className="mt-4 space-y-2.5 text-[13.5px] text-slate-600">
            <li className="flex items-center gap-2.5"><Icon.clock className="h-4 w-4 text-slate-400"/> Lun-Vie 7:00-23:00</li>
            <li className="flex items-center gap-2.5"><Icon.clock className="h-4 w-4 text-slate-400"/> Sab 7:00-23:00</li>
            <li className="flex items-center gap-2.5"><Icon.clock className="h-4 w-4 text-slate-400"/> Dom 8:00-22:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="container-app flex flex-col items-center justify-between gap-3 py-5 text-[12.5px] text-slate-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} El Golazo - Todos los derechos reservados.</p>
          <p className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/> Datos en vivo desde la API REST</p>
        </div>
      </div>
    </footer>
  )
}