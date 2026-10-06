import type { ReactNode } from 'react'
import type { EstadoHorario } from '@/types'

type IconProps = { className?: string }

export const Icons = {
  ball: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7l2.4 1.7-.9 2.8h-3l-.9-2.8L12 7z"/><path d="M3.5 9.5l2.5-.5M20.5 9.5l-2.5-.5M6 20l1.5-2M18 20l-1.5-2M12 21v-3"/></svg>),
  calendar: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 3v3M16 3v3"/></svg>),
  clock: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>),
  users: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M16 19v-1.5a4 4 0 00-4-4H6a4 4 0 00-4 4V19"/><circle cx="9" cy="7" r="3.25"/><path d="M22 19v-1.5a4 4 0 00-3-3.87M16 4.13a4 4 0 010 7.75"/></svg>),
  pin: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>),
  phone: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 5.5c0-1 .8-1.8 1.8-1.8h2.1c.8 0 1.5.5 1.7 1.3l.7 2.3a1.8 1.8 0 01-.5 1.9l-1.1 1a12 12 0 005.6 5.6l1-1.1c.5-.5 1.2-.7 1.9-.5l2.3.7c.8.2 1.3.9 1.3 1.7v2.1c0 1-.8 1.8-1.8 1.8C10.5 21.4 4.5 15.4 4.5 5.5z"/></svg>),
  mail: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>),
  search: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>),
  filter: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>),
  arrowRight: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  arrowLeft: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>),
  check: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>),
  alert: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l10 17H2L12 3z"/><path d="M12 10v4M12 17.5h.01"/></svg>),
  sparkles: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z"/></svg>),
  trophy: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M17 5h3v2a3 3 0 01-3 3M7 5H4v2a3 3 0 003 3M9 21h6M10 17h4v4h-4z"/></svg>),
  whistle: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 10V7a2 2 0 10-4 0v3M4 13a8 8 0 1016 0v-2H4v2z"/><circle cx="12" cy="13" r="2"/></svg>),
  car: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 16l1.5-5.5A2 2 0 018.4 9h7.2a2 2 0 011.9 1.5L19 16M5 16v3M19 16v3M5 16h14M7.5 16v-1.5M16.5 16v-1.5"/></svg>),
  drop: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z"/></svg>),
  bulb: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2v.1h5v-.1c0-.8.4-1.5 1-2A6 6 0 0012 3z"/></svg>),
  tag: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12V4a1 1 0 011-1h8l9 9-9 9-9-9z"/><circle cx="7.5" cy="7.5" r="1.2"/></svg>),
  menu: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>),
  close: (p: IconProps) => (<svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6l-12 12"/></svg>),
}

export function Spinner({ className = 'h-5 w-5' }: { className?: string }) {
  return (<svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3"/><path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>)
}
export function Loader({ texto = 'Cargando informacion...' }: { texto?: string }) {
  return (<div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-500"><Spinner className="h-7 w-7 text-brand-600"/><p className="text-[13px] font-medium">{texto}</p></div>)
}
export function SkeletonCard() {
  return (<div className="card p-3"><div className="mb-3 h-36 rounded-lg bg-slate-100"/><div className="space-y-2.5 p-2"><div className="h-3 w-1/3 rounded-full bg-slate-100"/><div className="h-4 w-3/4 rounded-full bg-slate-100"/><div className="h-3 w-1/2 rounded-full bg-slate-100"/><div className="mt-4 h-9 rounded-lg bg-slate-100"/></div></div>)
}
export function SkeletonGrid({ n = 6 }: { n?: number }) {
  return (<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: n }).map((_, i) => <SkeletonCard key={i}/>)}</div>)
}
export function ErrorMessage({ mensaje, onRetry }: { mensaje: string; onRetry?: () => void }) {
  return (<div className="mx-auto max-w-md rounded-xl border border-red-200 bg-red-50/60 p-6 text-center"><div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600"><Icons.alert className="h-5 w-5"/></div><h3 className="text-[15px] font-semibold text-red-900">Ocurrio un problema</h3><p className="mt-1.5 text-[13.5px] leading-relaxed text-red-700">{mensaje}</p>{onRetry && <button type="button" onClick={onRetry} className="btn-outline mt-5">Reintentar</button>}</div>)
}
export function EmptyState({ titulo = 'Sin resultados', descripcion = 'No encontramos informacion.', children }: { titulo?: string; descripcion?: string; icono?: string; children?: ReactNode }) {
  return (<div className="rounded-xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400"><Icons.search className="h-5 w-5"/></div><h3 className="text-[15px] font-semibold text-slate-900">{titulo}</h3><p className="mx-auto mt-1.5 max-w-sm text-[13.5px] leading-relaxed text-slate-500">{descripcion}</p>{children && <div className="mt-6">{children}</div>}</div>)
}
const ESTILOS_ESTADO: Record<EstadoHorario, { clase: string; texto: string; punto: string }> = {
  disponible: { clase: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200/70', texto: 'Disponible', punto: 'bg-emerald-500' },
  reservado: { clase: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200/70', texto: 'Reservado', punto: 'bg-amber-500' },
  mantenimiento: { clase: 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200', texto: 'Mantenimiento', punto: 'bg-slate-400' },
}
export function EstadoBadge({ estado }: { estado: EstadoHorario }) {
  const e = ESTILOS_ESTADO[estado] ?? ESTILOS_ESTADO.mantenimiento
  return (<span className={`chip ${e.clase}`}><span className={`h-1.5 w-1.5 rounded-full ${e.punto}`}/>{e.texto}</span>)
}
export function Badge({ children, tono = 'brand' }: { children: ReactNode; tono?: 'brand' | 'slate' | 'amber' | 'dark' }) {
  const tonos = {
    brand: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200/70',
    slate: 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200',
    amber: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200/70',
    dark: 'bg-slate-900 text-white',
  }
  return <span className={`chip ${tonos[tono]}`}>{children}</span>
}
export function FieldArt({ className = 'h-full w-full' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#047857"/><stop offset="100%" stopColor="#065f46"/></linearGradient></defs><rect width="400" height="240" fill="url(#grass)"/><g stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" fill="none"><rect x="20" y="20" width="360" height="200" rx="4"/><line x1="200" y1="20" x2="200" y2="220"/><circle cx="200" cy="120" r="34"/><rect x="20" y="70" width="44" height="100"/><rect x="336" y="70" width="44" height="100"/></g></svg>)
}
export { Icons as Icon }